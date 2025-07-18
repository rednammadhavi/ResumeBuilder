import React, { useEffect, useState } from 'react';
import { getMarketData } from '../services/coingecko';
import CoinCard from '../components/CoinCard';

const Dashboard = () => {
    const [coins, setCoins] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            const data = await getMarketData();
            setCoins(data);
            setLoading(false);
        };

        fetchData();
    }, []);

    const filteredCoins = coins.filter((coin) =>
        coin.name.toLowerCase().includes(search.toLowerCase()) ||
        coin.symbol.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4 text-center">📈 Live Crypto Market</h1>

            <div className="flex justify-center mb-6">
                <input
                    type="text"
                    placeholder="Search by name or symbol..."
                    className="w-full max-w-md px-4 py-2 rounded border dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
            </div>

            {loading ? (
                <div className="text-center text-gray-600 dark:text-gray-400">Loading coins...</div>
            ) : (
                <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {filteredCoins.length === 0 ? (
                        <p className="text-center text-gray-500 dark:text-gray-400 col-span-full">
                            No coins found.
                        </p>
                    ) : (
                        filteredCoins.map((coin) => (
                            <CoinCard key={coin.id} coin={coin} />
                        ))
                    )}
                </div>
            )}
        </div>
    );
};

export default Dashboard;
