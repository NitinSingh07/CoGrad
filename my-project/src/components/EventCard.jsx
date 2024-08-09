// src/components/EventCard.jsx
import React from "react";
import { Link } from "react-router-dom";
import { FaCalendarAlt, FaClock, FaMapMarkerAlt } from "react-icons/fa";

const EventCard = ({ event }) => {
  return (
    <div className="bg-indigo-100 border border-gray-300 rounded-lg shadow-lg overflow-hidden transition-transform transform hover:scale-105 hover:shadow-2xl hover:border-indigo-500">
      <Link
        to={`/events/${event._id}`}
        className="block p-6 hover:bg-indigo-200 transition-colors"
      >
        <div className="flex flex-col items-center text-center">
          <h2 className="text-2xl font-semibold text-gray-900 mb-3">
            {event.title}
          </h2>
          <div className="flex flex-row justify-between gap-4">
            <div className="flex items-center  text-gray-800">
              <FaCalendarAlt className="mr-2 text-blue-500" />
              <span className="text-lg">
                {new Date(event.date).toLocaleDateString()}
              </span>
            </div>
            <div className="flex items-center text-gray-700">
              <FaClock className="mr-2 text-blue-500" />
              <span className="text-lg">{event.time}</span>
            </div>
            <div className="flex items-center  text-gray-600">
              <FaMapMarkerAlt className="mr-2 text-blue-500" />
              <span className="text-lg">{event.location}</span>
            </div>
          </div>
        </div>
        <div className="mt-4 text-center">
          <Link
            to={`/events/${event._id}`}
            className="inline-block bg-blue-600  text-white text-lg font-medium rounded-lg px-6 py-2 hover:bg-blue-700 transition-colors"
          >
            View Details
          </Link>
        </div>
      </Link>
    </div>
  );
};

export default EventCard;
