import axios from 'axios';

const BASE_URL = 'https://api.coingecko.com/api/v3';

export const getMarketData = async (currency = 'usd', perPage = 100, page = 1) => {
  try {
    const response = await axios.get(`${BASE_URL}/coins/markets`, {
      params: {
        vs_currency: currency,
        order: 'market_cap_desc',
        per_page: perPage,
        page: page,
        sparkline: false,
        price_change_percentage: '24h',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching market data:', error);
    return [];
  }
};
