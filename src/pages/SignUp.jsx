import React, { useState } from "react";
import Navbar from "../components/Navbar";
import { getAllUsers, saveAllUsers } from "../utils/userStorage.js";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { getLoggedInUser } from "../utils/auth.js";

const SignUp = () => {
  const navigate = useNavigate();
  const user = getLoggedInUser();
  const [role, setRole] = useState("admin");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleToggle = () => {
    setRole((prev) => (prev === "student" ? "admin" : "student"));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const users = getAllUsers();
    const exists = users.find((u) => u.email === formData.email);
    if (exists) {
      toast.error("User already exists");
      return;
    }

    if (role === "admin") {
      const isFaculty = (email) => email?.endsWith("@gotham.edu");
      if (!isFaculty(user?.email)) {
        toast.error("Can't register as faculty unless you are an admin");
        return;
      }
    }
    const profile = `https://api.dicebear.com/9.x/avataaars-neutral/svg?seed=${
      user?.name?.charAt(0)?.toUpperCase() || "U"
    }`;
    const newUser = { ...formData, role, profile };
    users.push(newUser);
    saveAllUsers(users);

    toast.success(`${role} registered successfully!`);
    navigate(role === "student" ? "/student/dashboard" : "/admin/dashboard");
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-100 via-white to-blue-200">
      <Navbar user={user} />
      <div className="flex flex-1 items-center justify-center p-6">
        <div className="w-full max-w-md backdrop-blur-xl bg-white/40 border border-white/30 rounded-2xl shadow-2xl p-8">
          {/* Toggle Header */}
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-blue-700">
              {role === "student"
                ? "Student Registration"
                : "Admin Registration"}
            </h2>
            <button
              onClick={handleToggle}
              className="text-sm text-white bg-blue-600 hover:bg-blue-700 px-3 py-1 rounded-lg transition"
            >
              Switch to {role === "student" ? "Admin" : "Student"}
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Full Name"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Password"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />

            <button
              type="submit"
              className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition duration-300 font-semibold"
            >
              Register as {role === "student" ? "Student" : "Admin"}
            </button>

            <p className="text-sm text-center mt-4 text-gray-600">
              Already have an account?{" "}
              <span
                onClick={() => navigate("/login")}
                className="text-blue-600 font-medium hover:underline cursor-pointer"
              >
                Login here
              </span>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
