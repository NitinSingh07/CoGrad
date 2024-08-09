import React from "react";
import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
const SignUp = () => {
  const [username, setusername] = useState("");
  const [fullName, setfullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("/api/auth/signUp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userName: username, fullName, email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success("User registration successful");
        navigate("/login");
      } else {
        throw new Error(data.message);
      }
    } catch (error) {
      toast.error("An error occurred during registration");
    }
  };
  return (
    <div className="flex flex-col mt-24 md:flex-row items-center justify-center my-12 px-4 space-y-8 md:space-y-0 md:space-x-8 ">
      {/* Form Section */}
      <div className="md:w-1/2 max-w-md mx-auto p-8 border border-gray-300 rounded-lg shadow-xl bg-gradient-to-r from-blue-300 to-green-300">
        <h2 className="text-3xl font-bold mb-6 text-blue-600">Sign Up</h2>
        <form onSubmit={handleSignUp}>
          <div className="mb-6">
            <label
              htmlFor="userName"
              className="block text-sm font-semibold text-black"
            >
              Username
            </label>
            <input
              onChange={(e) => setusername(e.target.value)}
              type="text"
              id="userName"
              name="userName"
              className="mt-2 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition duration-300 ease-in-out dark:bg-white dark:border-gray-600 "
              placeholder="Enter your username"
              required
            />
          </div>
          {/* <div className="mb-6">
            <label
              htmlFor="fullname"
              className="block text-sm font-semibold text-gray-200"
            >
              Full Name
            </label>
            <input
              onChange={(e) => setfullName(e.target.value)}
              type="text"
              id="fullname"
              name="fullname"
              className="mt-2 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition duration-300 ease-in-out dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300"
              placeholder="Enter your full name"
              required
            />
          </div> */}
          <div className="mb-6">
            <label
              htmlFor="email"
              className="block text-sm font-semibold text-black"
            >
              Email
            </label>
            <input
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              id="email"
              name="email"
              className="mt-2 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition duration-300 ease-in-out dark:bg-white dark:border-gray-600 "
              placeholder="Enter your email address"
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
              placeholder="Enter your password"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full py-3 px-6 bg-gradient-to-r from-green-500 to-blue-500 text-white font-semibold rounded-md shadow-lg hover:from-blue-500  focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-300 ease-in-out"
          >
            Sign Up
          </button>
        </form>
      </div>

      {/* Image Section */}
      <div className="md:w-1/2 mt-8 md:mt-0 flex items-center justify-center">
        <img
          src="/signup.jpg"
          alt="Sign Up Illustration"
          className="w-full max-w-md h-auto object-cover transform transition-transform duration-500 hover:scale-105"
        />
      </div>
    </div>
  );
};

export default SignUp;
