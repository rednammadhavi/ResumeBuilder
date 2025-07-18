import { useTheme } from './context/ThemeContext';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import './index.css';

const App = () => {
  const { darkMode } = useTheme();

  return (
    <div className={darkMode ? 'dark' : ''}>
      <div className="min-h-screen bg-white dark:bg-gray-900 text-black dark:text-white transition-colors duration-300">
        <Navbar />
        <Dashboard />
      </div>
    </div>
  );
};

export default App;
