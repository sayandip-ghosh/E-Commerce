import React from 'react';
import { useAuth } from '../../context/AuthContext';
import Auth from './Auth';

const ProtectedRoute = ({ children, requireUser = false }) => {
  const { user, loading, isAdmin } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (!user) {
    return <Auth />;
  }

  // For user routes - prevent admin access
  if (requireUser && isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="max-w-md w-full text-center">
          <div className="rounded-md bg-yellow-50 p-4">
            <div className="flex">
              <div className="ml-3">
                <h3 className="text-sm font-medium text-yellow-800">
                  Access Restricted
                </h3>
                <div className="mt-2 text-sm text-yellow-700">
                  <p>This section is for regular users only. Please use the admin panel instead.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return children;
};

export default ProtectedRoute;
