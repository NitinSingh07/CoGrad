import React, { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [emailUsername, setEmailUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:8000/api/auth/signIn", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ email: emailUsername, password }),
      });

      const data = await response.json();
      localStorage.setItem("token", data.token);
      if (response.ok) {
        toast.success("User logged in successfully");
        navigate("/");
      } else {
        throw new Error(data.message || "Login failed");
      }
    } catch (error) {
      toast.error(error.message || "An error occurred during login");
    }
  };

  return (
    <div className="flex flex-col md:flex-row items-center justify-center my-24 px-4 space-y-8 md:space-y-0 md:space-x-8">
      {/* Form Section */}
      <div className=" md:w-1/2 max-w-md mx-auto p-8 border border-gray-300 rounded-lg shadow-xl bg-gradient-to-r from-blue-300 to-green-300">
        <h2 className="text-4xl font-bold mb-8 text-blue-600">Sign In</h2>
        <form onSubmit={handleLogin}>
          <div className="mb-6">
            <label
              htmlFor="email"
              className="block text-sm font-semibold text-black"
            >
              Email
            </label>
            <input
              onChange={(e) => setEmailUsername(e.target.value)}
              type="email"
              id="email"
              name="email"
              className="mt-2 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition duration-300 ease-in-out dark:bg-white dark:border-gray-600 "
              required
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="password"
              className="block text-sm font-semibold text-black"
            >
              Password
            </label>
            <input
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              id="password"
              name="password"
              className="mt-2 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition duration-300 ease-in-out dark:bg-white dark:border-gray-600 "
              required
            />
          </div>
          <button
            type="submit"
            className="w-full py-3 px-6 bg-gradient-to-r from-green-500 to-blue-500 text-white font-semibold rounded-md shadow-lg hover:from-blue-500  focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-300 ease-in-out"
          >
            Sign In
          </button>
        </form>
      </div>

      {/* Image Section */}
      <div className="md:w-1/2 mt-8 md:mt-0 flex items-center justify-center">
        <img
          src="/Login.jpg"
          alt="Login Illustration"
          className="w-full max-w-md h-auto  object-cover transform transition-transform duration-500 hover:scale-105"
        />
      </div>
    </div>
  );
};

export default Login;
