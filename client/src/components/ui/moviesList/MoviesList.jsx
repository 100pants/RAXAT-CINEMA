import { Pagination, Stack } from '@mui/material';
import React from 'react';
import MovieCard from '../movieCard/MovieCard';

const MoviesList = ({ movies, totalPages, page, setPage }) => {

  const displayedMovies = movies.slice(0, 18);

  const rows = [
    displayedMovies.slice(0, 6),
    displayedMovies.slice(6, 12),
    displayedMovies.slice(12, 18)
  ];

  return (
    <>
      <Stack gap={4} sx={{ padding: '16px' }}>
        {rows.map((row, rowIndex) => (
          <Stack 
            key={rowIndex} 
            direction="row" 
            gap={2} 
            justifyContent="space-between"
          >
            {row.map(movie => (
              <div key={movie.kinopoiskId} style={{ width: '16%' }}>
                <MovieCard movie={movie} />
              </div>
            ))}
          </Stack>
        ))}
      </Stack>

      <Pagination 
        count={totalPages}
        color='primary'
        variant='outlined' 
        shape='rounded'
        size='large' 
        page={page}
        onChange={(_, value) => setPage(value)}
      />
    </>
  );
};

export default MoviesList;