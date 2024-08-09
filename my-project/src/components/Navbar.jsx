import React, { useState, useEffect, useRef } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

const Navbar = () => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [isNavbarOpen, setNavbarOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const checkLoginStatus = () => {
      const token = localStorage.getItem("token");
      setIsLoggedIn(!!token);
    };
    checkLoginStatus();
  }, []);

  const handleSignIn = () => {
    navigate("/login");
  };

  const handleSignUp = () => {
    navigate("/signup");
  };

  const handleSignOut = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    toast.success("User Signed Out Successfully");
    navigate("/login");
  };

  return (
    <>
      <Toaster />
      <nav className="bg-gradient-to-r w-full from-green-400 to-blue-500 border-b border-gray-200 dark:border-gray-700 relative">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <a
            href="/"
            className="flex items-center space-x-3 rtl:space-x-reverse"
          >
            <span className="self-center text-2xl font-semibold text-white dark:text-white">
              <img src="/image001.png" alt="Logo" className="w-40 h-12" />
            </span>
          </a>
          <div className="flex items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse relative">
            {isLoggedIn ? (
              <>
                <button
                  type="button"
                  className="flex text-sm bg-gray-800 rounded-full md:me-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
                  id="user-menu-button"
                  aria-expanded={isDropdownOpen}
                  onClick={() => setDropdownOpen(!isDropdownOpen)}
                >
                  <span className="sr-only">Open user menu</span>
                  <img
                    className="w-8 h-8 rounded-full"
                    src="/user.png"
                    alt="user photo"
                  />
                </button>
                {isDropdownOpen && (
                  <div
                    className="absolute right-0 mt-2 w-48 z-50 text-base list-none bg-blue-200 divide-y divide-gray-100 rounded-lg shadow"
                    id="user-dropdown"
                    ref={dropdownRef}
                  >
                    <ul className="py-2" aria-labelledby="user-menu-button">
                      <li>
                        <NavLink
                          to="/user-profile"
                          className="block px-4 py-2 text-md text-black hover:bg-blue-300"
                        >
                          User Profile
                        </NavLink>
                      </li>
                      <li>
                        <a
                          href="#"
                          className="block px-4 py-2 text-md text-black hover:bg-blue-300"
                          onClick={handleSignOut}
                        >
                          Sign out
                        </a>
                      </li>
                    </ul>
                  </div>
                )}
              </>
            ) : (
              <div className="flex space-x-3">
                <button
                  type="button"
                  className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                  onClick={handleSignIn}
                >
                  Sign In
                </button>
                <button
                  type="button"
                  className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-green-600 dark:hover:bg-green-700 focus:outline-none dark:focus:ring-green-800"
                  onClick={handleSignUp}
                >
                  Sign Up
                </button>
              </div>
            )}
            <button
              data-collapse-toggle="navbar-user"
              type="button"
              className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
              aria-controls="navbar-user"
              aria-expanded={isNavbarOpen}
              onClick={() => setNavbarOpen(!isNavbarOpen)}
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className="w-5 h-5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 17 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M1 1h15M1 7h15M1 13h15"
                />
              </svg>
            </button>
          </div>
          <div
            className={`items-center justify-between ${
              isNavbarOpen ? "flex" : "hidden"
            } w-full md:flex md:w-auto md:order-1`}
            id="navbar-user"
          >
            <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 dark:border-gray-700">
              <li>
                <NavLink
                  to="/getAll"
                  className={({ isActive }) =>
                    `block py-2 px-3 rounded ${
                      isActive ? "text-black" : "text-gray-900"
                    } hover:bg-gray-100 md:hover:bg-transparent md:hover:text-yellow-400 md:p-0 dark:text-white md:dark:hover:text-yellow-500 dark:hover:bg-yellow-400 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700`
                  }
                >
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/create-event"
                  className={({ isActive }) =>
                    `block py-2 px-3 rounded ${
                      isActive ? "text-black" : "text-gray-900"
                    } hover:bg-gray-100 md:hover:bg-transparent md:hover:text-yellow-400 md:p-0 dark:text-white md:dark:hover:text-yellow-500 dark:hover:bg-yellow-400 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700`
                  }
                >
                  Create an Event
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/registered-events"
                  className={({ isActive }) =>
                    `block py-2 px-3 rounded ${
                      isActive ? "text-black" : "text-gray-900"
                    } hover:bg-gray-100 md:hover:bg-transparent md:hover:text-yellow-400 md:p-0 dark:text-white md:dark:hover:text-yellow-500 dark:hover:bg-yellow-400 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700`
                  }
                >
                  Registered Events
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
