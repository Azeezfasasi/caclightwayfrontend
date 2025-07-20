// import React, { useState, useEffect, useCallback } from 'react';
// import axios from 'axios';
// import { ProfileContext } from './ProfileContext';
// import { API_BASE_URL } from '../../config/Api';


// export const ProfileProvider = ({ children }) => {
//   const [currentUser, setCurrentUser] = useState(null);
//   const [token, setToken] = useState(localStorage.getItem('jwtToken'));
//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError] = useState(null);

//   const clearError = useCallback(() => {
//     setError(null);
//   }, []);

//   const login = useCallback(async (credentials) => {
//     setIsLoading(true);
//     setError(null);
//     try {
//       const { email, password } = credentials;
//       const res = await axios.post(`${API_BASE_URL}/profile/login`, { email, password });
//       const { token, user } = res.data;
//       localStorage.setItem('jwtToken', token);
//       setToken(token);
//       setCurrentUser(user);
//       return { success: true, user };
//     } catch (err) {
//       const errorMessage = err.response?.data?.message || 'Login failed. Please try again.';
//       setError(errorMessage);
//       return { success: false, error: errorMessage };
//     } finally {
//       setIsLoading(false);
//     }
//   }, []);

//   const register = useCallback(async (userData) => {
//     setIsLoading(true);
//     setError(null);
//     try {
//       const res = await axios.post(`${API_BASE_URL}/profile/register`, userData);
//       const { token, user } = res.data;
//       localStorage.setItem('jwtToken', token);
//       setToken(token);
//       setCurrentUser(user);
//       return { success: true, message: res.data.message, user };
//     } catch (err) {
//       const errorMessage = err.response?.data?.message || 'Registration failed. Please try again.';
//       setError(errorMessage);
//       return { success: false, error: errorMessage };
//     } finally {
//       setIsLoading(false);
//     }
//   }, []);

//   const logout = useCallback(() => {
//     localStorage.removeItem('jwtToken');
//     setToken(null);
//     setCurrentUser(null);
//     setError(null);
//     console.log("User logged out.");
//   }, []);

//   // --- checkAuthStatus function ---
//   const checkAuthStatus = useCallback(async () => {
//     setIsLoading(true);
//     setError(null);

//     if (!token) {
//       setCurrentUser(null);
//       setIsLoading(false);
//       return;
//     }

//     try {
//       axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
//       const res = await axios.get(`${API_BASE_URL}/profile/me`);
//       setCurrentUser(res.data.user);
//     } catch (err) {
//       console.error("Authentication check failed on refresh:", err);
//       // If token is invalid or expired, log out the user
//       logout();
//     } finally {
//       setIsLoading(false); // Always set isLoading to false when the check completes
//     }
//   }, [token, logout]);

//   // Set default Authorization header for Axios and initiate auth check
//   useEffect(() => {
//     if (token) {
//       axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
//       checkAuthStatus();
//     } else {
//       delete axios.defaults.headers.common['Authorization'];
//       setIsLoading(false);
//     }
//   }, [token, checkAuthStatus]);

//   const forgotPassword = useCallback(async (email) => {
//     setIsLoading(true);
//     setError(null);
//     try {
//       const res = await axios.post(`${API_BASE_URL}/profile/forgot-password`, { email });
//       return { success: true, message: res.data.message };
//     } catch (err) {
//       const errorMessage = err.response?.data?.message || 'Failed to send reset email. Please try again.';
//       setError(errorMessage);
//       return { success: false, error: errorMessage };
//     } finally {
//       setIsLoading(false);
//     }
//   }, []);

//   const updateProfile = useCallback(async (userId, updates) => {
//     setIsLoading(true);
//     setError(null);
//     try {
//       const res = await axios.put(`${API_BASE_URL}/edit/${userId}`, updates);
//       setCurrentUser(res.data);
//       return { success: true, message: 'Profile updated successfully!' };
//     } catch (err) {
//       const errorMessage = err.response?.data?.message || 'Failed to update profile. Please try again.';
//       setError(errorMessage);
//       return { success: false, error: errorMessage };
//     } finally {
//       setIsLoading(false);
//     }
//   }, []);

//   const fetchUsers = useCallback(async () => {
//     setIsLoading(true);
//     setError(null);
//     try {
//       const res = await axios.get(`${API_BASE_URL}/all`);
//       return { success: true, users: res.data };
//     } catch (err) {
//       const errorMessage = err.response?.data?.message || 'Failed to fetch users.';
//       setError(errorMessage);
//       return { success: false, error: errorMessage, users: [] };
//     } finally {
//       setIsLoading(false);
//     }
//   }, []);

//   const deleteUser = useCallback(async (userIdToDelete) => {
//     setIsLoading(true);
//     setError(null);
//     try {
//       const res = await axios.delete(`${API_BASE_URL}/delete/${userIdToDelete}`);
//       return { success: true, message: res.data.message };
//     } catch (err) {
//       const errorMessage = err.response?.data?.message || 'Failed to delete user.';
//       setError(errorMessage);
//       return { success: false, error: errorMessage };
//     } finally {
//       setIsLoading(false);
//     }
//   }, []);

//   const disableUser = useCallback(async (userIdToDisable) => {
//     setIsLoading(true);
//     setError(null);
//     try {
//       const res = await axios.put(`${API_BASE_URL}/disable/${userIdToDisable}`);
//       return { success: true, message: res.data.message };
//     } catch (err) {
//       const errorMessage = err.response?.data?.message || 'Failed to disable user.';
//       setError(errorMessage);
//       return { success: false, error: errorMessage };
//     } finally {
//       setIsLoading(false);
//     }
//   }, []);

//   const suspendUser = useCallback(async (userIdToSuspend) => {
//     setIsLoading(true);
//     setError(null);
//     try {
//       const res = await axios.put(`${API_BASE_URL}/suspend/${userIdToSuspend}`);
//       return { success: true, message: res.data.message };
//     } catch (err) {
//       const errorMessage = err.response?.data?.message || 'Failed to suspend user.';
//       setError(errorMessage);
//       return { success: false, error: errorMessage };
//     } finally {
//       setIsLoading(false);
//     }
//   }, []);

//   // --- NEW: Derived role flags ---
//   const isMember = currentUser?.role === 'member';
//   const isAdmin = currentUser?.role === 'admin';
//   const isPastor = currentUser?.role === 'pastor';

//   const value = {
//     currentUser,
//     token,
//     isAuthenticated: !!currentUser,
//     isLoading,
//     error,
//     login,
//     register,
//     logout,
//     forgotPassword,
//     updateProfile,
//     fetchUsers,
//     deleteUser,
//     disableUser,
//     suspendUser,
//     clearError,
//     isMember,
//     isAdmin,
//     isPastor,
//   };

//   return (
//     <ProfileContext.Provider value={value}>
//       {children}
//     </ProfileContext.Provider>
//   );
// };

import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { ProfileContext } from './ProfileContext';
import { API_BASE_URL } from '../../config/Api';


export const ProfileProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  // Change 'jwtToken' to 'token' here
  const [token, setToken] = useState(localStorage.getItem('token')); 
  const [isLoading, setIsLoading] = useState(true); 
  const [error, setError] = useState(null);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  const login = useCallback(async (credentials) => {
    setIsLoading(true);
    setError(null);
    try {
      const { email, password } = credentials;
      const res = await axios.post(`${API_BASE_URL}/profile/login`, { email, password });
      const { token, user } = res.data;
      // Change 'jwtToken' to 'token' here
      localStorage.setItem('token', token); 
      setToken(token);
      setCurrentUser(user);
      return { success: true, user };
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Login failed. Please try again.';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setIsLoading(false);
    }
  }, []);

  const register = useCallback(async (userData) => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await axios.post(`${API_BASE_URL}/profile/register`, userData);
      const { token, user } = res.data;
      // Change 'jwtToken' to 'token' here
      localStorage.setItem('token', token); 
      setToken(token);
      setCurrentUser(user);
      return { success: true, message: res.data.message, user };
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Registration failed. Please try again.';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setIsLoading(false);
    }
  }, []);

  const logout = useCallback(() => {
    // Change 'jwtToken' to 'token' here
    localStorage.removeItem('token'); 
    setToken(null);
    setCurrentUser(null);
    setError(null);
    console.log("User logged out.");
  }, []);

  // --- checkAuthStatus function ---
  const checkAuthStatus = useCallback(async () => {
    setIsLoading(true); 
    setError(null);

    if (!token) {
      setCurrentUser(null);
      setIsLoading(false); 
      return;
    }

    try {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      const res = await axios.get(`${API_BASE_URL}/profile/me`);
      setCurrentUser(res.data.user);
    } catch (err) {
      console.error("Authentication check failed on refresh:", err);
      // If token is invalid or expired, log out the user
      logout();
    } finally {
      setIsLoading(false); // Always set isLoading to false when the check completes
    }
  }, [token, logout]);

  // Set default Authorization header for Axios and initiate auth check
  useEffect(() => {
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      checkAuthStatus();
    } else {
      delete axios.defaults.headers.common['Authorization'];
      setIsLoading(false); 
    }
  }, [token, checkAuthStatus]); 

  const forgotPassword = useCallback(async (email) => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await axios.post(`${API_BASE_URL}/profile/forgot-password`, { email });
      return { success: true, message: res.data.message };
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Failed to send reset email. Please try again.';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setIsLoading(false);
    }
  }, []);

  const updateProfile = useCallback(async (userId, updates) => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await axios.put(`${API_BASE_URL}/edit/${userId}`, updates);
      setCurrentUser(res.data);
      return { success: true, message: 'Profile updated successfully!' };
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Failed to update profile. Please try again.';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setIsLoading(false);
    }
  }, []);

  const fetchUsers = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await axios.get(`${API_BASE_URL}/all`);
      return { success: true, users: res.data };
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Failed to fetch users.';
      setError(errorMessage);
      return { success: false, error: errorMessage, users: [] };
    } finally {
      setIsLoading(false);
    }
  }, []);

  const deleteUser = useCallback(async (userIdToDelete) => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await axios.delete(`${API_BASE_URL}/delete/${userIdToDelete}`);
      return { success: true, message: res.data.message };
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Failed to delete user.';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setIsLoading(false);
    }
  }, []);

  const disableUser = useCallback(async (userIdToDisable) => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await axios.put(`${API_BASE_URL}/disable/${userIdToDisable}`);
      return { success: true, message: res.data.message };
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Failed to disable user.';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setIsLoading(false);
    }
  }, []);

  const suspendUser = useCallback(async (userIdToSuspend) => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await axios.put(`${API_BASE_URL}/suspend/${userIdToSuspend}`);
      return { success: true, message: res.data.message };
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Failed to suspend user.';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setIsLoading(false);
    }
  }, []);

  // --- NEW: Derived role flags ---
  const isMember = currentUser?.role === 'member';
  const isAdmin = currentUser?.role === 'admin';
  const isPastor = currentUser?.role === 'pastor';

  const value = {
    currentUser,
    token,
    isAuthenticated: !!currentUser,
    isLoading,
    error,
    login,
    register,
    logout,
    forgotPassword,
    updateProfile,
    fetchUsers,
    deleteUser,
    disableUser,
    suspendUser,
    clearError,
    isMember,
    isAdmin,
    isPastor,
  };

  return (
    <ProfileContext.Provider value={value}>
      {children}
    </ProfileContext.Provider>
  );
};
