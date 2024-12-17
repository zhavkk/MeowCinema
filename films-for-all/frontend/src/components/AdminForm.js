import React, { useState } from 'react';
import { addMovie } from '../api';

const AdminForm = () => {
  const [movie, setMovie] = useState({
    title: '',
    description: '',
    main_actors: '',
    genre: '',
    release_date: '',
    rating: 0,
  });

  const handleChange = (e) => {
    setMovie({ ...movie, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addMovie(movie)
      .then((res) => {
        alert('Фильм добавлен успешно!');
        setMovie({
          title: '',
          description: '',
          main_actors: '',
          genre: '',
          release_date: '',
          rating: 0,
        });
      })
      .catch((err) => console.error(err));
  };

  return (
    <div>
      <h2>Админка: Добавить Фильм</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          value={movie.title}
          onChange={handleChange}
          placeholder="Название"
          required
        />
        <br />
        <textarea
          name="description"
          value={movie.description}
          onChange={handleChange}
          placeholder="Описание"
        />
        <br />
        <input
          type="text"
          name="main_actors"
          value={movie.main_actors}
          onChange={handleChange}
          placeholder="Главные актеры (через запятую)"
        />
        <br />
        <input
          type="text"
          name="genre"
          value={movie.genre}
          onChange={handleChange}
          placeholder="Жанры (через запятую)"
        />
        <br />
        <input
          type="date"
          name="release_date"
          value={movie.release_date}
          onChange={handleChange}
        />
        <br />
        <input
          type="number"
          name="rating"
          value={movie.rating}
          onChange={handleChange}
          step="0.1"
          min="0"
          max="10"
          placeholder="Рейтинг"
        />
        <br />
        <button type="submit">Добавить Фильм</button>
      </form>
    </div>
  );
};

export default AdminForm;
