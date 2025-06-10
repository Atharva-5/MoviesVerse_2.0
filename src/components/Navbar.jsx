import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
    const location = useLocation();

    return (
        <nav className="bg-gray-900 text-white shadow-lg">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    <div className="flex items-center">
                        <Link to="/home" className="flex items-center">
                            <span className="text-[30px] font-bold">Movies<span className="text-gradient">Verse</span></span>
                        </Link>
                    </div>
                    <div className="flex items-center space-x-4">
                        <Link
                            to="/home"
                            className={`px-3 py-2 rounded-md text-sm font-medium ${location.pathname === '/home'
                                    ? 'bg-gray-700 text-white'
                                    : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                                }`}
                        >
                            Home
                        </Link>
                        <Link
                            to="/watchlist"
                            className={`px-3 py-2 rounded-md text-sm font-medium ${location.pathname === '/watchlist'
                                    ? 'bg-gray-700 text-white'
                                    : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                                }`}
                        >
                            Watchlist
                        </Link>
                        <button
                            onClick={() => {
                                // TODO: Implement logout functionality
                                localStorage.removeItem('token');
                                window.location.href = '/';
                            }}
                            className="px-3 py-2 rounded-md text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
                        >
                            Logout
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar; 