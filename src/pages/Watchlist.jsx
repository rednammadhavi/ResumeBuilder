import React, { useEffect, useState } from 'react';
import CoinCard from '../components/CoinCard';
import { getMarketData } from '../services/coingecko';
import { FaRegStar } from 'react-icons/fa';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';

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
            setLoading(true);
            if (watchlist.length === 0) {
                setCoins([]);
                setLoading(false);
                return;
            }
            try {
                const data = await getMarketData();
                const filtered = data.filter((coin) => watchlist.includes(coin.id));
                setCoins(filtered);
            } catch (error) {
                console.error("Failed to fetch market data", error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [watchlist]);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <AiOutlineLoading3Quarters className="animate-spin text-3xl text-blue-500 dark:text-blue-300" />
                <span className="ml-2 text-lg text-gray-600 dark:text-gray-300">Loading watchlist...</span>
            </div>
        );
    }

    return (
        <div className="p-4 min-h-[70vh]">
            <h1 className="text-3xl font-semibold mb-6 text-gray-800 dark:text-gray-100">⭐ Your Watchlist</h1>

            {coins.length === 0 ? (
                <div className="text-center mt-20 text-gray-500 dark:text-gray-400">
                    <FaRegStar className="text-5xl mx-auto mb-4 text-yellow-400 dark:text-yellow-300" />
                    <p className="text-lg font-medium">Your watchlist is empty.</p>
                    <p className="text-sm mt-2">Add coins to track them here!</p>
                </div>
            ) : (
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {coins.map((coin) => (
                        <CoinCard key={coin.id} coin={coin} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default Watchlist;
