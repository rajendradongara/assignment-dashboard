import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";

const Navbar = ({ user }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogin = () => {
    if (!user) {
      navigate("/login");
    } else if (user && user.role === "admin") {
      navigate("/admin/dashboard");
    } else if (user && user.role === "student") {
      navigate("/student/dashboard");
    } else {
      navigate("/login");
    }
  };
  const handleSignup = () => {
    if (!user) {
      navigate("/signup");
    } else if (user && user.role === "admin") {
      navigate("/admin/dashboard");
    } else if (user && user.role === "student") {
      navigate("/student/dashboard");
    } else {
      navigate("/signu[");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    // onLogout?.();
    navigate("/");
  };

  return (
    <header className="bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <div
          className="flex items-center space-x-3 cursor-pointer"
          onClick={() => navigate("/")}
        >
          <img
            src="/tasktrack-logo.png"
            alt="TaskTrack Logo"
            className="w-8 h-8 rounded-full object-cover"
          />
          <h1 className="text-2xl font-extrabold text-blue-700 tracking-tight cursor-pointer">
            TaskTrack
          </h1>
        </div>

        {user ? (
          <div className="relative flex items-center space-x-3">
            <span className="text-gray-700 font-medium">
              {user?.name || "Student"}
            </span>

            <div
              className="flex items-center space-x-1 cursor-pointer"
              onClick={() => setDropdownOpen((prev) => !prev)}
            >
              {/* <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-bold">
                {user?.name ? user.name.charAt(0).toUpperCase() : "S"}
              </div> */}
              <img
                src={user?.profile}
                alt="profile"
                className="w-8 h-8 rounded-lg flex items-center justify-center"
              />
              <FontAwesomeIcon
                icon={faChevronDown}
                className={`transition-transform duration-200 ${
                  dropdownOpen ? "rotate-180" : "rotate-0"
                } text-gray-600`}
                size="sm"
              />
            </div>

            {dropdownOpen && (
              <div className="absolute right-0 top-12 bg-white border rounded-xl shadow-lg py-2 w-40 z-50">
                <button
                  onClick={handleLogout}
                  className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        ) : (
          <nav className="flex items-center space-x-4">
            <button
              onClick={handleSignup}
              className="relative px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold
               shadow-md hover:shadow-lg hover:from-blue-700 hover:to-blue-800
               transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2"
            >
              <span className="relative z-10">Register</span>
            </button>

            <button
              onClick={handleLogin}
              className="relative px-5 py-2.5 rounded-xl border border-blue-500 text-blue-600 font-semibold
               hover:bg-blue-600 hover:text-white hover:shadow-lg
               transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2"
            >
              <span className="relative z-10">Login</span>
            </button>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Navbar;
