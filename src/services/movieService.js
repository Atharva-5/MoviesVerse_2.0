/* eslint-disable no-useless-catch */
import api from './api';

export const movieService = {
  // Get user's watchlist
  getUserWatchlist: async (userId) => {
    try {
      const response = await api.get(`/watchlist/user/${userId}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Add movie to watchlist
  addToWatchlist: async (movieData) => {
    try {
      const response = await api.post('/watchlist/add', movieData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Remove movie from watchlist
  removeFromWatchlist: async (userId, movieId) => {
    try {
      const response = await api.delete(`/watchlist/user/${userId}/movie/${movieId}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Get all movies
  getAllMovies: async () => {
    try {
      const response = await api.get('/watchlist');
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Get movie by ID
  getMovieById: async (id) => {
    try {
      const response = await api.get(`/movies/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Create a new movie
  createMovie: async (movieData) => {
    try {
      const response = await api.post('/movies', movieData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Update a movie
  updateMovie: async (id, movieData) => {
    try {
      const response = await api.put(`/movies/${id}`, movieData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Delete a movie
  deleteMovie: async (id) => {
    // // eslint-disable-next-line no-useless-catch
    try {
      const response = await api.delete(`/movies/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
}; 