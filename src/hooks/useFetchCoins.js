import { useEffect, useState } from 'react';
import { getMarketData } from '../services/coingecko';

const useFetchCoins = () => {
    const [coins, setCoins] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCoins = async () => {
            try {
                setLoading(true);
                const data = await getMarketData();
                setCoins(data);
            } catch (err) {
                console.error('Failed to fetch coins:', err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchCoins();
    }, []);

    return { coins, loading, error };
};

export default useFetchCoins;
