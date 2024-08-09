import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

const CreateEvent = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [location, setLocation] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("User not authenticated. Please log in.");
      return;
    }

    try {
      const response = await fetch("http://localhost:8000/api/create-event", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ title, description, date, time, location }),
      });

      if (response.ok) {
        toast.success("Event created successfully!");
        navigate("/");
      } else {
        const errorData = await response.json();
        toast.error(errorData.error || "Error creating event");
      }
    } catch (error) {
      console.error("Error creating event:", error);
      toast.error("Error creating event");
    }
  };

  return (
    <div className="flex flex-col md:flex-row items-start md:items-center p-6 max-w-6xl mx-auto mt-6 mb-6 bg-gray-100 border border-gray-300 rounded-lg">
      <div className="flex-1 p-6">
        <h1 className="text-4xl font-extrabold text-indigo-700 mb-6">
          Create New Event
        </h1>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="title" className="block text-gray-800 text-lg mb-2">
              Title
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>
          <div>
            <label
              htmlFor="description"
              className="block text-gray-800 text-lg mb-2"
            >
              Description
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              rows="5"
              required
            ></textarea>
          </div>
          <div>
            <label htmlFor="date" className="block text-gray-800 text-lg mb-2">
              Date
            </label>
            <input
              type="date"
              id="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>
          <div>
            <label htmlFor="time" className="block text-gray-800 text-lg mb-2">
              Time
            </label>
            <input
              type="time"
              id="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>
          <div>
            <label
              htmlFor="location"
              className="block text-gray-800 text-lg mb-2"
            >
              Location
            </label>
            <input
              type="text"
              id="location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>
          <button
            type="submit"
            className="bg-indigo-600 text-white font-semibold py-3 px-6 rounded-lg shadow-sm hover:bg-indigo-700 transition-colors"
          >
            Create Event
          </button>
        </form>
        <Toaster />
      </div>
      <div className="hidden md:block md:w-1/2 md:ml-8">
        <img
          src="/create.jpg"
          alt="Create Event"
          className="w-full h-auto rounded-lg shadow-sm"
        />
      </div>
    </div>
  );
};

export default CreateEvent;
