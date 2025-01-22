import React, { useState } from "react";
import { FiLogOut, FiPieChart, FiCalendar, FiMoon, FiSun } from "react-icons/fi";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import Timetable from "../components/Timetable";

ChartJS.register(ArcElement, Tooltip, Legend);

function TeacherDashboard() {
  const [activeSection, setActiveSection] = useState("overview");
  const [darkMode, setDarkMode] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    window.location.href = "/login";
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const statistics = {
    totalLessons: 20,
    lessonsTaught: 12,
  };

  const remainingLessons = statistics.totalLessons - statistics.lessonsTaught;

  const lessonsData = {
    labels: ["Lessons Remaining", "Lessons Taught"],
    datasets: [
      {
        data: [remainingLessons, statistics.lessonsTaught],
        backgroundColor: ["#FFD700", "#4CAF50"],
        borderColor: ["#FFD700", "#4CAF50"],
        borderWidth: 3,
        hoverOffset: 10,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
        labels: {
          color: darkMode ? "#fff" : "#333",
          font: { size: 14, weight: "bold" },
        },
      },
    },
  };

  return (
    <div
      className={`h-screen flex ${
        darkMode ? "bg-gray-900 text-white" : "bg-gradient-to-br from-gray-50 to-gray-200 text-gray-900"
      }`}
    >
      {/* Sidebar */}
      <div
        className={`w-64 ${
          darkMode ? "bg-gray-800" : "bg-gray-900"
        } text-white flex flex-col justify-between shadow-xl`}
      >
        <div>
          <div className="p-6 text-2xl font-bold flex items-center justify-between">
            Dashboard
            <button onClick={toggleDarkMode} className="text-lg">
              {darkMode ? <FiSun /> : <FiMoon />}
            </button>
          </div>
          <ul className="mt-10 space-y-6">
            <li
              onClick={() => setActiveSection("overview")}
              className={`flex items-center space-x-3 cursor-pointer hover:bg-gray-700 p-4 rounded-lg transition-all ${
                activeSection === "overview" && "bg-gray-700"
              }`}
            >
              <FiPieChart size={24} />
              <span>Overview</span>
            </li>
            <li
              onClick={() => setActiveSection("timetable")}
              className={`flex items-center space-x-3 cursor-pointer hover:bg-gray-700 p-4 rounded-lg transition-all ${
                activeSection === "timetable" && "bg-gray-700"
              }`}
            >
              <FiCalendar size={24} />
              <span>View Timetable</span>
            </li>
          </ul>
        </div>
        <div className="p-4">
          <button
            onClick={handleLogout}
            className="w-full bg-red-500 hover:bg-red-600 text-white font-bold py-3 px-4 rounded-lg transition-all flex items-center justify-center space-x-2"
          >
            <FiLogOut size={20} />
            <span>Logout</span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8 overflow-auto">
        {activeSection === "overview" && (
          <div>
            {/* Overview Section */}
            <h1 className="text-3xl font-extrabold mb-6">
              Welcome, Teacher!
            </h1>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Pie Chart Section */}
              <div
                className={`rounded-3xl shadow-xl p-8 flex flex-col items-center ${
                  darkMode ? "bg-gray-700" : "bg-white"
                }`}
              >
                <h2 className="text-2xl font-semibold mb-4">
                  Lesson Statistics
                </h2>
                <div className="w-80 h-80">
                  <Pie data={lessonsData} options={options} />
                </div>
              </div>

              {/* Additional Info */}
              <div className="bg-gradient-to-r from-blue-500 to-green-400 text-white rounded-3xl shadow-xl p-8">
                <h2 className="text-2xl font-semibold mb-6">Quick Overview</h2>
                <div className="space-y-4">
                  <p className="text-lg font-medium">
                    Total Lessons: <span className="font-extrabold">{statistics.totalLessons}</span>
                  </p>
                  <p className="text-lg font-medium">
                    Lessons Taught: <span className="font-extrabold">{statistics.lessonsTaught}</span>
                  </p>
                  <p className="text-lg font-medium">
                    Remaining: <span className="font-extrabold">{remainingLessons}</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeSection === "timetable" && (
          <div className="h-full">
            {/* Timetable Section */}
            <h1 className="text-3xl font-extrabold mb-6">Your Timetable</h1>
            <div
              className={`rounded-3xl shadow-xl h-full p-8 overflow-auto ${
                darkMode ? "bg-gray-700" : "bg-white"
              }`}
            >
              <Timetable />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default TeacherDashboard;
