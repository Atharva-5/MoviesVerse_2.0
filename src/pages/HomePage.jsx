import { useState, useEffect } from 'react';
import '../App.css'
import Search from '../components/Search'
import Spinner from '../components/Spinner'
import MovieCard from '../components/MovieCard';
import { movieService } from '../services/movieService';

const API_BASE_URL = 'https://api.themoviedb.org/3';

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

const API_OPTIONS = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: `Bearer ${API_KEY}`
    }
};

function HomePage() {
    // States
    const [searchTerm, setSearchTerm] = useState('');
    const [debouncedTerm, setDebouncedTerm] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [movieList, setMovieList] = useState([]);
    const [isLoading, setisLoading] = useState(false);
    const [selectedMovie, setSelectedMovie] = useState();
    const [recommendations, setRecommendations] = useState([]);

    // Back Button Handler
    const handleBack = () => setSelectedMovie(null);

    // Fetch Recommendations
    const fetchRecommendations = async (movieId) => {
        try {
            const response = await fetch(
                `${API_BASE_URL}/movie/${movieId}/recommendations?language=en-US&page=1`,
                API_OPTIONS
            );
            if (!response.ok) throw new Error("Failed to fetch recommendations");
            const data = await response.json();
            setRecommendations(data.results.slice(0, 4));
        } catch (error) {
            console.error(error);
            setRecommendations([]);
        }
    };

    // Fetch Movies
    const fetchMovies = async (query = '') => {
        setisLoading(true);
        setErrorMessage('');

        try {
            const endpoint = query
                ? `${API_BASE_URL}/search/movie?query=${encodeURIComponent(query)}`
                : `${API_BASE_URL}/discover/movie?sort_by=popularity.desc`;

            const response = await fetch(endpoint, API_OPTIONS);

            if (!response.ok) throw new Error("Failed in fetching");

            const data = await response.json();

            if (data.Response === 'False') {
                setErrorMessage(data.error || 'Failed to fetch movies');
                setMovieList([]);
            } else {
                setMovieList(data.results || []);
            }
        } catch (error) {
            console.error(`Error in fetching movies: ${error}`);
            setErrorMessage('Error in fetching movies');
        } finally {
            setisLoading(false);
        }
    };

    // Debounce logic
    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedTerm(searchTerm);
        }, 800); // Delay after user stops typing

        return () => clearTimeout(timer);
    }, [searchTerm]);

    // API call only when debouncedTerm changes
    useEffect(() => {
        if (debouncedTerm.length >= 3) {
            fetchMovies(debouncedTerm);
        } else if (debouncedTerm.length === 0) {
            fetchMovies(); // show popular movies when input is cleared
        }
    }, [debouncedTerm]);

    // Fetch recommendations when movie is selected
    useEffect(() => {
        if (selectedMovie?.id) {
            fetchRecommendations(selectedMovie.id);
        } else {
            setRecommendations([]);
        }
    }, [selectedMovie]);


    return (
        <main>
            <div className="pattern" />
            <div className="wrapper">
                <header>
                    <h1 className="italic mb-4 text-blue-50">
                        Movies<span className="text-gradient">Verse</span>
                    </h1>

                    {/* Movie Banner */}
                    <div className="h-[400px] flex items-center justify-center">
                        {/* Card 1 (Left) */}
                        <div className="absolute -rotate-[15deg] left-1/4 z-0 transform scale-110">
                            <img src="./IronMan.jpeg" alt="Movie 1" className="rounded-xl shadow-lg w-[200px] h-auto border-3 border-blue-200" />
                        </div>

                        {/* Card 2 (Center) */}
                        <div className="z-10 transform scale-125">
                            <img src="./HP7.jpg" alt="Movie 2" className="rounded-xl shadow-2xl border-4 border-blue-200 w-[220px] h-auto" />
                        </div>

                        {/* Card 3 (Right) */}
                        <div className="absolute rotate-[15deg] right-1/4 z-0 transform scale-110">
                            <img src="./JohnWick4.jpg" alt="Movie 3" className="rounded-xl shadow-lg w-[200px] h-auto border-blue-200 border-3" />
                        </div>
                    </div>

                    {/* Search Section */}
                    <h1 className='mt-4'>
                        Find <span className="text-gradient">Movies</span> You'll Enjoy...
                    </h1>
                    <div className="flex justify-center mt-4">
                        <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
                    </div>
                </header>

                {/*Below section is of pop up */}
                {selectedMovie && (
                    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 px-4 animate-fadeIn">
                        <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl h-[660px] flex flex-col sm:flex-row overflow-hidden relative ring-1 ring-black/10">
                            {/* Close Button */}
                            <button
                                onClick={handleBack}
                                className="absolute top-3 right-3 text-gray-400 hover:text-black text-4xl font-bold z-10 transition duration-200 cursor-pointer"
                                aria-label="Close"
                            >
                                &times;
                            </button>

                            {/* Poster Section (Left) */}
                            <div className="sm:w-[45%] h-[280px] sm:h-full bg-black flex-shrink-0">
                                <img
                                    src={selectedMovie.poster_path
                                        ? `https://image.tmdb.org/t/p/w500/${selectedMovie.poster_path}`
                                        : '/no-movie.png'}
                                    alt={selectedMovie.title}
                                    className="w-full h-full object"
                                />
                            </div>

                            {/* Info Section (Right) */}
                            <div className="sm:w-[60%] p-6 sm:p-8 flex flex-col overflow-y-auto">
                                <div className="space-y-4">
                                    {/* Title */}
                                    <h2 className="text-2xl font-bold text-gray-900 tracking-tight line-clamp-2">
                                        {selectedMovie.title}
                                    </h2>

                                    {/* Meta Info */}
                                    <div className="text-sm space-x-3 flex flex-wrap items-center">
                                        <span className="px-2 py-1 bg-blue-200 rounded-full font-medium uppercase tracking-wide">
                                            💬 {selectedMovie.original_language}
                                        </span>
                                        <span className="px-2 py-1 bg-blue-200 rounded-full font-medium">
                                            📅 {selectedMovie.release_date?.split("-")[0]}
                                        </span>
                                        <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full font-semibold flex items-center gap-1">
                                            ⭐ {selectedMovie.vote_average?.toFixed(1) || "N/A"}
                                        </span>
                                    </div>
                                    <hr />
                                    {/* Overview Section */}
                                    <div>
                                        <h3 className="text-xl font-semibold text-gray-900 mb-3">Overview</h3>
                                        <p className="text-base text-gray-700 leading-relaxed line-clamp-6">
                                            {selectedMovie.overview || "No overview available."}
                                        </p>
                                    </div>
                                    <hr />
                                    {/* Recommendations Section */}
                                    {recommendations.length > 0 && (
                                        <div className="mt-6">
                                            <h3 className="text-xl font-semibold text-gray-900 mb-4">Recommended Movies</h3>
                                            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                                                {recommendations.map((rec) => (
                                                    <div
                                                        key={rec.id}
                                                        className="cursor-pointer bg-white rounded-lg shadow hover:shadow-md transition-shadow"
                                                        onClick={() => setSelectedMovie(rec)}
                                                    >
                                                        <img
                                                            src={rec.poster_path ? `https://image.tmdb.org/t/p/w200/${rec.poster_path}` : '/no-movie.png'}
                                                            alt={rec.title}
                                                            className="w-[200px] h-[180px] object-cover rounded-t-lg"
                                                        />
                                                        <div className="px-2 py-2">
                                                            <p className="text-sm font-medium text-gray-800 text-center line-clamp-2">
                                                                {rec.title}
                                                            </p>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}


                                    {/* Action Buttons */}
                                    <div className="flex gap-4 mt-4">
                                        {/* Watch Trailer Button */}
                                        <button
                                            onClick={() => console.log("Watch Trailer clicked")}
                                            className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-bold text-white bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg shadow hover:brightness-110 transition duration-300 cursor-pointer"
                                        >
                                            🎬 Watch Trailer
                                        </button>

                                        {/* Add to Watchlist Button */}
                                        <button
                                            onClick={async () => {
                                                try {
                                                    await movieService.addToWatchlist({
                                                        userId: '1', // TODO: Replace with actual user ID
                                                        movieId: selectedMovie.id,
                                                        movieData: {
                                                            id: selectedMovie.id,
                                                            title: selectedMovie.title,
                                                            overview: selectedMovie.overview,
                                                            poster_path: selectedMovie.poster_path,
                                                            release_date: selectedMovie.release_date,
                                                            vote_average: selectedMovie.vote_average,
                                                            original_language: selectedMovie.original_language
                                                        }
                                                    });
                                                    // Show success message or notification
                                                    alert('Added to watchlist successfully!');
                                                } catch (error) {
                                                    console.error('Error adding to watchlist:', error);
                                                    alert('Failed to add to watchlist');
                                                }
                                            }}
                                            className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-bold text-black bg-gradient-to-r from-yellow-100 to-yellow-300 rounded-lg shadow hover:brightness-110 transition duration-300 cursor-pointer"
                                        >
                                            ⭐ Add to Watchlist
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}


                <section className='all-movies'>
                    <h2 className='mt-[40px]'>Trending Movies</h2>

                    {isLoading ? (
                        <Spinner />
                    ) : errorMessage ? (
                        <p className='text-red-500'>{errorMessage}</p>
                    ) : (
                        <ul>
                            {movieList.map((movie) => (
                                <MovieCard key={movie.id} movie={movie} onClick={() => setSelectedMovie(movie)} />
                            ))}
                        </ul>
                    )
                    }
                </section>
            </div>
        </main>
    )
}

export default HomePage
