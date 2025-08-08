import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000/api';

class AuthService {
  constructor() {
    this.token = localStorage.getItem('token');
    this.user = JSON.parse(localStorage.getItem('user'));
  }

  // Set token and user data
  setAuth(token, user) {
    this.token = token;
    this.user = user;
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
  }

  // Clear auth data
  clearAuth() {
    this.token = null;
    this.user = null;
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }

  // Get auth headers
  getAuthHeaders() {
    return {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.token}`
    };
  }

  // Register user
  async register(userData) {
    try {
      const response = await axios.post(`${API_BASE_URL}/auth/register`, userData);
      this.setAuth(response.data.token, response.data.user);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Registration failed');
    }
  }

  // Login user
  async login(credentials) {
    try {
      const response = await axios.post(`${API_BASE_URL}/auth/login`, credentials);
      this.setAuth(response.data.token, response.data.user);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Login failed');
    }
  }

  // Logout user
  async logout() {
    try {
      if (this.token) {
        await axios.post(`${API_BASE_URL}/auth/logout`, {}, {
          headers: this.getAuthHeaders()
        });
      }
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      this.clearAuth();
    }
  }

  // Get current user
  async getCurrentUser() {
    try {
      if (!this.token) {
        return null;
      }

      const response = await axios.get(`${API_BASE_URL}/auth/me`, {
        headers: this.getAuthHeaders()
      });

      this.user = response.data.user;
      localStorage.setItem('user', JSON.stringify(response.data.user));
      return response.data.user;
    } catch (error) {
      console.error('Get current user error:', error);
      this.clearAuth();
      return null;
    }
  }

  // Update user profile
  async updateProfile(profileData) {
    try {
      const response = await axios.put(`${API_BASE_URL}/auth/update-profile`, profileData, {
        headers: this.getAuthHeaders()
      });

      this.user = response.data.user;
      localStorage.setItem('user', JSON.stringify(response.data.user));
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Profile update failed');
    }
  }

  // Change password
  async changePassword(passwordData) {
    try {
      const response = await axios.put(`${API_BASE_URL}/auth/change-password`, passwordData, {
        headers: this.getAuthHeaders()
      });

      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Password change failed');
    }
  }

  // Check if user is authenticated
  isAuthenticated() {
    return !!this.token;
  }

  // Check if user is admin
  isAdmin() {
    return this.user && this.user.role === 'admin';
  }

  // Get user data
  getUser() {
    return this.user;
  }

  // Get token
  getToken() {
    return this.token;
  }

  // Admin login
  async adminLogin(credentials) {
    try {
      const response = await axios.post(`${API_BASE_URL}/auth/admin/login`, credentials);
      this.setAuth(response.data.data.token, response.data.data.admin);
      console.log('Admin login response++++:', response);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Admin login failed');
    }
  }

  // Register new admin (requires admin privileges)
  async registerAdmin(adminData) {
    try {
      console.log('data=', adminData);
      const response = await axios.post(`${API_BASE_URL}/auth/admin/setup`, adminData, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      // Handle the response data structure from backend
      if (response.data.success) {
        return response.data;
      } else {
        throw new Error(response.data.message || 'Admin registration failed');
      }
    } catch (error) {
      console.error('Admin registration error:', error.response || error);
      throw new Error(error.response?.data?.message || 'Admin registration failed');
    }
  }
}

export default new AuthService();
