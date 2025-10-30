import React from "react";
import heroImage from "../assets/undraw_add-tasks_mvlb.svg";
const Home = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-blue-50 to-white">
      <header className="bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-3xl font-extrabold text-blue-700 tracking-tight">
            <a href="/">TaskTrack</a>
          </h1>
          <nav className="flex items-center space-x-4">
            <a
              href="/signup/student"
              className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-blue-700 transition"
            >
              Student Register
            </a>
            <a
              href="/signup/admin"
              className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-blue-700 transition"
            >
              Admin Register
            </a>
            <a
              href="/login"
              className="px-5 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition font-semibold"
            >
              Login
            </a>
          </nav>
        </div>
      </header>

      <main className="flex-grow flex flex-col md:flex-row items-center justify-center text-center md:text-left px-6 py-16 max-w-7xl mx-auto">
        <div className="md:w-1/2 space-y-6">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 leading-tight">
            Manage Assignments Like a Pro.
          </h2>
          <p className="text-gray-600 text-lg max-w-md">
            TaskTrack helps students and professors handle assignment creation,
            submissions, and verification — all from one sleek, distraction-free
            dashboard. Because chaos doesn’t deserve your deadline.
          </p>
          <div className="space-x-4">
            <a
              href="/student/dashboard"
              className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition font-semibold"
            >
              Student Portal
            </a>
            <a
              href="/admin/dashboard"
              className="px-6 py-3 bg-gray-200 text-gray-800 rounded-lg shadow hover:bg-gray-300 transition font-semibold"
            >
              Admin Portal
            </a>
          </div>
        </div>

        <div className="md:w-1/2 mt-10 md:mt-0 flex justify-center">
          <img
            src={heroImage}
            alt="TaskTrack Dashboard Illustration"
            className="w-4/5 max-w-md drop-shadow-lg"
          />
        </div>
      </main>

      <footer className="bg-gray-900 text-gray-400 py-6 mt-12">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm">
            © {new Date().getFullYear()} TaskTrack. All rights reserved.
          </p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noreferrer"
              className="hover:text-white transition"
            >
              <i className="fab fa-linkedin text-lg"></i>
            </a>
            <a
              href="https://github.com"
              target="_blank"
              rel="noreferrer"
              className="hover:text-white transition"
            >
              <i className="fab fa-github text-lg"></i>
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noreferrer"
              className="hover:text-white transition"
            >
              <i className="fab fa-twitter text-lg"></i>
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
