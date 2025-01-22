import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion"; // For animations
import { InformationCircleIcon } from "@heroicons/react/24/outline"; // For icons

function AddTeacher() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [teacherCode, setTeacherCode] = useState("");
  const [selectedSubjects, setSelectedSubjects] = useState([]);
  const [selectedClasses, setSelectedClasses] = useState([]);

  const subjects = [
    "English",
    "Mathematics",
    "Kiswahili",
    "Chemistry",
    "Biology",
    "Physics",
    "Business Studies",
    "Agriculture",
    "CRE",
    "History",
    "Geography",
  ];

  const classes = ["Form 2 East", "Form 2 West", "Form 3", "Form 4"];

  const navigate = useNavigate();

  const handleSubjectChange = (event) => {
    const value = event.target.value;
    setSelectedSubjects((prevSubjects) =>
      prevSubjects.includes(value)
        ? prevSubjects.filter((subject) => subject !== value)
        : [...prevSubjects, value]
    );
  };

  const handleClassChange = (event) => {
    const value = event.target.value;
    setSelectedClasses((prevClasses) =>
      prevClasses.includes(value)
        ? prevClasses.filter((klass) => klass !== value)
        : [...prevClasses, value]
    );
  };

  const handleAddTeacher = (e) => {
    e.preventDefault();
    console.log(`Adding teacher: ${name}, ${email}, ${teacherCode}`);
    console.log("Subjects:", selectedSubjects);
    console.log("Classes:", selectedClasses);

    localStorage.setItem("teacherName", name);
    localStorage.setItem("teacherEmail", email);
    localStorage.setItem("teacherCode", teacherCode);
    localStorage.setItem("selectedSubjects", JSON.stringify(selectedSubjects));
    localStorage.setItem("selectedClasses", JSON.stringify(selectedClasses));
    localStorage.setItem("profileCompleted", "true");

    navigate("/teacher-dashboard");
  };

  return (
    <div className="bg-gradient-to-br from-blue-200 via-purple-100 to-pink-200 min-h-screen flex items-center justify-center p-6">
      <motion.div
        className="bg-white rounded-lg shadow-lg p-8 max-w-2xl w-full"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
      >
        <motion.h2
          className="text-4xl font-extrabold text-Cyan-300 text-center mb-8"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          Add Teacher
        </motion.h2>
        <form onSubmit={handleAddTeacher} className="space-y-8">
          {/* Name */}
          <div>
            <label className="block text-lg font-semibold text-gray-700 flex items-center">
              Name
              <InformationCircleIcon
                className="w-5 h-5 text-blue-400 ml-2"
                title="Enter the teacher's full name."
              />
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full mt-2 border border-gray-300 rounded-lg p-3 text-gray-700 focus:ring focus:ring-blue-400 focus:outline-none transition"
              placeholder="Enter teacher's full name"
              required
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-lg font-semibold text-gray-700 flex items-center">
              Email
              <InformationCircleIcon
                className="w-5 h-5 text-blue-400 ml-2"
                title="Enter the teacher's email address."
              />
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full mt-2 border border-gray-300 rounded-lg p-3 text-gray-700 focus:ring focus:ring-blue-400 focus:outline-none transition"
              placeholder="Enter teacher's email address"
              required
            />
          </div>

     

          {/* Teacher's Code */}
          <div>
            <label className="block text-lg font-semibold text-gray-700 flex items-center">
              Teacher's Code
              <InformationCircleIcon
                className="w-5 h-5 text-blue-400 ml-2"
                title="Enter a unique code for the teacher."
              />
            </label>
            <input
              type="text"
              value={teacherCode}
              onChange={(e) => setTeacherCode(e.target.value)}
              className="w-full mt-2 border border-gray-300 rounded-lg p-3 text-gray-700 focus:ring focus:ring-blue-400 focus:outline-none transition"
              placeholder="Enter unique teacher code"
              required
            />
          </div>

          {/* Subject Selection */}
          <div>
            <label className="block text-lg font-semibold text-gray-700 flex items-center">
              Subjects
              <InformationCircleIcon
                className="w-5 h-5 text-blue-400 ml-2"
                title="Select the subjects the teacher will handle."
              />
            </label>
            <div className="grid grid-cols-2 gap-4 mt-4">
              {subjects.map((subject) => (
                <motion.div
                  key={subject}
                  className="flex items-center"
                  whileHover={{ scale: 1.05 }}
                >
                  <input
                    type="checkbox"
                    id={subject}
                    value={subject}
                    onChange={handleSubjectChange}
                    className="w-5 h-5 text-blue-600 focus:ring focus:ring-blue-400 rounded"
                  />
                  <label
                    htmlFor={subject}
                    className="ml-2 text-gray-700 font-medium"
                  >
                    {subject}
                  </label>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Class Selection */}
          <div>
            <label className="block text-lg font-semibold text-gray-700 flex items-center">
              Classes
              <InformationCircleIcon
                className="w-5 h-5 text-blue-400 ml-2"
                title="Select the classes the teacher will be assigned."
              />
            </label>
            <div className="grid grid-cols-2 gap-4 mt-4">
              {classes.map((klass) => (
                <motion.div
                  key={klass}
                  className="flex items-center"
                  whileHover={{ scale: 1.05 }}
                >
                  <input
                    type="checkbox"
                    id={klass}
                    value={klass}
                    onChange={handleClassChange}
                    className="w-5 h-5 text-blue-600 focus:ring focus:ring-blue-400 rounded"
                  />
                  <label
                    htmlFor={klass}
                    className="ml-2 text-gray-700 font-medium"
                  >
                    {klass}
                  </label>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Submit Button */}
          <motion.button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white text-lg font-semibold py-3 rounded-lg hover:bg-blue-700 shadow-lg transition duration-300 flex items-center justify-center"
            whileHover={{ scale: 1.05 }}
          >
            <span className="mr-2">Add Teacher + </span>
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
}

export default AddTeacher;
