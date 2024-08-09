// src/pages/EventDetail.jsx
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import {
  MdEvent,
  MdAccessTime,
  MdLocationOn,
  MdPerson,
  MdGroup,
} from "react-icons/md";
import Cookies from "js-cookie"; // Import js-cookie

const EventDetail = () => {
  const [event, setEvent] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await fetch(
          `http://localhost:8000/api/getevent/${id}`
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setEvent(data);
      } catch (error) {
        console.error("Error fetching event:", error);
        toast.error("Error fetching event");
      }
    };

    fetchEvent();
  }, [id]);

  const registerForEvent = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token"); // Retrieve token from cookies
    if (!token) {
      toast.error("User not authenticated. Please log in.");
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:8000/api/event/register/${id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // Send token in Authorization header
          },
        }
      );
      if (response.ok) {
        toast.success("Registered for the event successfully!");
        navigate("/");
      } else {
        const errorData = await response.json();
        toast.error(errorData.error || "Error registering for event");
      }
    } catch (error) {
      console.error("Error registering for event:", error);
      toast.error("Error registering for event");
    }
  };

  if (!event) return <div className="p-6 text-center">Loading...</div>;

  return (
    <div className="p-8 md:p-12 mt-16 max-w-4xl mx-auto bg-indigo-100 border border-indigo-400 rounded-lg shadow-lg">
      <h1 className="text-4xl font-extrabold text-gray-900 mb-6 text-center">
        {event.title}
      </h1>
      <p className="text-gray-800 text-lg mb-8 mt-4 text-center">
        {event.description}
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
        <div className="flex items-center space-x-3">
          <MdEvent className="text-indigo-600 text-2xl" />
          <p className="text-gray-700 text-md">
            <span className="font-semibold">Date:</span>{" "}
            {new Date(event.date).toLocaleDateString()}
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <MdAccessTime className="text-indigo-600 text-2xl" />
          <p className="text-gray-700 text-md">
            <span className="font-semibold">Time:</span> {event.time}
          </p>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
        <div className="flex items-center space-x-3">
          <MdLocationOn className="text-indigo-600 text-2xl" />
          <p className="text-gray-700 text-md">
            <span className="font-semibold">Location:</span> {event.location}
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <MdPerson className="text-indigo-600 text-2xl" />
          <p className="text-gray-700 text-md">
            <span className="font-semibold">Organized by:</span> Tech Convention
            Center
          </p>
        </div>
      </div>
      <div className="flex items-center space-x-3 mb-6">
        <MdGroup className="text-indigo-600 text-2xl" />
        <p className="text-gray-700 text-md">
          <span className="font-semibold">Attendees:</span>{" "}
          {event.attendees.length}
        </p>
      </div>
      <div className="text-center">
        <button
          onClick={registerForEvent}
          className="bg-indigo-600 text-white font-semibold py-3 px-6 rounded-lg shadow-md hover:bg-indigo-700 transition-colors"
        >
          Register Now
        </button>
      </div>
      <Toaster />
    </div>
  );
};

export default EventDetail;
