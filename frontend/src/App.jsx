// // import React from 'react';
// // import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// // import LandingPage from './pages/LandingPage';
// // import Login from './pages/Login';
// // import Signup from './pages/Signup';
// // import Timetable from './components/Timetable'; // Timetable component
// // import ProfileForm from './components/ProfileForm'; // Import your ProfileForm component

// // const App = () => {
// //   // Check if the profile is completed (you can use localStorage, context, or state)
// //   const isProfileCompleted = localStorage.getItem('profileCompleted');

// //   return (
// //     <Router>
// //       <Routes>
// //         <Route path="/" element={<LandingPage />} />
// //         <Route path="/login" element={<Login />} />
// //         <Route path="/signup" element={<Signup />} />
        
// //         {/* Timetable route, only accessible if the profile is completed */}
// //         <Route path="/timetable" element={isProfileCompleted ? <Timetable /> : <Login />} />

// //         {/* Profile route */}
// //         <Route path="/profile" element={!isProfileCompleted ? <ProfileForm /> : <Timetable />} />
// //       </Routes>
// //     </Router>
// //   );
// // };

// // export default App;

// import React, { useState, useEffect } from 'react';
// import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
// import LandingPage from './pages/LandingPage';
// import Login from './pages/Login';
// import Signup from './pages/Signup';
// import TeacherDashboard from './pages/TeacherDashboard'; // Teacher Dashboard
// import Timetable from './components/Timetable'; // Timetable component
// import ProfileForm from './components/ProfileForm'; // ProfileForm component

// const App = () => {
//   const [isAuthenticated, setIsAuthenticated] = useState(false); // Manage authentication state

//   // Check if the user is logged in (you can adjust this logic as needed)
//   useEffect(() => {
//     const token = localStorage.getItem('authToken');
//     if (token) {
//       setIsAuthenticated(true);
//     }
//   }, []);

//   // Handle logout
//   const handleLogout = () => {
//     localStorage.removeItem('authToken'); // Clear the auth token
//     setIsAuthenticated(false);
//   };

//   return (
//     <Router>
//       <Routes>
//         <Route path="/" element={<LandingPage />} />
//         <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
//         <Route path="/signup" element={<Signup />} />

//         {/* Protected Route for Teacher Dashboard */}
//         <Route
//           path="/teacher-dashboard"
//           element={isAuthenticated ? <TeacherDashboard handleLogout={handleLogout} /> : <Navigate to="/login" />}
//         />

//         {/* Profile route */}
//         <Route path="/profile" element={<ProfileForm />} />

//         {/* Timetable route, only accessible if the profile is completed */}
//         <Route path="/timetable" element={<Timetable />} />
//       </Routes>
//     </Router>
//   );
// };

// export default App;
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import Login from './pages/Login';
import Signup from './pages/Signup';
import TeacherDashboard from './pages/TeacherDashboard'; // Teacher Dashboard
import TeacherProfile from './components/TeacherProfile'; // Teacher Profile Component
import Timetable from './components/Timetable';
import ProfileForm from './components/ProfileForm';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isProfileCompleted, setIsProfileCompleted] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    const profileStatus = localStorage.getItem('profileCompleted');
    if (token) {
      setIsAuthenticated(true);
    }
    if (profileStatus === 'true') {
      setIsProfileCompleted(true);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('profileCompleted');
    setIsAuthenticated(false);
    setIsProfileCompleted(false);
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
        <Route path="/signup" element={<Signup />} />

        <Route
          path="/teacher-dashboard"
          element={isAuthenticated && isProfileCompleted ? (
            <TeacherDashboard handleLogout={handleLogout} />
          ) : (
            <Navigate to="/login" />
          )}
        />

        <Route
          path="/teacher-profile"
          element={<TeacherProfile />}
        />

        <Route
          path="/profile"
          element={!isProfileCompleted ? <ProfileForm setIsProfileCompleted={setIsProfileCompleted} /> : <Navigate to="/teacher-dashboard" />}
        />

        <Route
          path="/timetable"
          element={isProfileCompleted ? <Timetable /> : <Navigate to="/profile" />}
        />
      </Routes>
    </Router>
  );
};

export default App;
