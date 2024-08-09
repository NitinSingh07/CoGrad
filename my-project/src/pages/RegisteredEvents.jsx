import React, { useEffect, useState } from "react";
import EventCard from "../components/EventCard";
import Cookies from "js-cookie";

const RegisteredEvents = () => {
  const [registeredEvents, setRegisteredEvents] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRegisteredEvents = async () => {
      const token = localStorage.getItem("token");
      console.log("registered events token", token);
      if (!token) {
        throw new Error("No token found");
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
        console.log(response);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();
        console.log("Fetched events:", data);
        setRegisteredEvents(data);
      } catch (err) {
        setError("Error fetching registered events");
      }
    };

    fetchRegisteredEvents();
  }, []);

  return (
    <div className="p-6 max-w-screen-xl mx-auto">
      <h1 className="text-3xl font-extrabold text-gray-800 mb-6">
        Registered Events
      </h1>
      {error && <p className="text-red-600 font-semibold">{error}</p>}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {registeredEvents.length > 0 ? (
          registeredEvents.map((event) => (
            <EventCard key={event._id} event={event} />
          ))
        ) : (
          <p>No registered events found.</p>
        )}
      </div>
    </div>
  );
};

export default RegisteredEvents;
