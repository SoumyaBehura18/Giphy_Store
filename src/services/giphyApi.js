import axios from 'axios';

const API_KEY = 'YOUR_GIPHY_API_KEY';
const BASE_URL = 'https://api.giphy.com/v1/gifs';

export const fetchTrendingGIFs = async (offset = 0) => {
  const response = await axios.get(`${BASE_URL}/trending`, {
    params: { api_key: API_KEY, limit: 20, offset },
  });
  return response.data.data;
};

export const fetchGIFsByKeyword = async (query, offset = 0) => {
  const response = await axios.get(`${BASE_URL}/search`, {
    params: { api_key: API_KEY, q: query, limit: 20, offset },
  });
  return response.data.data;
};
