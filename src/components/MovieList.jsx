import { useState, useEffect } from 'react';
import { movieService } from '../services/movieService';
import { wishlistService } from '../services/wishlistService';

const MovieList = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [wishlistStatus, setWishlistStatus] = useState({});

  // TODO: Replace with actual user ID from your auth system
  const userId = '1'; // Temporary user ID

  useEffect(() => {
    fetchMovies();
  }, []);

  useEffect(() => {
    // Check wishlist status for all movies
    const checkWishlistStatus = async () => {
      try {
        const statusPromises = movies.map(movie => 
          wishlistService.isInWishlist(userId, movie.id)
        );
        const statuses = await Promise.all(statusPromises);
        const newWishlistStatus = {};
        movies.forEach((movie, index) => {
          newWishlistStatus[movie.id] = statuses[index];
        });
        setWishlistStatus(newWishlistStatus);
      } catch (err) {
        console.error('Error checking wishlist status:', err);
      }
    };

    if (movies.length > 0) {
      checkWishlistStatus();
    }
  }, [movies]);

  const fetchMovies = async () => {
    try {
      setLoading(true);
      const data = await movieService.getAllMovies();
      setMovies(data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch movies');
      console.error('Error fetching movies:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleWishlist = async (movieId) => {
    try {
      if (wishlistStatus[movieId]) {
        await wishlistService.removeFromWishlist(userId, movieId);
      } else {
        await wishlistService.addToWishlist(userId, movieId);
      }
      // Toggle wishlist status
      setWishlistStatus(prev => ({
        ...prev,
        [movieId]: !prev[movieId]
      }));
    } catch (err) {
      setError('Failed to update wishlist');
      console.error('Error updating wishlist:', err);
    }
  };

  const handleDeleteMovie = async (id) => {
    try {
      await movieService.deleteMovie(id);
      // Remove the movie from the state
      setMovies(movies.filter(movie => movie.id !== id));
    } catch (err) {
      setError('Failed to delete movie');
      console.error('Error deleting movie:', err);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
      {movies.map((movie) => (
        <div key={movie.id} className="bg-white rounded-lg shadow-md p-4">
          <img 
            src={movie.poster} 
            alt={movie.title}
            className="w-full h-64 object-cover rounded-md"
          />
          <h2 className="text-xl font-bold mt-2">{movie.title}</h2>
          <p className="text-gray-600">{movie.description}</p>
          <div className="mt-4 flex justify-between items-center">
            <button
              className={`px-4 py-2 rounded ${
                wishlistStatus[movie.id]
                  ? 'bg-red-500 hover:bg-red-600'
                  : 'bg-blue-500 hover:bg-blue-600'
              } text-white`}
              onClick={() => handleWishlist(movie.id)}
            >
              {wishlistStatus[movie.id] ? 'Remove from Wishlist' : 'Add to Wishlist'}
            </button>
            <div className="flex space-x-2">
              <button
                className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                onClick={() => {/* Add view details functionality */}}
              >
                View Details
              </button>
            </div>
          </div>
          <div className="mt-4 flex justify-between">
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              onClick={() => {/* Add edit functionality */}}
            >
              Edit
            </button>
            <button
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
              onClick={() => handleDeleteMovie(movie.id)}
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MovieList; 