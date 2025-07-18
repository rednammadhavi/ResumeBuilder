import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaChartLine, FaBars, FaTimes } from 'react-icons/fa';
import ThemeToggle from './ThemeToggle';

const Navbar = () => {
    const [menuOpen, setMenuOpen] = useState(false);

    const toggleMenu = () => setMenuOpen(!menuOpen);

    return (
        <nav className="bg-white dark:bg-gray-900 shadow-md dark:shadow-gray-800 fixed top-0 left-0 w-full z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    <Link
                        to="/"
                        className="flex items-center text-xl font-bold text-blue-600 dark:text-blue-400"
                    >
                        <FaChartLine className="mr-2" />
                        CryptoTracker
                    </Link>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex items-center gap-6 text-sm md:text-base">
                        <Link
                            to="/watchlist"
                            className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                        >
                            Watchlist
                        </Link>
                        <Link
                            to="/convert"
                            className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                        >
                            Convert
                        </Link>
                        <ThemeToggle />
                    </div>

                    {/* Mobile Menu Toggle Button */}
                    <div className="md:hidden flex items-center">
                        <ThemeToggle />
                        <button onClick={toggleMenu} className="ml-4 focus:outline-none">
                            {menuOpen ? (
                                <FaTimes className="text-xl text-blue-600 dark:text-blue-400" />
                            ) : (
                                <FaBars className="text-xl text-blue-600 dark:text-blue-400" />
                            )}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Dropdown Menu */}
            {menuOpen && (
                <div className="md:hidden bg-white dark:bg-gray-900 px-4 pb-4 shadow-md dark:shadow-gray-800">
                    <Link
                        to="/watchlist"
                        className="block py-2 text-sm hover:text-blue-600 dark:hover:text-blue-400"
                        onClick={toggleMenu}
                    >
                        Watchlist
                    </Link>
                    <Link
                        to="/convert"
                        className="block py-2 text-sm hover:text-blue-600 dark:hover:text-blue-400"
                        onClick={toggleMenu}
                    >
                        Convert
                    </Link>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
