import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ProfileForm = () => {
  const [teacherName, setTeacherName] = useState('');
  const [teacherCode, setTeacherCode] = useState('');
  const [selectedSubjects, setSelectedSubjects] = useState([]);
  const [selectedClasses, setSelectedClasses] = useState([]);
  
  const subjects = [
    'English', 'Mathematics', 'Kiswahili', 'Chemistry', 'Biology', 'Physics', 'Business Studies', 'Agriculture', 'CRE', 'History', 'Geography'
  ];
  
  const classes = [
    'Form 2 East', 'Form 2 West', 'Form 3', 'Form 4'
  ];
  
  const navigate = useNavigate();
  
  const handleSubjectChange = (event) => {
    const value = event.target.value;
    setSelectedSubjects((prevSubjects) => 
      prevSubjects.includes(value) ? prevSubjects.filter(subject => subject !== value) : [...prevSubjects, value]
    );
  };
  
  const handleClassChange = (event) => {
    const value = event.target.value;
    setSelectedClasses((prevClasses) => 
      prevClasses.includes(value) ? prevClasses.filter(klass => klass !== value) : [...prevClasses, value]
    );
  };
  
  const handleSubmit = (event) => {
    event.preventDefault();

    // Save profile information in localStorage
    localStorage.setItem('teacherName', teacherName);
    localStorage.setItem('teacherCode', teacherCode);
    localStorage.setItem('selectedSubjects', JSON.stringify(selectedSubjects));
    localStorage.setItem('selectedClasses', JSON.stringify(selectedClasses));
    
    // Mark the profile as completed
    localStorage.setItem('profileCompleted', 'true');

    // Redirect to the teacher dashboard
    navigate('/teacher-dashboard');
  };

  return (
    <div className="p-6 bg-gray-50 rounded-lg shadow-lg max-w-lg mx-auto">
      <h2 className="text-2xl font-bold mb-4">Teacher Profile Form</h2>
      
      <form onSubmit={handleSubmit}>
        {/* Teacher's Name */}
        <div className="mb-4">
          <label className="block text-lg font-medium mb-2" htmlFor="teacherName">
            Teacher's Name
          </label>
          <input
            type="text"
            id="teacherName"
            name="teacherName"
            value={teacherName}
            onChange={(e) => setTeacherName(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-lg"
            required
          />
        </div>

        {/* Teacher's Code */}
        <div className="mb-4">
          <label className="block text-lg font-medium mb-2" htmlFor="teacherCode">
            Teacher's Code
          </label>
          <input
            type="text"
            id="teacherCode"
            name="teacherCode"
            value={teacherCode}
            onChange={(e) => setTeacherCode(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-lg"
            required
          />
        </div>

        {/* Subject Selection */}
        <div className="mb-4">
          <label className="block text-lg font-medium mb-2">Subjects</label>
          <div className="flex flex-wrap gap-4">
            {subjects.map((subject) => (
              <div key={subject} className="flex items-center">
                <input
                  type="checkbox"
                  id={subject}
                  value={subject}
                  onChange={handleSubjectChange}
                  className="mr-2"
                />
                <label htmlFor={subject}>{subject}</label>
              </div>
            ))}
          </div>
        </div>

        {/* Class Selection */}
        <div className="mb-4">
          <label className="block text-lg font-medium mb-2">Classes</label>
          <div className="flex flex-wrap gap-4">
            {classes.map((klass) => (
              <div key={klass} className="flex items-center">
                <input
                  type="checkbox"
                  id={klass}
                  value={klass}
                  onChange={handleClassChange}
                  className="mr-2"
                />
                <label htmlFor={klass}>{klass}</label>
              </div>
            ))}
          </div>
        </div>

        {/* Submit Button */}
        <div className="mt-4">
          <button
            type="submit"
            className="w-full p-3 bg-blue-500 text-white rounded-lg"
          >
            Complete Profile
          </button>
        </div>
      </form>

      {/* Profile Summary (Optional) */}
      {teacherName && teacherCode && selectedSubjects.length && selectedClasses.length && (
        <div className="mt-6 bg-gray-100 p-4 rounded-lg">
          <h3 className="text-xl font-bold mb-2">Profile Summary</h3>
          <p><strong>Name:</strong> {teacherName}</p>
          <p><strong>Teacher's Code:</strong> {teacherCode}</p>
          <p><strong>Subjects:</strong> {selectedSubjects.join(', ')}</p>
          <p><strong>Classes:</strong> {selectedClasses.join(', ')}</p>
        </div>
      )}
    </div>
  );
};

export default ProfileForm;
