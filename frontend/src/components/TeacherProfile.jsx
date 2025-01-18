import React, { useState } from 'react';
import { FiCamera, FiX } from 'react-icons/fi'; // Icons for change/remove photo
import { useNavigate } from 'react-router-dom';

const TeacherProfile = () => {
  const [profilePhoto, setProfilePhoto] = useState(null); // State to store the profile photo
  const [teacherDetails, setTeacherDetails] = useState({
    name: 'John Doe',
    role: 'Teacher',
    teacherCode: 'T-12345',
    subjects: ['Math', 'Science'],
    classes: ['Class 1', 'Class 2'],
  });

  const [isEditing, setIsEditing] = useState(false); // Toggle for edit mode
  const navigate = useNavigate();

  // Handle changing the profile photo
  const handleChangePhoto = (event) => {
    const file = event.target.files[0];
    if (file) {
      setProfilePhoto(URL.createObjectURL(file)); // Update the profile photo
    }
  };

  // Handle removing the profile photo
  const handleRemovePhoto = () => {
    setProfilePhoto(null); // Remove the photo
  };

  // Handle toggling the edit mode
  const handleEditProfile = () => {
    setIsEditing(!isEditing); // Toggle the edit mode
  };

  // Handle saving the updated profile
  const handleSaveProfile = () => {
    // Here, you would save the updated teacher details (e.g., to the backend or localStorage)
    setIsEditing(false);
  };

  return (
    <div className="flex items-center justify-center p-6">
      <div className="bg-white rounded-lg shadow-md p-6 w-full max-w-4xl">
        {/* Profile Card */}
        <div className="flex items-center mb-6">
          {/* Profile Photo */}
          <div className="relative mr-6">
            <img
              src={profilePhoto || '/default-profile.jpg'} // Default image if no photo is uploaded
              alt="Profile"
              className="w-32 h-32 rounded-full object-cover"
            />
            <div className="absolute bottom-0 right-0 bg-white p-1 rounded-full">
              <label htmlFor="profile-photo">
                <FiCamera size={20} className="text-gray-600 cursor-pointer" />
              </label>
              <input
                type="file"
                id="profile-photo"
                className="hidden"
                accept="image/*"
                onChange={handleChangePhoto}
              />
              {profilePhoto && (
                <FiX
                  size={20}
                  className="text-red-600 cursor-pointer mt-1"
                  onClick={handleRemovePhoto}
                />
              )}
            </div>
          </div>

          {/* Teacher Details */}
          <div className="flex flex-col">
            <h2 className="text-2xl font-semibold">{teacherDetails.name}</h2>
            <p className="text-gray-600">{teacherDetails.role}</p>
            <p className="text-gray-600">Teacher Code: {teacherDetails.teacherCode}</p>
            <p className="text-gray-600">Subjects: {teacherDetails.subjects.join(', ')}</p>
            <p className="text-gray-600">Classes: {teacherDetails.classes.join(', ')}</p>
          </div>
        </div>

        {/* Edit Profile Button */}
        <div className="flex justify-end mt-4">
          <button
            onClick={handleEditProfile}
            className="bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-500"
          >
            {isEditing ? 'Cancel' : 'Edit Profile'}
          </button>
        </div>

        {/* Edit Profile Form (visible when isEditing is true) */}
        {isEditing && (
          <div className="mt-6">
            <div className="mb-4">
              <label className="block text-gray-600">Name</label>
              <input
                type="text"
                value={teacherDetails.name}
                onChange={(e) => setTeacherDetails({ ...teacherDetails, name: e.target.value })}
                className="w-full p-2 border border-gray-300 rounded-md"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-600">Subjects</label>
              <input
                type="text"
                value={teacherDetails.subjects.join(', ')}
                onChange={(e) =>
                  setTeacherDetails({ ...teacherDetails, subjects: e.target.value.split(', ') })
                }
                className="w-full p-2 border border-gray-300 rounded-md"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-600">Classes</label>
              <input
                type="text"
                value={teacherDetails.classes.join(', ')}
                onChange={(e) =>
                  setTeacherDetails({ ...teacherDetails, classes: e.target.value.split(', ') })
                }
                className="w-full p-2 border border-gray-300 rounded-md"
              />
            </div>
            <div className="flex justify-end">
              <button
                onClick={handleSaveProfile}
                className="bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-500"
              >
                Save Changes
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TeacherProfile;
