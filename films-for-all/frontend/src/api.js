import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

export const fetchMovies = () => axios.get(`${API_URL}/movies/`);

export const addMovie = (movie) => axios.post(`${API_URL}/movies/`, movie);

export const searchMovies = (query) => axios.get(`${API_URL}/movies/search/`, { params: { query } });

export const getRecommendations = () => axios.get(`${API_URL}/movies/recommendations/`);

export const getMLRecommendations = (title) => axios.get(`${API_URL}/movies/ml_recommendations/`, { params: { title } });
