import { Box, Link, Rating, Stack, Tooltip, Typography } from '@mui/material'
import React from 'react'
import { Link as RouterLink } from 'react-router-dom'
import styles from './MovieCard.module.scss'

const MovieCard = ({ movie }) => {
  return (
    <Stack className={styles.card}>
      <RouterLink to={`/movie/${movie.kinopoiskId}`}>
        <img 
          src={movie.posterUrlPreview} 
          alt={movie.nameRu || movie.nameEn} 
          className={styles.img}
        />
      </RouterLink>
      <Link 
        component={RouterLink}
        to={`/movie/${movie.kinopoiskId}`} 
        textAlign="center"
        sx={{ width: '200px', mt: 1 }}
      >
        {movie.nameRu || movie.nameEn || 'Название отсутствует'}
      </Link>

      {movie.ratingKinopoisk && (
        <Stack alignItems="center" sx={{ mt: 1 }}>
          <Tooltip title={`${movie.ratingKinopoisk} / 10`}>
            <Box>
              <Rating 
                name='read-only'
                value={movie.ratingKinopoisk / 2}
                readOnly
                precision={0.1}
              />
            </Box>
          </Tooltip>
        </Stack>
      )}
    </Stack>
  )
}

export default MovieCard