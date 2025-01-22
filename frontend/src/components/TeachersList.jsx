import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { CalendarDaysIcon, EyeIcon, TrashIcon } from "@heroicons/react/24/outline"; // Correct v2 imports

const TeachersList = () => {
  const navigate = useNavigate();

  // State to manage the list of teachers
  const [teachers, setTeachers] = useState([
    { id: 1, name: "John Doe" },
    { id: 2, name: "Jane Smith" },
    { id: 3, name: "Emily Johnson" },
  ]);

  // Handle DELETE TEACH
  const handleDelete = (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this teacher?");
    if (confirmDelete) {
      setTeachers((prevTeachers) => prevTeachers.filter((teacher) => teacher.id !== id));
    }
  };

  // Handle CREATE TIMETABLE (Navigate to timetable creation page)
  const handleCreateTimetable = (id) => {
    navigate(`/create-timetable/${id}`); // Dynamic routing for timetable creation
  };

  // Handle VIEW TEACH TIME (Navigate to teacher details page)
  const handleViewTeachTime = (id) => {
    navigate(`/teacher/${id}`); // Dynamic routing for teacher details
  };

  return (
    <div className="bg-gradient-to-b from-gray-800 to-gray-900 p-6 min-h-screen">
      <motion.h1
        className="text-white text-2xl mb-6 font-bold text-center"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        THE TEACHERS
      </motion.h1>

      <div className="space-y-6">
        {teachers.map((teacher) => (
          <motion.div
            key={teacher.id}
            className="flex items-center justify-between bg-gray-300 px-6 py-4 rounded-lg shadow-md"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          >
            {/* Teacher Name */}
            <span className="font-semibold text-gray-800 text-lg">{teacher.name}</span>

            {/* Buttons */}
            <div className="flex space-x-3">
              {/* CREATE TIMETABLE Button */}
              <motion.button
                className="flex items-center space-x-2 bg-yellow-400 text-white px-4 py-2 rounded-full shadow-lg hover:bg-yellow-500 hover:shadow-xl focus:ring-4 focus:ring-yellow-300 transform transition-transform"
                whileTap={{ scale: 0.95 }}
                onClick={() => handleCreateTimetable(teacher.id)}
              >
                <CalendarDaysIcon className="h-5 w-5" />
                <span>Timetable</span>
              </motion.button>

              {/* VIEW TEACH TIME Button */}
              <motion.button
                className="flex items-center space-x-2 bg-blue-500 text-white px-4 py-2 rounded-full shadow-lg hover:bg-blue-600 hover:shadow-xl focus:ring-4 focus:ring-blue-300 transform transition-transform"
                whileTap={{ scale: 0.95 }}
                onClick={() => handleViewTeachTime(teacher.id)}
              >
                <EyeIcon className="h-5 w-5" />
                <span>View</span>
              </motion.button>

              {/* DELETE TEACH Button */}
              <motion.button
                className="flex items-center space-x-2 bg-red-500 text-white px-4 py-2 rounded-full shadow-lg hover:bg-red-600 hover:shadow-xl focus:ring-4 focus:ring-red-300 transform transition-transform"
                whileTap={{ scale: 0.95 }}
                onClick={() => handleDelete(teacher.id)}
              >
                <TrashIcon className="h-5 w-5" />
                <span>Delete</span>
              </motion.button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default TeachersList;
