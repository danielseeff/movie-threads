import axios from 'axios';
import { sql } from '@vercel/postgres';

const API_KEY = '9972c5440cf041882de4e13449359f59'
const TMDB_BASE_URL = 'https://api.themoviedb.org/3';

const fetchPopularMovies = async () => {
  try {
    const response = await axios.get(`${TMDB_BASE_URL}/discover/movie`, {
      params: {
        api_key: API_KEY,
        include_adult: false,
        include_video: false,
        language: 'en-US',
        page: 1,
        sort_by: 'popularity.desc',
      },
    });
    return response.data.results;
  } catch (error) {
    console.error('Error fetching popular movies', error);
    throw error;
  }
};

export { fetchPopularMovies };