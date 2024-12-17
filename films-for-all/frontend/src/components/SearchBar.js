import React, { useState } from 'react';
import { searchMovies, getMLRecommendations } from '../api';
import MovieCard from './MovieCard';

const SearchBar = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [mlResults, setMLResults] = useState([]);

  const handleSearch = () => {
    searchMovies(query)
      .then((res) => setResults(res.data))
      .catch((err) => console.error(err));
  };

  const handleMLRecommendations = () => {
    getMLRecommendations(query)
      .then((res) => setMLResults(res.data))
      .catch((err) => console.error(err));
  };

  return (
    <div>
      <h2>Поиск Фильмов</h2>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Введите название, описание или актеров"
      />
      <button onClick={handleSearch}>Поиск</button>
      <button onClick={handleMLRecommendations}>Рекомендовать</button>
      <div>
        {results.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
      <h2>Рекомендации по ML</h2>
      <div>
        {mlResults.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
};

export default SearchBar;
