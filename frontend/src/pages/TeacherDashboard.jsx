import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Timetable from "../components/Timetable";
import ProfileForm from "../components/ProfileForm"; // Correct import path
import { FiLogOut } from "react-icons/fi";
import { FiSettings } from "react-icons/fi";
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, Title, DoughnutController } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';

// Registering chart.js components
ChartJS.register(ArcElement, Tooltip, Legend, Title, DoughnutController, ChartDataLabels);

function TeacherDashboard() {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [viewTimetable, setViewTimetable] = useState(false);
    const navigate = useNavigate();

    const handleDropdownToggle = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    const handleLogout = () => {
        console.log('Logging out...');
        localStorage.removeItem('authToken'); 
        navigate('/login');
    };

    const handleEditProfile = () => {
        navigate('/teacher-profile'); // Navigate to Teacher Profile
    };

    const handleViewTimetable = () => {
        setViewTimetable(true);
    };

    const handleGoBackToDashboard = () => {
        setViewTimetable(false);
    };

    // Mock data for total lessons and lessons remaining
    const statistics = {
        totalLessons: 20,
        lessonsTaught: 12,
    };

    const remainingLessons = statistics.totalLessons - statistics.lessonsTaught;

    const lessonsData = {
        labels: ['Lessons Remaining', 'Lessons Taught'],
        datasets: [
            {
                data: [remainingLessons, statistics.lessonsTaught],
                backgroundColor: ['#FFEB3B', '#4CAF50'],
                borderColor: ['#FFEB3B', '#4CAF50'],
                borderWidth: 1
            }
        ]
    };

    const options = {
        responsive: true,
        plugins: {
            tooltip: {
                callbacks: {
                    label: function(tooltipItem) {
                        const percentage = Math.round(tooltipItem.raw / statistics.totalLessons * 100);
                        return `${tooltipItem.label}: ${percentage}%`;
                    }
                }
            },
            legend: {
                position: 'top',
            },
            datalabels: {
                formatter: function(value, context) {
                    const total = context.dataset.data.reduce((sum, data) => sum + data, 0);
                    const percentage = Math.round((value / total) * 100);
                    return `${percentage}%`;
                },
                color: '#fff',
                font: {
                    weight: 'bold',
                    size: 16
                },
                align: 'center',
                anchor: 'center',
            },
        }
    };

    return (
        <div className="flex h-screen bg-gray-100">
            <div className="w-24 bg-gray-800 text-white p-4 flex flex-col items-center">
                <div className="mt-auto relative group">
                    <button
                        onClick={handleLogout}
                        className="bg-red-600 text-white p-3 rounded-full hover:bg-red-500"
                    >
                        <FiLogOut size={24} />
                    </button>
                    <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 hidden group-hover:block bg-black text-white text-sm rounded-md py-1 px-2">
                        Logout
                    </div>
                </div>
            </div>

            <div className="flex-1">
                <div className="flex justify-between items-center bg-gray-800 text-white p-4">
                    <div className="flex items-center">
                        <span className="text-xl font-semibold">Teacher Dashboard</span>
                    </div>

                    <div className="flex items-center space-x-6">
                        <button
                            onClick={handleViewTimetable}
                            className="bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-500"
                        >
                            View Timetable
                        </button>

                        <div className="relative">
                            <button
                                onClick={handleDropdownToggle}
                                className="bg-red-600 text-white p-2 rounded-md hover:bg-red-500 flex items-center"
                            >
                                <FiSettings size={18} className="mr-2" />
                                Settings
                            </button>

                            {isDropdownOpen && (
                                <div className="absolute right-0 mt-2 w-48 bg-white text-black rounded-lg shadow-lg">
                                    <ul>
                                        <li>
                                            <button
                                                onClick={handleEditProfile}
                                                className="block px-4 py-2 w-full text-left hover:bg-gray-100"
                                            >
                                                My Profile
                                            </button>
                                        </li>
                                    </ul>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {viewTimetable ? (
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <button
                            onClick={handleGoBackToDashboard}
                            className="bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-500 mb-4"
                        >
                            Back to Dashboard
                        </button>
                        <h2 className="text-2xl font-semibold mb-4">Teacher's Timetable</h2>
                        <Timetable />
                    </div>
                ) : (
                    <div className="p-6">
                        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
                            <h3 className="text-xl font-semibold mb-4">Lessons Remaining This Week</h3>
                            <div className="w-48 h-48 mx-auto">
                                <Pie data={lessonsData} options={options} />
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default TeacherDashboard;
