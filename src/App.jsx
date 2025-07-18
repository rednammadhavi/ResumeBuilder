import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import WatchlistPage from './pages/Watchlist';
import ConvertPage from './pages/Converter';

function App() {
  return (
    <Router>
      <ThemeProvider>
        <div className="min-h-screen bg-white dark:bg-gray-900 text-black dark:text-white transition-colors duration-300">
          <Navbar />
          <div className="pt-16 px-4">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/watchlist" element={<WatchlistPage />} />
              <Route path="/convert" element={<ConvertPage />} />
            </Routes>
          </div>
        </div>
      </ThemeProvider>
    </Router>
  );
}

export default App;
