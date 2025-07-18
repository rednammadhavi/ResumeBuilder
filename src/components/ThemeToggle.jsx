import { useTheme } from '../context/ThemeContext'; // ✅ adjust path

const ThemeToggle = () => {
    const { darkMode, toggleTheme } = useTheme();

    return (
        <button onClick={toggleTheme}>
            {darkMode ? '🌙 Dark' : '☀️ Light'}
        </button>
    );
};

export default ThemeToggle;
