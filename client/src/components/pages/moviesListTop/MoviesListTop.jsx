import React, { useEffect, useState } from 'react'
import { useGetFilmsTopQuery } from '../../../services/kinopoiskApi'
import { TOP_LISTS } from '../../../constants'
import { useLocation, useNavigate } from 'react-router-dom'
import { Button, Stack, Typography } from '@mui/material'
import MoviesList from '../../ui/moviesList/MoviesList'
import { ArrowBack } from '@mui/icons-material'
import ErrorMessage from '../../ui/errorMessage/ErrorMessage'
import MoviesSkeleton from '../../ui/moviesListTopSkeleton/MoviesListMainSkeleton'
import MoviesListTopSkeleton from '../../ui/moviesListTopSkeleton/MoviesListMainSkeleton'

const MoviesListTop = () => {

    const location = useLocation()
    const [page, setPage] = useState(1)
    const navigate = useNavigate()

    const movieType = TOP_LISTS.find(el => el.url === location.pathname)

    const { data, error, isLoading } = useGetFilmsTopQuery({
        type: movieType.value,
         page,
        })

        useEffect(() => {
          setPage(1)
        }, [location])

        if (error) return <ErrorMessage />

        if (isLoading) return <MoviesListTopSkeleton />


  return (
    <>
    <Stack flexDirection="row">
        <Button startIcon={<ArrowBack />} onClick={() => navigate(-1)}>Назад</Button>
        <Typography ml={3} mt={2} variant='h4'>{movieType.title}</Typography>
    </Stack>
    <MoviesList
    movies={data.items}
    totalPages={data.totalPages}
    page={page} 
    setPage={setPage}
      />
    </>
  )
}

export default MoviesListTop
