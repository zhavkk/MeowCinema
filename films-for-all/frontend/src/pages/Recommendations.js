import React, { useEffect, useState } from 'react';
import { getRecommendations } from '../api';
import MovieCard from '../components/MovieCard';

const Recommendations = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    getRecommendations()
      .then((res) => setMovies(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div>
      <h2>Рекомендации для вас</h2>
      {movies.map((movie) => (
        <MovieCard key={movie.id} movie={movie} />
      ))}
    </div>
  );
};

export default Recommendations;
