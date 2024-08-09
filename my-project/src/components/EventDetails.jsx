import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
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
    console.log(token);
    if (!token) {
      toast.error("User not authenticated. Please log in.");
      return;
    }

    try {
      // console.log(id);
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
      // console.log("hi", response);
      if (response.ok) {
        toast.success("Registered for the event successfully!");
        navigate("/");
      } else {
        const errorData = await response.json();
        toast.error(errorData.error || "Error registering for event hi");
      }
    } catch (error) {
      console.error("Error registering for event:", error);
      toast.error("Error registering for event");
    }
  };

  if (!event) return <div>Loading...</div>;

  return (
    <div className="p-6 max-w-4xl mx-auto bg-white border border-gray-300 rounded-lg shadow-lg">
      <h1 className="text-3xl font-extrabold text-gray-800 mb-4">
        {event.title}
      </h1>
      <p className="text-gray-700 mb-2">{event.description}</p>
      <p className="text-gray-600 mb-2">
        {event.date} - {event.time}
      </p>
      <p className="text-gray-600 mb-2">{event.location}</p>
      <p className="text-gray-600 mb-4">
        Organized by: {event.organizer.username}
      </p>
      <p className="text-gray-600 mb-4">Attendees: {event.attendees.length}</p>
      <button
        onClick={registerForEvent}
        className="bg-indigo-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-indigo-600 transition-colors"
      >
        Register Now
      </button>
      <Toaster />
    </div>
  );
};

export default EventDetail;
