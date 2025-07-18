import React from 'react';
import { Link } from 'react-router-dom';
import ThemeToggle from './ThemeToggle';

const Navbar = () => {
    return (
        <nav className="flex justify-between items-center p-4 shadow dark:shadow-gray-800">
            <Link to="/" className="text-xl font-bold">
                📈 CryptoTracker
            </Link>
            <div className="flex items-center gap-4">
                <Link to="/watchlist">Watchlist</Link>
                <Link to="/convert">Convert</Link>
                <ThemeToggle />
            </div>
        </nav>
    );
};

export default Navbar;
