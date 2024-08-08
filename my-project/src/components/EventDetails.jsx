import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

const EventDetail = () => {
  const [event, setEvent] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const res = await axios.get(`http://localhost:8000/api/getevent/${id}`);
        setEvent(res.data);
      } catch (error) {
        console.error("Error fetching event:", error);
      }
    };

    fetchEvent();
  }, [id]);

  const registerForEvent = async () => {
    try {
      await axios.post(
        `http://localhost:8000/api/event/${id}/register`,
        {},
        {
          headers: { "x-auth-token": localStorage.getItem("token") },
        }
      );
      toast.success("Registered for the event successfully!");
      navigate("/"); // Navigate to home page
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
      <Toaster /> {/* To display toasts */}
    </div>
  );
};

export default EventDetail;
