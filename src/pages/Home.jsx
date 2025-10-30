import React from "react";

const Home = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-semibold text-gray-800">
            Assignment Dashboard
          </h1>
          <nav className="space-x-6">
            <a
              href="/signup/student"
              className="text-gray-600 hover:text-blue-600 font-medium"
            >
              Student
            </a>
            <a
              href="/signup/admin"
              className="text-gray-600 hover:text-blue-600 font-medium"
            >
              Admin
            </a>
            <a
              href="/login"
              className="text-gray-600 hover:text-blue-600 font-medium"
            >
              Login
            </a>
          </nav>
        </div>
      </header>

      <main className="flex-grow flex flex-col items-center justify-center text-center px-4">
        <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
          Manage Assignments Effortlessly
        </h2>
        <p className="text-gray-600 max-w-xl mb-8">
          A clean and simple dashboard for students and professors to handle
          assignment submissions, deadlines, and verification in one place.
        </p>
        <div className="space-x-4">
          <a
            href="/student/dashboard"
            className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition"
          >
            Student Portal
          </a>
          <a
            href="/admin/dashboard"
            className="px-6 py-3 bg-gray-200 text-gray-800 rounded-lg shadow hover:bg-gray-300 transition"
          >
            Admin Portal
          </a>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t py-4 text-center text-gray-500 text-sm">
        © {new Date().getFullYear()} Assignment Dashboard. All rights reserved.
      </footer>
    </div>
  );
};

export default Home;
