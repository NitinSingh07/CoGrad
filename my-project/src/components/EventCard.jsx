// src/components/EventCard.jsx
import React from "react";
import { Link } from "react-router-dom";
import { FaCalendarAlt, FaClock, FaMapMarkerAlt } from "react-icons/fa";

const EventCard = ({ event }) => {
  // Array of images for the event
  const images = [
    "/event.jpg",
    "/event2.jpg",
    "event3.jpg",
    "event4.jpg",
    "event5.jpg",
  ];

  // Function to select a random image
  const getRandomImage = () => {
    const randomIndex = Math.floor(Math.random() * images.length);
    return images[randomIndex];
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-md overflow-hidden transition-transform transform hover:scale-105 hover:shadow-xl hover:border-indigo-400">
      <Link to={`/events/${event._id}`} className="block">
        <div className="relative w-full h-48">
          <img
            src={getRandomImage()} // Use the random image
            alt="Event"
            className="w-full h-full object-cover rounded-t-lg"
          />
        </div>
        <div className="p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            {event.title}
          </h2>
          <div className="flex flex-col gap-3">
            <div className="flex items-center text-gray-800">
              <FaCalendarAlt className="mr-3 text-blue-500 text-lg" />
              <span className="text-sm font-medium">
                {new Date(event.date).toLocaleDateString()}
              </span>
            </div>
            <div className="flex items-center text-gray-700">
              <FaClock className="mr-3 text-blue-500 text-lg" />
              <span className="text-sm font-medium">{event.time}</span>
            </div>
            <div className="flex items-center text-gray-600">
              <FaMapMarkerAlt className="mr-3 text-blue-500 text-lg" />
              <span className="text-sm font-medium">{event.location}</span>
            </div>
          </div>
          <div className="mt-4 text-center">
            <Link
              to={`/events/${event._id}`}
              className="inline-block bg-blue-600 text-white text-sm font-medium rounded-lg px-5 py-2 hover:bg-blue-700 transition-colors"
            >
              View Details
            </Link>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default EventCard;
