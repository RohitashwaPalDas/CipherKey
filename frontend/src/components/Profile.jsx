import React, { useContext } from "react";
import { AuthContext } from "../AuthContext";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  return (
    <>
      <div className="absolute inset-0 -z-10 h-full w-full items-center px-5 py-24 [background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#63e_100%)]"></div>
      <div className="flex items-center justify-center text-white relative align-middle h-full">
        {/* Profile Container */}
        <div className="w-full max-w-4xl bg-gray-800 shadow-xl rounded-lg p-8 flex flex-col md:flex-row items-center justify-center">
          {/* Profile Image */}
          <div className="w-40 h-40 md:w-48 md:h-48 mb-6 md:mb-0">
            <div className="w-full h-full rounded-full border-4 border-green-500 text-center flex items-center justify-center bg-gray-700 text-gray-400 text-6xl font-bold">
              <span className="text-green-500">
                {user.firstname.charAt(0) + user.lastname.charAt(0)}
              </span>
            </div>
          </div>

          {/* User Info */}
          <div className="flex-1 text-center md:text-left px-6">
            <h2 className="text-3xl font-bold text-green-500">
              {user?.firstname} {user?.lastname}
            </h2>
            <p className="text-gray-300 text-lg">@{user?.username}</p>

            <div className="mt-4 space-y-3 text-gray-200">
              <p>
                <span className="font-semibold">Username:</span>{" "}
                {user?.username}
              </p>
            </div>

            {/* Logout Button */}
            <button
              onClick={() => {
                logout();
                navigate("/login");
              }}
              className="mt-5 w-full md:w-auto bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-6 rounded-lg transition-all cursor-pointer"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
