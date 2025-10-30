import React, { useState } from "react";
import { getAllUsers, saveAllUsers } from "../utils/userStorage.js";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const SignUp = ({ role }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const users = getAllUsers();

    const exists = users.find((u) => u.email === formData.email);
    if (exists) {
      toast.error("User already exists");
      return;
    }

    const newUser = { ...formData, role }; // ✅ role set automatically, not from user input
    users.push(newUser);
    saveAllUsers(users);

    if (role === "student") {
      navigate("/student/dashboard");
    } else if (role === "admin") {
      navigate("/admin/dashboard");
    }

    toast.success(`${role} registered successfully!`);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-md p-8 rounded-lg w-96">
        <h2 className="text-2xl font-bold mb-4 text-center text-gray-800">
          {role === "admin" ? "Admin Signup" : "Student Signup"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
            required
          />

          <button
            type="submit"
            className={`w-full ${
              role === "admin"
                ? "bg-purple-600 hover:bg-purple-700"
                : "bg-blue-600 hover:bg-blue-700"
            } text-white py-2 rounded`}
          >
            Sign Up as {role === "admin" ? "Admin" : "Student"}
          </button>
        </form>

        <p className="text-sm text-center mt-4">
          Already have an account?{" "}
          <span
            onClick={() => navigate("/")}
            className="text-blue-600 hover:underline cursor-pointer"
          >
            Login here
          </span>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
