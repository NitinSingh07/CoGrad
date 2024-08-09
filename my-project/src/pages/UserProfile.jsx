import React from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const UserProfile = () => {
  const navigate = useNavigate();
  const currentUser = useSelector((state) => state.user.currentUser);

  return (
    <div className="container mx-auto p-6 mt-6 bg-white shadow-lg rounded-lg max-w-3xl">
      {currentUser ? (
        <>
          <div className="flex items-center space-x-6 mb-6">
            <img
              src={currentUser?.photoUrl}
              alt={currentUser?.userName}
              className="w-32 h-32 rounded-full border-4 border-indigo-500 shadow-md"
            />
            <div>
              <h1 className="text-3xl font-bold text-gray-800">
                {currentUser?.userName}
              </h1>
              <p className="text-lg text-gray-600">{currentUser?.email}</p>
            </div>
          </div>
          <div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Events Organized
            </h2>
            {currentUser?.events && currentUser.events.length > 0 ? (
              <ul className="list-disc pl-5 space-y-3">
                {currentUser.events.map((event) => (
                  <li
                    key={event.id}
                    className="p-4 bg-gray-100 rounded-lg shadow-sm"
                  >
                    <h3 className="text-xl font-semibold text-gray-700">
                      {event.name}
                    </h3>
                    <p className="text-gray-500">
                      Date: {new Date(event.date).toLocaleDateString()}
                    </p>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500">No events created yet.</p>
            )}
          </div>
        </>
      ) : (
        <div className="text-center text-gray-600">Loading...</div>
      )}
    </div>
  );
};

export default UserProfile;
