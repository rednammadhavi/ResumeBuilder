import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const ranges = {
    '1D': 1,
    '7D': 7,
    '30D': 30,
    '1Y': 365,
    'ALL': 'max',
};

const toggleWatchlist = () => {
    const stored = JSON.parse(localStorage.getItem('watchlist')) || [];
    const updated = stored.includes(coin.id)
        ? stored.filter((c) => c !== coin.id)
        : [...stored, coin.id];

    localStorage.setItem('watchlist', JSON.stringify(updated));
    alert(`${coin.name} has been ${stored.includes(coin.id) ? 'removed from' : 'added to'} your watchlist.`);
};


const CoinDetail = () => {
    const { id } = useParams();
    const [coin, setCoin] = useState(null);
    const [chartData, setChartData] = useState([]);
    const [days, setDays] = useState(7);
    const [loading, setLoading] = useState(true);

    const formatChartData = (data) => {
        return data.prices.map((item) => ({
            time: new Date(item[0]).toLocaleDateString(),
            price: item[1],
        }));
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [coinRes, chartRes] = await Promise.all([
                    axios.get(`https://api.coingecko.com/api/v3/coins/${id}`),
                    axios.get(`https://api.coingecko.com/api/v3/coins/${id}/market_chart`, {
                        params: {
                            vs_currency: 'usd',
                            days: days,
                        },
                    }),
                ]);

                setCoin(coinRes.data);
                setChartData(formatChartData(chartRes.data));
                setLoading(false);
            } catch (error) {
                console.error('Error fetching coin data:', error);
            }
        };

        fetchData();
    }, [id, days]);

    if (loading) return <div className="p-4">Loading...</div>;

    return (
        <div className="p-4">
            <div className="flex items-center gap-4 mb-4">
                <img src={coin.image.large} alt={coin.name} className="w-10 h-10" />
                <h1 className="text-2xl font-bold">{coin.name} ({coin.symbol.toUpperCase()})</h1>
            </div>

            <p className="mb-4 text-gray-600 dark:text-gray-300">
                Current Price: <strong>${coin.market_data.current_price.usd.toLocaleString()}</strong><br />
                Market Cap: ${coin.market_data.market_cap.usd.toLocaleString()}
            </p>

            <div className="mb-4">
                <div className="flex gap-2 mb-2">
                    {Object.entries(ranges).map(([label, value]) => (
                        <button
                            key={label}
                            onClick={() => setDays(value)}
                            className={`px-3 py-1 text-sm rounded ${days === value
                                ? 'bg-blue-500 text-white'
                                : 'bg-gray-200 dark:bg-gray-700 dark:text-white'
                                }`}
                        >
                            {label}
                        </button>
                    ))}
                </div>
                <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={chartData}>
                        <XAxis dataKey="time" />
                        <YAxis domain={['auto', 'auto']} />
                        <Tooltip />
                        <Line type="monotone" dataKey="price" stroke="#3b82f6" strokeWidth={2} dot={false} />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export { CoinDetail, toggleWatchlist };
