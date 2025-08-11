import axios from 'axios';
import authService from './authService';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api';

class ProductService {
  // Get auth headers for admin routes
  getAuthHeaders() {
    const token = authService.getToken();
    return {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    };
  }

  // Get all products with filtering and pagination
  async getProducts(params = {}) {
    try {
      const queryString = new URLSearchParams(params).toString();
      const url = queryString ? `${API_BASE_URL}/products?${queryString}` : `${API_BASE_URL}/products`;
      
      const response = await axios.get(url);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to fetch products');
    }
  }

  // Get single product by ID
  async getProduct(id) {
    try {
      const response = await axios.get(`${API_BASE_URL}/products/${id}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to fetch product');
    }
  }

  // Create new product (Admin only) - Use admin route
  async createProduct(productData) {
    try {
      if (!authService.isAuthenticated() || !authService.isAdmin()) {
        throw new Error('Admin authentication required');
      }

      console.log('Sending product data:', productData); // Debug log

      const response = await axios.post(`${API_BASE_URL}/admin/products`, productData, {
        headers: this.getAuthHeaders()
      });
      return response.data;
    } catch (error) {
      console.error('Create product error:', error.response?.data || error); // Enhanced error logging
      
      // Handle validation errors specifically
      if (error.response?.data?.errors) {
        const errorMessages = error.response.data.errors.map(err => err.message).join(', ');
        throw new Error(`Validation errors: ${errorMessages}`);
      }
      
      throw new Error(error.response?.data?.message || 'Failed to create product');
    }
  }

  // Update product (Admin only) - Use admin route
  async updateProduct(id, productData) {
    try {
      if (!authService.isAuthenticated() || !authService.isAdmin()) {
        throw new Error('Admin authentication required');
      }

      console.log('Updating product data:', productData); // Debug log

      const response = await axios.put(`${API_BASE_URL}/admin/products/${id}`, productData, {
        headers: this.getAuthHeaders()
      });
      return response.data;
    } catch (error) {
      console.error('Update product error:', error.response?.data || error); // Enhanced error logging
      
      // Handle validation errors specifically
      if (error.response?.data?.errors) {
        const errorMessages = error.response.data.errors.map(err => err.message).join(', ');
        throw new Error(`Validation errors: ${errorMessages}`);
      }
      
      throw new Error(error.response?.data?.message || 'Failed to update product');
    }
  }

  // Delete product (Admin only) - Use admin route
  async deleteProduct(id) {
    try {
      if (!authService.isAuthenticated() || !authService.isAdmin()) {
        throw new Error('Admin authentication required');
      }

      const response = await axios.delete(`${API_BASE_URL}/admin/products/${id}`, {
        headers: this.getAuthHeaders()
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to delete product');
    }
  }

  // Get featured products
  async getFeaturedProducts() {
    try {
      const response = await axios.get(`${API_BASE_URL}/products/featured`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to fetch featured products');
    }
  }

  // Get new arrival products
  async getNewArrivals() {
    try {
      const response = await axios.get(`${API_BASE_URL}/products/new-arrivals`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to fetch new arrivals');
    }
  }

  // Get best seller products
  async getBestSellers() {
    try {
      const response = await axios.get(`${API_BASE_URL}/products/best-sellers`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to fetch best sellers');
    }
  }

  // Toggle product feature status (Admin only)
  async toggleFeature(id) {
    try {
      if (!authService.isAuthenticated() || !authService.isAdmin()) {
        throw new Error('Admin authentication required');
      }

      const response = await axios.patch(`${API_BASE_URL}/products/${id}/feature`, {}, {
        headers: this.getAuthHeaders()
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to toggle feature status');
    }
  }

  // Search products
  async searchProducts(searchTerm, filters = {}) {
    try {
      const params = {
        search: searchTerm,
        ...filters
      };
      return await this.getProducts(params);
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to search products');
    }
  }

  // Get products by category
  async getProductsByCategory(categoryId, params = {}) {
    try {
      const queryParams = {
        category: categoryId,
        ...params
      };
      return await this.getProducts(queryParams);
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to fetch products by category');
    }
  }

  // Get products by brand
  async getProductsByBrand(brand, params = {}) {
    try {
      const queryParams = {
        brand: brand,
        ...params
      };
      return await this.getProducts(queryParams);
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to fetch products by brand');
    }
  }

  // Get products with price range
  async getProductsByPriceRange(minPrice, maxPrice, params = {}) {
    try {
      const queryParams = {
        minPrice: minPrice,
        maxPrice: maxPrice,
        ...params
      };
      return await this.getProducts(queryParams);
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to fetch products by price range');
    }
  }

  // Upload images using axios
  async uploadImages(imageFiles) {
    try {
      if (!authService.isAuthenticated() || !authService.isAdmin()) {
        throw new Error('Admin authentication required');
      }

      const formData = new FormData();
      imageFiles.forEach(file => {
        formData.append('images', file);
      });

      const response = await axios.post(`${API_BASE_URL}/admin/upload-images`, formData, {
        headers: {
          'Authorization': `Bearer ${authService.getToken()}`,
          'Content-Type': 'multipart/form-data'
        }
      });

      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to upload images');
    }
  }
}

export default new ProductService();
