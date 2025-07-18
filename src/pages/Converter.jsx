import React, { useEffect, useState } from 'react';
import axios from 'axios';

const currencies = ['btc', 'eth', 'usd', 'inr'];

const Converter = () => {
    const [rates, setRates] = useState({});
    const [amount, setAmount] = useState(1);
    const [from, setFrom] = useState('btc');
    const [to, setTo] = useState('usd');
    const [result, setResult] = useState(0);

    useEffect(() => {
        const fetchRates = async () => {
            const res = await axios.get('https://api.coingecko.com/api/v3/simple/price', {
                params: {
                    ids: currencies.join(','),
                    vs_currencies: currencies.join(','),
                },
            });
            setRates(res.data);
        };
        fetchRates();
    }, []);

    useEffect(() => {
        if (rates[from] && rates[from][to]) {
            setResult((amount * rates[from][to]).toFixed(6));
        }
    }, [amount, from, to, rates]);

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">🔁 Currency Converter</h1>
            <div className="grid md:grid-cols-3 gap-4">
                <input
                    type="number"
                    className="p-2 rounded border dark:bg-gray-800 dark:text-white"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                />
                <select value={from} onChange={(e) => setFrom(e.target.value)} className="p-2 rounded dark:bg-gray-800 dark:text-white">
                    {currencies.map((cur) => <option key={cur}>{cur}</option>)}
                </select>
                <select value={to} onChange={(e) => setTo(e.target.value)} className="p-2 rounded dark:bg-gray-800 dark:text-white">
                    {currencies.map((cur) => <option key={cur}>{cur}</option>)}
                </select>
            </div>
            <div className="mt-4">
                <p className="text-lg">
                    {amount} {from.toUpperCase()} = <strong>{result} {to.toUpperCase()}</strong>
                </p>
            </div>
            <button
                onClick={toggleWatchlist}
                className="mt-2 px-4 py-2 rounded bg-yellow-500 text-white"
            >
                {watchlist?.includes(coin.id) ? 'Remove from Watchlist' : 'Add to Watchlist'}
            </button>

        </div>
    );
};

export default Converter;
