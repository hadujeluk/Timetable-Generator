import React from "react";
import { useNavigate } from "react-router-dom";
import "animate.css"; // Ensure this is installed

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div
      className="h-screen  flex flex-col justify-center items-center text-center relative overflow-hidden"
      style={{
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Title with Custom Typography and Animation */}
      <h1 className="text-gray-800 text-8xl font-extrabold leading-tight drop-shadow-lg animate__animated animate__fadeInDown animate__delay-1s">
        Timetable Generator
      </h1>

      {/* Background Parallax Effect */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-75"
        style={{
          backgroundImage: "url('https://imgs.search.brave.com/5EKIVwTtCqig3F_ayOluxM5AhXcyy-Lr_pYwgFW7pIw/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvNTAz/MjQwMDU1L3Bob3Rv/L2NoYWxrYm9hcmQt/YmFja2dyb3VuZC14/eHhsLmpwZz9zPTYx/Mng2MTImdz0wJms9/MjAmYz15eUVEdnhR/c1RGamZYSWx1b1lV/cjlNOS1CMHVuWlpV/VnhYUzFtN2diQkZv/PQ')",
          transform: "translateZ(0)", // Enable parallax effect
        }}
      ></div>

      {/* Frosted Glass Effect for Buttons */}
      <div className="absolute top-10 right-10 space-x-6">
        <button
          className="px-8 py-4 text-lg font-semibold text-white bg-[#481E2D] bg-opacity-60 backdrop-blur-md rounded-lg shadow-xl transform transition-transform duration-300 ease-in-out hover:scale-105 hover:bg-[#F36D7F] hover:shadow-2xl focus:outline-none animate__animated animate__fadeInLeft animate__delay-1s"
          onClick={() => navigate("/login")}
        >
          Login
        </button>
        <button
          className="px-8 py-4 text-lg font-semibold text-white bg-[#481E2D] bg-opacity-60 backdrop-blur-md rounded-lg shadow-xl transform transition-transform duration-300 ease-in-out hover:scale-105 hover:bg-[#F36D7F] hover:shadow-2xl focus:outline-none animate__animated animate__fadeInLeft animate__delay-2s"
          onClick={() => navigate("/signup")}
        >
          Signup
        </button>
      </div>

     

      {/* Interactive Elements (Floating Particles) */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="animate-pulse">
          <div className="absolute top-10 left-10 w-2 h-2 bg-[#F36D7F] rounded-full opacity-50 animate-pulse"></div>
          <div className="absolute top-40 left-40 w-2 h-2 bg-[#F36D7F] rounded-full opacity-50 animate-pulse"></div>
          <div className="absolute top-60 left-60 w-2 h-2 bg-[#F36D7F] rounded-full opacity-50 animate-pulse"></div>
          {/* Add more particles as needed */}
        </div>
      </div>

      {/* Custom Fonts (Google Fonts) */}
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@700&family=Roboto:wght@400&display=swap');
          body {
            font-family: 'Poppins', sans-serif;
          }
        `}
      </style>
    </div>
  );
};

export default LandingPage;