import React from 'react';
import { formatCurrency, formatPercentage } from '../utils/formatters';

const CoinCard = ({ coin }) => {
    const {
        name,
        symbol,
        current_price,
        price_change_percentage_24h,
        image,
        market_cap_rank,
    } = coin;

    const priceChangeClass =
        price_change_percentage_24h > 0
            ? 'text-green-400'
            : price_change_percentage_24h < 0
                ? 'text-red-400'
                : 'text-gray-300';

    return (
        <div className="bg-gray-800 dark:bg-gray-100 dark:text-gray-800 rounded-xl shadow-lg p-4 hover:scale-105 transform transition-all duration-300">
            <div className="flex items-center space-x-4">
                <img src={image} alt={name} className="w-10 h-10" />
                <div>
                    <h2 className="text-white dark:text-gray-800 text-lg font-semibold">{name}</h2>
                    <p className="text-gray-400 dark:text-gray-800 text-sm uppercase">{symbol}</p>
                </div>
                <div className="ml-auto text-xs text-gray-400 dark:text-gray-800 bg-gray-700 dark:bg-gray-300 px-2 py-1 rounded">
                    #{market_cap_rank}
                </div>
            </div>

            <div className="mt-4">
                <p className="text-white dark:text-gray-800 text-xl font-bold">
                    {formatCurrency(current_price)}
                </p>
                <p className={`text-sm font-medium mt-1 ${priceChangeClass}`}>
                    {formatPercentage(price_change_percentage_24h)}
                </p>
            </div>
        </div>
    );
};

export default CoinCard;
