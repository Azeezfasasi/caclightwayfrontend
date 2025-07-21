import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useProfile } from '../../context-api/ProfileContext'; 
import { FaSignOutAlt, FaQuestionCircle, FaTimesCircle } from 'react-icons/fa'; 

const LogoutButton = () => {
  const [showModal, setShowModal] = useState(false);
  const { logout } = useProfile(); // Get the logout function from your context
  const navigate = useNavigate();

  // Function to handle logout confirmation
  const handleLogout = () => {
    logout(); // Call the logout function from your context
    setShowModal(false); // Close the modal
    navigate('/'); // Redirect to home page or login page after logout
    // You might want to navigate to '/login' specifically if your app has a dedicated login page
  };

  return (
    <>
      <button
        onClick={() => setShowModal(true)}
        className="w-full text-left flex items-center space-x-2 px-4 py-2 text-sm text-red-700 hover:bg-red-100 hover:text-red-800 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 cursor-pointer"
      >
        <FaSignOutAlt className="w-5 h-5" />
        <span>Logout</span>
      </button>

      {showModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-75 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md transform transition-all duration-300 scale-100 opacity-100">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold text-gray-800 flex items-center">
                <FaQuestionCircle className="text-yellow-500 mr-2" /> Confirm Logout
              </h3>
              <button
                onClick={() => setShowModal(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors duration-200"
              >
                <FaTimesCircle className="w-4 h-4" />
              </button>
            </div>
            <p className="text-gray-700 mb-6">Are you sure you want to log out?</p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setShowModal(false)}
                className="px-5 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-offset-2"
              >
                No, Cancel
              </button>
              <button
                onClick={handleLogout}
                className="px-5 py-2 rounded-md text-white bg-red-600 hover:bg-red-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
              >
                Yes, Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default LogoutButton;
