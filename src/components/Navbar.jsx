import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronDown,
  faBars,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";

const Navbar = ({ user }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const path = location.pathname;

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

    navigate("/");
  };

  return (
    <header className="bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-3 flex justify-between items-center">
        <div
          className="flex items-center space-x-3 cursor-pointer"
          onClick={() => navigate("/")}
        >
          <img
            src="/tasktrack-logo.png"
            alt="TaskTrack Logo"
            className="w-8 h-8 rounded-full object-cover"
          />
          <h1 className="text-2xl font-extrabold text-blue-700 tracking-tight">
            TaskTrack
          </h1>
        </div>

        <nav className="hidden md:flex items-center space-x-6 text-gray-700 font-medium">
          <button
            onClick={() => navigate("/")}
            className={`hover:text-blue-600 ${
              path === "/" ? "text-blue-700 font-bold" : ""
            }`}
          >
            Home
          </button>

          {user && (
            <button
              onClick={() => navigate(`/${user?.role}/dashboard`)}
              className={`hover:text-blue-600 ${
                path.endsWith("dashboard") ? "text-blue-700 font-bold" : ""
              }`}
            >
              Dashboard
            </button>
          )}

          <button
            onClick={() => navigate("/about")}
            className={`hover:text-blue-600 ${
              path.endsWith("about") ? "text-blue-700 font-bold" : ""
            }`}
          >
            About
          </button>

          <button
            onClick={() => navigate("/contact")}
            className={`hover:text-blue-600 ${
              path.endsWith("contact") ? "text-blue-700 font-bold" : ""
            }`}
          >
            Contact
          </button>
        </nav>

        {user ? (
          <div className="relative flex items-center space-x-3">
            <span className="hidden sm:block text-gray-700 font-medium">
              {user?.name || "Student"}
            </span>

            <div
              className="flex items-center space-x-1 cursor-pointer"
              onClick={() => setDropdownOpen((prev) => !prev)}
            >
              <img
                src={user?.profile}
                alt="profile"
                className="w-8 h-8 rounded-lg object-cover"
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
              <div className="absolute right-0 top-12 bg-white border rounded-xl shadow-lg py-2 w-40 z-50 animate-fadeIn">
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
          <div className="hidden md:flex items-center space-x-4">
            <button
              onClick={handleSignup}
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold
                shadow-md hover:shadow-lg hover:from-blue-700 hover:to-blue-800
                transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2"
            >
              Register
            </button>

            <button
              onClick={handleLogin}
              className="px-5 py-2.5 rounded-xl border border-blue-500 text-blue-600 font-semibold
                hover:bg-blue-600 hover:text-white hover:shadow-lg
                transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2"
            >
              Login
            </button>
          </div>
        )}

        <button
          className="md:hidden text-gray-700 focus:outline-none"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <FontAwesomeIcon icon={menuOpen ? faTimes : faBars} size="lg" />
        </button>
      </div>

      {menuOpen && (
        <div className="md:hidden bg-white border-t shadow-lg">
          <nav className="flex flex-col px-6 py-4 space-y-3 text-gray-700 font-medium">
            <button
              onClick={() => {
                navigate("/");
                setMenuOpen(false);
              }}
              className={`hover:text-blue-600 text-left ${
                path === "/" ? "text-blue-700 font-bold" : ""
              }`}
            >
              Home
            </button>

            {user && (
              <button
                onClick={() => {
                  navigate(`/${user?.role}/dashboard`);
                  setMenuOpen(false);
                }}
                className={`hover:text-blue-600 text-left ${
                  path.endsWith("dashboard") ? "text-blue-700 font-bold" : ""
                }`}
              >
                Dashboard
              </button>
            )}

            <button
              onClick={() => {
                navigate("/about");
                setMenuOpen(false);
              }}
              className={`hover:text-blue-600 text-left ${
                path.endsWith("about") ? "text-blue-700 font-bold" : ""
              }`}
            >
              About
            </button>

            <button
              onClick={() => {
                navigate("/contact");
                setMenuOpen(false);
              }}
              className={`hover:text-blue-600 text-left ${
                path.endsWith("contact") ? "text-blue-700 font-bold" : ""
              }`}
            >
              Contact
            </button>

            {!user && (
              <div className="flex flex-col space-y-3 pt-3 border-t">
                <button
                  onClick={() => {
                    handleSignup();
                    setMenuOpen(false);
                  }}
                  className="px-4 py-2 rounded-lg bg-blue-600 text-white font-semibold shadow hover:bg-blue-700 transition"
                >
                  Register
                </button>
                <button
                  onClick={() => {
                    handleLogin();
                    setMenuOpen(false);
                  }}
                  className="px-4 py-2 rounded-lg border border-blue-500 text-blue-600 font-semibold hover:bg-blue-600 hover:text-white transition"
                >
                  Login
                </button>
              </div>
            )}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;
