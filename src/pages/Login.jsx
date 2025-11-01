import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

import Navbar from "../components/Navbar";
import { getLoggedInUser, loginUser } from "../utils/auth.js";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const navigate = useNavigate();
  const user = getLoggedInUser();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const result = loginUser(formData.email, formData.password);
    if (result.success) {
      toast.success(`Welcome back ${result.user.name}`);
      navigate("/");
    } else {
      toast.error(result.message);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-100 via-white to-blue-200">
      <Navbar user={user} />
      <div className="flex flex-1 justify-center items-center p-6">
        <form
          onSubmit={handleSubmit}
          className="backdrop-blur-xl bg-white/40 border border-white/30 rounded-2xl shadow-2xl p-8 w-full max-w-md"
        >
          <h2 className="text-2xl font-bold mb-6 text-center text-blue-700">
            Login to TaskTrack
          </h2>

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
            className="w-full p-3 mb-6 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <button
            type="submit"
            className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition"
          >
            Login
          </button>

          <p className="text-sm text-center mt-4 text-gray-600">
            Don’t have an account?{" "}
            <span
              onClick={() => navigate("/signup")}
              className="text-blue-600 font-medium hover:underline cursor-pointer"
            >
              Register here
            </span>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
