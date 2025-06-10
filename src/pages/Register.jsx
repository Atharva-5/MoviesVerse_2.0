// src/pages/Register.jsx
import { useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";

const Register = () => {
    const [form, setForm] = useState({ name: "", email: "", password: "" });
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await api.post("/register", form);
            navigate("/");
        } catch (err) {
            setError(err.response?.data?.message || "Registration failed");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-[#0f0c29] via-[#302b63] to-[#24243e]">
            <form
                onSubmit={handleSubmit}
                className="bg-gray-900/70 backdrop-blur-md p-10 rounded-2xl shadow-2xl w-full max-w-md text-white"
            >
                <h2 className="text-3xl font-extrabold mb-6 text-center text-red-500">Join MoviesVerse</h2>
                {error && <p className="text-red-400 text-sm mb-4">{error}</p>}
                <input
                    name="name"
                    placeholder="Full Name"
                    onChange={handleChange}
                    className="w-full p-3 mb-4 bg-gray-800 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                    required
                />
                <input
                    name="email"
                    type="email"
                    placeholder="Email"
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
                    className="w-full bg-red-600 hover:bg-red-700 py-3 rounded-lg font-semibold transition-colors duration-300"
                >
                    Create Account
                </button>
                <p className="mt-4 text-sm text-center text-gray-300">
                    Already have an account?{" "}
                    <a href="/" className="text-red-400 hover:underline">
                        Login
                    </a>
                </p>
            </form>
        </div>
    );
};

export default Register;
