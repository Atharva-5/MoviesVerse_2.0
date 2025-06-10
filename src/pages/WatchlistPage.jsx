import { useState, useEffect } from 'react';
import { movieService } from '../services/movieService';
import MovieCard from '../components/MovieCard';
import Spinner from '../components/Spinner';

const WatchlistPage = () => {
    const [watchlist, setWatchlist] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedMovie, setSelectedMovie] = useState(null);

    // TODO: Replace with actual user ID from your auth system
    const userId = '1'; // Temporary user ID

    useEffect(() => {
        fetchWatchlist();
    }, []);

    const fetchWatchlist = async () => {
        try {
            setLoading(true);
            const data = await movieService.getUserWatchlist(userId);
            setWatchlist(data);
            setError(null);
        } catch (err) {
            setError('Failed to fetch watchlist');
            console.error('Error fetching watchlist:', err);
        } finally {
            setLoading(false);
        }
    };

    const handleRemoveFromWatchlist = async (movieId) => {
        try {
            await movieService.removeFromWatchlist(userId, movieId);
            // Remove the movie from the state
            setWatchlist(watchlist.filter(movie => movie.id !== movieId));
        } catch (err) {
            setError('Failed to remove movie from watchlist');
            console.error('Error removing movie from watchlist:', err);
        }
    };

    if (loading) return <div className="flex justify-center items-center min-h-screen"><Spinner /></div>;
    if (error) return <div className="text-red-500 text-center mt-4">{error}</div>;

    return (
        <main className="min-h-screen bg-gradient-to-bl from-black via-gray-900 to-[#1c1c1c] text-white p-8">
            <div className="max-w-7xl mx-auto">
                <h1 className="text-3xl font-bold mb-8">My Watchlist</h1>
                
                {watchlist.length === 0 ? (
                    <div className="text-center text-gray-400 mt-8">
                        <p className="text-xl">Your watchlist is empty</p>
                        <a href="/" className="text-blue-500 hover:text-blue-400 mt-4 inline-block">
                            Browse movies to add
                        </a>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {watchlist.map((movie) => (
                            <div key={movie.id} className="relative group">
                                <MovieCard movie={movie} onClick={() => setSelectedMovie(movie)} />
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handleRemoveFromWatchlist(movie.id);
                                    }}
                                    className="absolute top-2 right-2 bg-red-600 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                                    title="Remove from watchlist"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                                    </svg>
                                </button>
                            </div>
                        ))}
                    </div>
                )}

                {/* Movie Details Modal */}
                {selectedMovie && (
                    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 px-4">
                        <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl p-6 relative">
                            <button
                                onClick={() => setSelectedMovie(null)}
                                className="absolute top-3 right-3 text-gray-400 hover:text-black text-4xl font-bold"
                            >
                                &times;
                            </button>
                            <div className="flex flex-col md:flex-row gap-6">
                                <img
                                    src={selectedMovie.poster_path ? `https://image.tmdb.org/t/p/w500/${selectedMovie.poster_path}` : '/no-movie.png'}
                                    alt={selectedMovie.title}
                                    className="w-full md:w-1/3 rounded-lg"
                                />
                                <div className="flex-1">
                                    <h2 className="text-2xl font-bold text-gray-900 mb-4">{selectedMovie.title}</h2>
                                    <p className="text-gray-600 mb-4">{selectedMovie.overview}</p>
                                    <div className="flex gap-4">
                                        <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                                            {selectedMovie.release_date?.split('-')[0]}
                                        </span>
                                        <span className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm">
                                            ⭐ {selectedMovie.vote_average?.toFixed(1)}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </main>
    );
};

export default WatchlistPage; 