import React, { useEffect, useState } from "react";
import EventCard from "../components/EventCard";
import Cookies from "js-cookie";

const RegisteredEvents = () => {
  const [registeredEvents, setRegisteredEvents] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRegisteredEvents = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("No token found");
        return;
      }

      try {
        const response = await fetch(
          "http://localhost:8000/api/registered-events",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();
        setRegisteredEvents(data);
      } catch (err) {
        setError("Error fetching registered events");
      }
    };

    fetchRegisteredEvents();
  }, []);

  return (
    <div className="p-6 max-w-screen-xl mx-auto min-h-screen">
      <h1 className="text-4xl font-extrabold text-gray-800 mb-8 text-center">
        Registered Events
      </h1>
      {error && (
        <p className="text-red-600 font-semibold text-center mb-6">{error}</p>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {registeredEvents.length > 0 ? (
          registeredEvents.map((event) => (
            <EventCard key={event._id} event={event} />
          ))
        ) : (
          <p className="text-gray-600 text-center col-span-3">
            No registered events found.
          </p>
        )}
      </div>
    </div>
  );
};

export default RegisteredEvents;
