// src/components/EventCard.jsx
import React from "react";
import { Link } from "react-router-dom";

const EventCard = ({ event }) => {
  return (
    <div className="bg-white border border-gray-300 rounded-lg shadow-lg overflow-hidden transition-transform transform hover:scale-105 hover:shadow-2xl">
      <Link
        to={`/events/${event._id}`}
        className="block p-6 hover:bg-gray-50 transition-colors"
      >
        <div className="flex flex-col items-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            {event.title}
          </h2>
          <p className="text-gray-700 text-md mb-1">
            {event.date} - {event.time}
          </p>
          <p className="text-gray-600 text-sm">{event.location}</p>
        </div>
        <div className="mt-4 text-center">
          <Link
            to={`/events/${event._id}`}
            className="inline-block bg-indigo-500 text-white text-sm font-medium rounded-full px-4 py-2 hover:bg-indigo-600 transition-colors"
          >
            View Details
          </Link>
        </div>
      </Link>
    </div>
  );
};

export default EventCard;
