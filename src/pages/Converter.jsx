import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Select from 'react-select';

const Converter = () => {
    const [coins, setCoins] = useState([]);
    const [rates, setRates] = useState({});
    const [amount, setAmount] = useState(1);
    const [from, setFrom] = useState(null);
    const [to, setTo] = useState(null);
    const [result, setResult] = useState(0);
    const [isDark, setIsDark] = useState(false);

    useEffect(() => {
        // Detect theme
        const checkDark = () =>
            window.matchMedia('(prefers-color-scheme: dark)').matches ||
            document.documentElement.classList.contains('dark');
        setIsDark(checkDark());

        const observer = new MutationObserver(() => {
            setIsDark(document.documentElement.classList.contains('dark'));
        });
        observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });

        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        const fetchCoins = async () => {
            const res = await axios.get('https://api.coingecko.com/api/v3/coins/markets', {
                params: {
                    vs_currency: 'usd',
                    order: 'market_cap_desc',
                    per_page: 100,
                    page: 1,
                    sparkline: false
                }
            });

            setCoins(res.data);
            if (res.data.length >= 2) {
                setFrom(res.data[0]);
                setTo(res.data[1]);
            }

            const ids = res.data.map((coin) => coin.id).join(',');
            const rateRes = await axios.get('https://api.coingecko.com/api/v3/simple/price', {
                params: {
                    ids,
                    vs_currencies: ids
                }
            });

            setRates(rateRes.data);
        };

        fetchCoins();
    }, []);

    useEffect(() => {
        if (from && to && rates[from.id] && rates[from.id][to.id]) {
            setResult((amount * rates[from.id][to.id]).toFixed(6));
        }
    }, [amount, from, to, rates]);

    const coinOptions = coins.map((coin) => ({
        value: coin,
        label: (
            <div className="flex items-center gap-2">
                <img src={coin.image} alt={coin.name} className="w-5 h-5" />
                <span>{coin.symbol.toUpperCase()} - {coin.name}</span>
            </div>
        )
    }));

    const selectStyles = {
        control: (base) => ({
            ...base,
            backgroundColor: isDark ? '#1f2937' : '#fff', // gray-800 or white
            borderColor: isDark ? '#374151' : '#ccc', // gray-700 or gray-300
            color: isDark ? '#f9fafb' : '#111827',
        }),
        singleValue: (base) => ({
            ...base,
            color: isDark ? '#f9fafb' : '#111827',
        }),
        menu: (base) => ({
            ...base,
            backgroundColor: isDark ? '#1f2937' : '#fff',
            color: isDark ? '#f9fafb' : '#111827',
            zIndex: 100,
        }),
        option: (base, { isFocused }) => ({
            ...base,
            backgroundColor: isFocused ? (isDark ? '#374151' : '#e5e7eb') : 'transparent',
            color: isDark ? '#f9fafb' : '#111827',
            cursor: 'pointer',
        }),
    };

    return (
        <div className="p-6 max-w-2xl mx-auto bg-white dark:bg-gray-900 shadow-md dark:shadow-lg rounded-lg transition duration-300 mt-10">
            <h1 className="text-3xl font-bold mb-6 text-gray-800 dark:text-gray-100 text-center">
                🔁 Crypto Currency Converter
            </h1>

            <div className="grid gap-4 mb-4">
                <input
                    type="number"
                    className="p-3 border border-gray-300 dark:border-gray-700 rounded bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    min="0"
                />

                <Select
                    options={coinOptions}
                    onChange={(option) => setFrom(option.value)}
                    placeholder="From Currency"
                    className="react-select-container"
                    classNamePrefix="react-select"
                    value={from ? {
                        value: from,
                        label: (
                            <div className="flex items-center gap-2">
                                <img src={from.image} alt={from.name} className="w-5 h-5" />
                                <span>{from.symbol.toUpperCase()} - {from.name}</span>
                            </div>
                        )
                    } : null}
                    styles={selectStyles}
                />

                <Select
                    options={coinOptions}
                    onChange={(option) => setTo(option.value)}
                    placeholder="To Currency"
                    className="react-select-container"
                    classNamePrefix="react-select"
                    value={to ? {
                        value: to,
                        label: (
                            <div className="flex items-center gap-2">
                                <img src={to.image} alt={to.name} className="w-5 h-5" />
                                <span>{to.symbol.toUpperCase()} - {to.name}</span>
                            </div>
                        )
                    } : null}
                    styles={selectStyles}
                />
            </div>

            {from && to && (
                <p className="text-lg font-semibold text-center text-gray-700 dark:text-gray-200 mt-6">
                    {amount} {from.symbol.toUpperCase()} = <span className="text-blue-600 dark:text-blue-400">{result} {to.symbol.toUpperCase()}</span>
                </p>
            )}
        </div>
    );
};

export default Converter;
