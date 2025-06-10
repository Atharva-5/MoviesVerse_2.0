// src/pages/Login.jsx
import { useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const [form, setForm] = useState({ name: "", password: "" });
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await api.post("/users/login", form);
            localStorage.setItem("token", res.data.token);
            localStorage.setItem("user", JSON.stringify(res.data.user));
            navigate("./home");
        } catch (err) {
            setError(err.response?.data?.message || "Login failed");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-bl from-black via-gray-900 to-[#1c1c1c] text-white">
            <form
                onSubmit={handleSubmit}
                className="bg-gray-900/80 backdrop-blur-md p-10 rounded-2xl shadow-2xl w-full max-w-md"
            >
                <h2 className="text-3xl font-extrabold mb-6 text-center text-red-500">Welcome Back 🎬</h2>
                {error && <p className="text-red-400 text-sm mb-4">{error}</p>}
                <input
                    name="name"
                    type="text"
                    placeholder="Name"
                    onChange={handleChange}
                    className="w-full p-3 mb-4 bg-gray-800 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                    required
                />
                <input
                    name="password"
                    type="password"
                    placeholder="Password"
                    onChange={handleChange}
                    className="w-full p-3 mb-6 bg-gray-800 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                    required
                />
                <button
                    type="submit"
                    className="w-full bg-red-600 hover:bg-red-700 py-3 rounded-lg font-semibold transition-colors duration-300 cursor-pointer"
                >
                    Login
                </button>
                <p className="mt-4 text-sm text-center text-gray-300">
                    Don’t have an account?{" "}
                    <a href="/register" className="text-red-400 hover:underline">
                        Register
                    </a>
                </p>
            </form>
        </div>
    );
};

export default Login;
