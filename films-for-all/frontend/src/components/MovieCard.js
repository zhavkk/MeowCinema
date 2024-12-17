import React from 'react';

const MovieCard = ({ movie }) => {
  return (
    <div style={styles.card}>
      <h3>{movie.title}</h3>
      <p>{movie.description}</p>
      <p><strong>Актеры:</strong> {movie.main_actors}</p>
      <p><strong>Жанры:</strong> {movie.genre}</p>
      <p><strong>Рейтинг:</strong> {movie.rating}</p>
    </div>
  );
};

const styles = {
  card: {
    border: '1px solid #ddd',
    padding: '16px',
    margin: '16px 0',
    borderRadius: '8px',
  },
};

export default MovieCard;
