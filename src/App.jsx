import React from 'react';
import Navbar from './components/Navbar';
import AppRoutes from './routes/AppRoutes';

const App = () => {
  return (
    <div className="bg-white dark:bg-gray-900 min-h-screen text-gray-900 dark:text-white">
      <Navbar />
      <AppRoutes />
    </div>
  );
};

export default App;
