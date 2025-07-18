import { useTheme } from '../context/ThemeContext';
import { FaMoon, FaSun } from 'react-icons/fa';

const ThemeToggle = () => {
    const { darkMode, toggleTheme } = useTheme();

    return (
        <button
            onClick={toggleTheme}
            className="p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700 transition"
            title="Toggle Theme"
        >
            {darkMode ? <FaMoon className="text-gray-100" /> : <FaSun className="text-yellow-500" />}
        </button>
    );
};

export default ThemeToggle;
