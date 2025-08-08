import React, { createContext, useContext, useState, useEffect } from 'react';
import authService from '../services/authService';

const AdminAuthContext = createContext();

export const useAdminAuth = () => {
  const context = useContext(AdminAuthContext);
  if (!context) {
    throw new Error('useAdminAuth must be used within an AdminAuthProvider');
  }
  return context;
};

export const AdminAuthProvider = ({ children }) => {
  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Initialize admin auth state
  useEffect(() => {
    const initializeAdminAuth = async () => {
      try {
        if (authService.isAuthenticated()) {
          const currentUser = await authService.getCurrentUser();
          if (currentUser && currentUser.role === 'admin') {
            setAdmin(currentUser);
          }
        }
      } catch (error) {
        console.error('Admin auth initialization error:', error);
        authService.clearAuth();
      } finally {
        setLoading(false);
      }
    };

    initializeAdminAuth();
  }, []);

  // Admin login function
  const adminLogin = async (credentials) => {
    try {
      setError(null);
      const data = await authService.adminLogin(credentials);
      console.log('Admin login response:', data);
      setAdmin(data.data.admin);
      return data;
    } catch (error) {
      setError(error.message);
      throw error;
    }
  };

  // Admin register function
  const adminRegister = async (adminData) => {
    try {
      setError(null);
      const data = await authService.registerAdmin(adminData);
      if (data.success) {
        return data;
      }
      throw new Error(data.message);
    } catch (error) {
      setError(error.message);
      throw error;
    }
  };

  // Admin logout function
  const adminLogout = async () => {
    try {
      await authService.logout();
      setAdmin(null);
      setError(null);
    } catch (error) {
      console.error('Admin logout error:', error);
    }
  };

  // Clear error
  const clearError = () => {
    setError(null);
  };

  const value = {
    admin,
    loading,
    error,
    isAdminAuthenticated: !!admin,
    adminLogin,
    adminRegister,
    adminLogout,
    clearError
  };

  return (
    <AdminAuthContext.Provider value={value}>
      {children}
    </AdminAuthContext.Provider>
  );
};
