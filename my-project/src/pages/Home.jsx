// src/pages/Home.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import EventCard from "../components/EventCard";

const Home = () => {
  const [events, setEvents] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await axios.get("http://localhost:8000/api/getAll");
        if (Array.isArray(res.data)) {
          setEvents(res.data);
        } else {
          setError("Unexpected data format");
        }
      } catch (err) {
        setError("Error fetching events");
      }
    };

    fetchEvents();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-extrabold mb-6">All Events</h1>
      {error && <p className="text-red-600 font-semibold">{error}</p>}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {Array.isArray(events) && events.length > 0 ? (
          events.map((event) => <EventCard key={event._id} event={event} />)
        ) : (
          <p className="col-span-full text-center">No events available</p>
        )}
      </div>
    </div>
  );
};

export default Home;
