import { useState } from "react";
import AddTeacher from "../components/AddTeacher";
import TeachersList from "../components/TeachersList";
import GenerateTimetable from "../components/GenerateTimetable";
import { FaChalkboardTeacher, FaPlusCircle, FaCalendarAlt, FaMoon, FaSun } from "react-icons/fa";

function AdminDashboard() {
  const [activeSection, setActiveSection] = useState("teachersList"); // Default section
  const [darkTheme, setDarkTheme] = useState(false); // Toggle theme

  return (
    <div className={`${darkTheme ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"} h-screen flex`}>
      {/* Sidebar */}
      <div className="bg-gray-800 text-white w-64 p-6 space-y-6">
        <h2 className="text-xl font-bold mb-6">Admin Dashboard</h2>
        <nav>
          <ul className="space-y-4">
            <li>
              <button
                onClick={() => setActiveSection("teachersList")}
                className={`flex items-center w-full text-left space-x-2 p-2 rounded hover:bg-gray-700 ${
                  activeSection === "teachersList" && "bg-gray-700"
                }`}
              >
                <FaChalkboardTeacher />
                <span>Teachers List</span>
              </button>
            </li>
            <li>
              <button
                onClick={() => setActiveSection("addTeacher")}
                className={`flex items-center w-full text-left space-x-2 p-2 rounded hover:bg-gray-700 ${
                  activeSection === "addTeacher" && "bg-gray-700"
                }`}
              >
                <FaPlusCircle />
                <span>Add Teacher</span>
              </button>
            </li>
            <li>
              <button
                onClick={() => setActiveSection("GenerateTimetable")}
                className={`flex items-center w-full text-left space-x-2 p-2 rounded hover:bg-gray-700 ${
                  activeSection === "timetable" && "bg-gray-700"
                }`}
              >
                <FaCalendarAlt />
                <span>Generate Timetable</span>
              </button>
            </li>
          </ul>
        </nav>

        {/* Theme Toggle */}
        <div className="mt-auto flex items-center justify-between">
          <span className="font-bold">Theme</span>
          <button
            onClick={() => setDarkTheme(!darkTheme)}
            className="p-2 rounded-full bg-gray-700 hover:bg-gray-600"
          >
            {darkTheme ? <FaSun className="text-yellow-400" /> : <FaMoon />}
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-col flex-grow">
        {/* Header */}
        <header className={`${darkTheme ? "bg-gray-800" : "bg-gray-100"} p-4 shadow`}>
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold">Welcome, Admin</h1>
            <button className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition duration-300">
              Logout
            </button>
          </div>
        </header>

        {/* Content Area */}
        <div className="p-6 flex-grow overflow-y-auto">
          {activeSection === "teachersList" && <TeachersList />}
          {activeSection === "addTeacher" && <AddTeacher />}
          {activeSection === "GenerateTimetable" && <GenerateTimetable />}
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
