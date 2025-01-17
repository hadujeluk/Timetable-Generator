import React from "react";
import { useNavigate } from "react-router-dom";

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div
      className="h-screen bg-cover bg-center flex flex-col justify-between items-center text-center relative"
      style={{
        backgroundImage: "url('/src/assets/images/bg.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Timetable Generator Title at the top */}
      <h1 className="text-[#481E2D] text-6xl font-bold mt-10">
        Timetable Generator
      </h1>

      {/* Buttons positioned at the top-right */}
      <div className="absolute top-5 right-5 space-x-4">
        <button
          className="px-6 py-3 text-white bg-[#481E2D] rounded-md hover:bg-opacity-80 transition"
          onClick={() => navigate("/login")}
        >
          Login
        </button>
        <button
          className="px-6 py-3 text-white bg-[#481E2D] rounded-md hover:bg-opacity-80 transition"
          onClick={() => navigate("/signup")}
        >
          Signup
        </button>
      </div>
    </div>
  );
};

export default LandingPage;
