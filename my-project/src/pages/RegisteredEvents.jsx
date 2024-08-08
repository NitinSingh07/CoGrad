import React, { useEffect, useState } from "react";
import axios from "axios";
import EventCard from "../components/EventCard"; // Adjust import based on your file structure

const RegisteredEvents = () => {
  const [registeredEvents, setRegisteredEvents] = useState([]);

  useEffect(() => {
    const fetchRegisteredEvents = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8000/api/registered-events`,
          {
            headers: { "x-auth-token": localStorage.getItem("token") },
          }
        );
        console.log("Fetched events:", res.data); // Debugging line
        setRegisteredEvents(res.data);
      } catch (error) {
        console.error("Error fetching registered events:", error);
      }
    };

    fetchRegisteredEvents();
  }, []);

  return (
    <div className="p-6 max-w-screen-xl mx-auto">
      <h1 className="text-3xl font-extrabold text-gray-800 mb-6">
        Registered Events
      </h1>
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
