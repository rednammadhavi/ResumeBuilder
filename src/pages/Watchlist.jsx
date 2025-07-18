import React, { useEffect, useState } from 'react';
import CoinCard from '../components/CoinCard';
import { getMarketData } from '../services/coingecko';

const Watchlist = () => {
    const [coins, setCoins] = useState([]);
    const [watchlist, setWatchlist] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const saved = JSON.parse(localStorage.getItem('watchlist')) || [];
        setWatchlist(saved);
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            if (watchlist.length === 0) {
                setCoins([]);
                setLoading(false);
                return;
            }
            const data = await getMarketData();
            const filtered = data.filter((coin) => watchlist.includes(coin.id));
            setCoins(filtered);
            setLoading(false);
        };
        fetchData();
    }, [watchlist]);

    if (loading) return <div className="p-4">Loading...</div>;

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">⭐ Your Watchlist</h1>
            {coins.length === 0 ? (
                <p className="text-gray-500 dark:text-gray-400">Your watchlist is empty.</p>
            ) : (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {coins.map((coin) => (
                        <CoinCard key={coin.id} coin={coin} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default Watchlist;
