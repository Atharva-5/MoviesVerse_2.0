import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import HomePage from "./pages/HomePage";
import WatchlistPage from "./pages/WatchlistPage";
import Navbar from "./components/Navbar";

function App() {
  // Check if user is on auth pages
  const isAuthPage = window.location.pathname === "/" || window.location.pathname === "/register";

  return (
    <BrowserRouter>
      {!isAuthPage && <Navbar />}
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/watchlist" element={<WatchlistPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
