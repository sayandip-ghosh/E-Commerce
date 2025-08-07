import React, { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff } from 'lucide-react';
import authService from '../../services/authService';

const AdminLogin = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await authService.adminLogin(formData);
      if (response.user.role !== 'admin') {
        throw new Error('Unauthorized access');
      }
      
      const from = location.state?.from?.pathname || '/admin';
      navigate(from, { replace: true });
    } catch (error) {
      setError(error.message || 'Invalid admin credentials');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F5F7FF] px-4 py-12">
      <div className="w-full max-w-[420px] bg-white rounded-3xl p-8 shadow-sm">
        {/* Header Section */}
        <div className="text-center mb-8">
          <div className="mb-6">
            <img 
              src="/admin-login-illustration.svg" 
              alt="Admin Login" 
              className="w-48 h-48 mx-auto"
            />
          </div>
          <h1 className="text-2xl font-semibold text-gray-800 mb-2">
            Admin Log in
          </h1>
          <p className="text-gray-500 text-sm">
            Welcome back! Please enter your details
          </p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-6 bg-red-50 border border-red-100 text-red-600 px-4 py-3 rounded-lg text-sm">
            {error}
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Email Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Email
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Mail className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="block w-full pl-11 pr-4 py-3 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-100 focus:border-blue-400 transition-all"
                placeholder="Enter your email"
              />
            </div>
          </div>

          {/* Password Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Password
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Lock className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                className="block w-full pl-11 pr-12 py-3 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-100 focus:border-blue-400 transition-all"
                placeholder="Enter your password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-4 flex items-center"
              >
                {showPassword ? (
                  <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                ) : (
                  <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                )}
              </button>
            </div>
          </div>

          {/* Forgot Password Link */}
          <div className="flex justify-end">
            <Link
              to="/admin/forgot-password"
              className="text-sm text-blue-600 hover:text-blue-700 font-medium"
            >
              Forgot password?
            </Link>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 px-4 rounded-xl text-white font-medium transition-all
              ${loading 
                ? 'bg-blue-400 cursor-not-allowed' 
                : 'bg-blue-600 hover:bg-blue-700 active:transform active:scale-[0.99]'
              }`}
          >
            {loading ? 'Signing in...' : 'Sign in'}
          </button>

          {/* Register Link */}
          <div className="text-center mt-6">
            <p className="text-gray-600 text-sm">
              Don't have an admin account?{' '}
              <Link
                to="/admin/auth/register"
                className="text-blue-600 hover:text-blue-700 font-medium"
              >
                Sign up
              </Link>
            </p>
          </div>

          {/* Or Divider */}
          <div className="relative mt-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-white text-gray-500">or</span>
            </div>
          </div>

          {/* Social Login Buttons */}
          <div className="space-y-3">
            <button
              type="button"
              className="w-full flex items-center justify-center px-4 py-3 border border-gray-200 rounded-xl hover:bg-gray-50 transition-all"
            >
              <img src="/google-icon.svg" alt="Google" className="w-5 h-5 mr-3" />
              <span className="text-gray-700 font-medium">Continue with Google</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;