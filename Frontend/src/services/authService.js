const API_BASE_URL = 'http://localhost:5000/api';

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
      const response = await fetch(`${API_BASE_URL}/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Registration failed');
      }

      this.setAuth(data.token, data.user);
      return data;
    } catch (error) {
      throw error;
    }
  }

  // Login user
  async login(credentials) {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(credentials)
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Login failed');
      }

      this.setAuth(data.token, data.user);
      return data;
    } catch (error) {
      throw error;
    }
  }

  // Logout user
  async logout() {
    try {
      if (this.token) {
        await fetch(`${API_BASE_URL}/auth/logout`, {
          method: 'POST',
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

      const response = await fetch(`${API_BASE_URL}/auth/me`, {
        headers: this.getAuthHeaders()
      });

      if (!response.ok) {
        this.clearAuth();
        return null;
      }

      const data = await response.json();
      this.user = data.user;
      localStorage.setItem('user', JSON.stringify(data.user));
      return data.user;
    } catch (error) {
      console.error('Get current user error:', error);
      this.clearAuth();
      return null;
    }
  }

  // Update user profile
  async updateProfile(profileData) {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/update-profile`, {
        method: 'PUT',
        headers: this.getAuthHeaders(),
        body: JSON.stringify(profileData)
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Profile update failed');
      }

      this.user = data.user;
      localStorage.setItem('user', JSON.stringify(data.user));
      return data;
    } catch (error) {
      throw error;
    }
  }

  // Change password
  async changePassword(passwordData) {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/change-password`, {
        method: 'PUT',
        headers: this.getAuthHeaders(),
        body: JSON.stringify(passwordData)
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Password change failed');
      }

      return data;
    } catch (error) {
      throw error;
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
}

export default new AuthService();
