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
            ? 'text-green-500'
            : price_change_percentage_24h < 0
                ? 'text-red-500'
                : 'text-neutral-500';

    return (
        <div className="bg-white dark:bg-neutral-900 rounded-xl shadow-md p-4 hover:scale-105 transform transition-transform duration-300 border dark:border-neutral-800">
            <div className="flex items-center space-x-4">
                <img src={image} alt={name} className="w-10 h-10" />
                <div>
                    <h2 className="text-gray-800 dark:text-white text-lg font-semibold">{name}</h2>
                    <p className="text-sm uppercase text-gray-500 dark:text-gray-400">{symbol}</p>
                </div>
                <div className="ml-auto text-xs bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 px-2 py-1 rounded">
                    #{market_cap_rank}
                </div>
            </div>

            <div className="mt-4">
                <p className="text-xl font-bold text-gray-800 dark:text-white">
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
