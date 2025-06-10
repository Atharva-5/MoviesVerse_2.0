/* eslint-disable no-useless-catch */
import api from './api';

export const wishlistService = {
  // Get user's wishlist
  getWishlist: async (userId) => {
    try {
      const response = await api.get(`/watchlist/user/${userId}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Add movie to wishlist
  addToWishlist: async (userId, movieId) => {
    try {
      const response = await api.post(`/${userId}/wishlist`, { movieId });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Remove movie from wishlist
  removeFromWishlist: async (userId, movieId) => {
    try {
      const response = await api.delete(`/${userId}/wishlist/${movieId}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Check if movie is in wishlist
  isInWishlist: async (userId, movieId) => {
    try {
      const response = await api.get(`/${userId}/wishlist/${movieId}`);
      return response.data.exists;
    } catch (error) {
      if (error.response && error.response.status === 404) {
        return false;
      }
      throw error;
    }
  }
}; 