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

  if (!event)
    return <div className="p-8 text-center text-gray-700">Loading...</div>;

  return (
    <div className="p-8 md:p-12 w-full h-full mt-16 max-w-5xl mx-auto bg-white border border-gray-300 rounded-lg shadow-lg">
      <div className="flex flex-col md:flex-row">
        <div className="md:w-2/3">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6 text-center md:text-left">
            {event.title}
          </h1>
          <p className="text-gray-700 text-lg md:text-xl mb-8 mt-4 text-center md:text-left">
            {event.description}
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
            <div className="flex items-center space-x-4">
              <MdEvent className="text-indigo-600 text-3xl" />
              <p className="text-gray-700 text-lg md:text-xl">
                <span className="font-semibold">Date:</span>{" "}
                {new Date(event.date).toLocaleDateString()}
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <MdAccessTime className="text-indigo-600 text-3xl" />
              <p className="text-gray-700 text-lg md:text-xl">
                <span className="font-semibold">Time:</span> {event.time}
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
            <div className="flex items-center space-x-4">
              <MdLocationOn className="text-indigo-600 text-3xl" />
              <p className="text-gray-700 text-lg md:text-xl">
                <span className="font-semibold">Location:</span>{" "}
                {event.location}
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <MdPerson className="text-indigo-600 text-3xl" />
              <p className="text-gray-700 text-lg md:text-xl">
                <span className="font-semibold">Organized by:</span> Tech
                Convention Center
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-4 mb-6">
            <MdGroup className="text-indigo-600 text-3xl" />
            <p className="text-gray-700 text-lg md:text-xl">
              <span className="font-semibold">Attendees:</span>{" "}
              {event.attendees.length}
            </p>
          </div>
          <div className="text-center">
            <button
              onClick={registerForEvent}
              className="bg-indigo-600 text-white text-lg font-semibold py-3 px-6 rounded-lg shadow-md hover:bg-indigo-700 transition-colors"
            >
              Register Now
            </button>
          </div>
        </div>
        <div className="md:w-1/3 mt-8 md:mt-0 flex justify-center items-center">
          <img
            src="/card.jpg" // Path to the event image
            alt="Event"
            className="w-full h-auto max-w-xl object-cover rounded-lg "
          />
        </div>
      </div>
      <Toaster />
    </div>
  );
};

export default EventDetail;
