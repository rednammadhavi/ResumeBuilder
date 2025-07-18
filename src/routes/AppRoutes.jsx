import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Dashboard from '../pages/Dashboard';
import { CoinDetail } from '../pages/CoinDetail';
import Watchlist from '../pages/Watchlist';
import Converter from '../pages/Converter';

const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/coin/:id" element={<CoinDetail />} />
            <Route path="/watchlist" element={<Watchlist />} />
            <Route path="/convert" element={<Converter />} />
        </Routes>
    );
};

export default AppRoutes;
