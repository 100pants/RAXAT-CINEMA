import React from 'react';
import { useGetFavoritesQuery } from '../../../services/favoritesApi';
import ErrorMessage from '../../ui/errorMessage/ErrorMessage';
import { Typography } from '@mui/material';
import { FavoriteFilms } from '../../ui/favoriteFilms/FavoriteFilms';

const FavoritePage = () => {
  const { data, error, isLoading } = useGetFavoritesQuery();

  if (error) return <ErrorMessage />;
  if (!data || !data.length) {
    return (
      <Typography variant="h6" textAlign="center" mt={4}>
        Нет избранных фильмов
      </Typography>
    );
  }

  const ids = data.map(f => f.kinopoiskId).join(',');

  return (
    <div>
      <Typography variant="h4" component="h1" textAlign="center" mt={2} mb={4}>
        Избранные фильмы
      </Typography>
      <FavoriteFilms ids={ids} />
    </div>
  );
};

export default FavoritePage;