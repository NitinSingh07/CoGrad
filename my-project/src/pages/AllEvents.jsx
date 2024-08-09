import React, { useEffect, useState } from "react";
import EventCard from "../components/EventCard";

const AllEvents = () => {
  const [events, setEvents] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch(
          "https://event-management-1tco.onrender.com/api/getAll"
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        if (Array.isArray(data)) {
          setEvents(data);
        } else {
          setError("Unexpected data format");
        }
      } catch (err) {
        setError("Error fetching events");
        console.error("Error fetching events:", err);
      }
    };

    fetchEvents();
  }, []);

  return (
    <div className="p-6 md:p-12 bg-gray-200 min-h-screen">
      <h1 className="text-4xl font-extrabold mb-8 text-center text-gray-800">
        All Events
      </h1>
      {error && (
        <p className="text-red-600 font-semibold text-center mb-6">{error}</p>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {Array.isArray(events) && events.length > 0 ? (
          events.map((event) => <EventCard key={event._id} event={event} />)
        ) : (
          <p className="col-span-full text-center text-gray-600">
            No events available
          </p>
        )}
      </div>
    </div>
  );
};

export default AllEvents;
