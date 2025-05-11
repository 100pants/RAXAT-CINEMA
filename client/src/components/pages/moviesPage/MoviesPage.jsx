import React from 'react'
import useMoviesQuery from '../../../hooks/useMoviesQuery'
import BearCarousel, { BearSlideImage } from 'bear-react-carousel'
import { Link, Stack } from '@mui/material'
import { Link as RouterLink} from 'react-router-dom'
import ErrorMessage from '../../ui/errorMessage/ErrorMessage'
import MoviesSkeleton from '../../ui/moviesListTopSkeleton/MoviesListMainSkeleton'
import MoviesPageSkeleton from '../../ui/moviesPageSkeleton/MoviesPageSkeleton'

const MoviesPage = () => {
  const {
    isLoading,
    hasError,
    responsePopular,
    responseBest,
    responseFilms,
    responseSerials,
    responseCartoons
  } = useMoviesQuery()

  if (isLoading) return <MoviesPageSkeleton />

  if (hasError) return <ErrorMessage />

  const serializeDataForSlider = data => 
     data.map(row => (
     <RouterLink  key={row.id} to={`/movie/${row.kinopoiskId}`}>
      <BearSlideImage imageUrl={row.posterUrlPreview}/>
     </RouterLink>
      
    ))
  

  const sliderArr = [
    {
      title: 'Популярные фильмы',
      url: '/popular',
      data: serializeDataForSlider(responsePopular.data.items)
    },
    {
      title: 'Лучшие фильмы',
      url: '/best',
      data: serializeDataForSlider(responseBest.data.items)
    },
    {
      title: 'Фильмы',
      url: '/films',
      data: serializeDataForSlider(responseFilms.data.items)
    },
    {
      title: 'Сериалы',
      url: '/serials',
      data: serializeDataForSlider(responseSerials.data.items)
    },
    {
      title: 'Мультфильмы',
      url: '/cartoons',
      data: serializeDataForSlider(responseCartoons.data.items)
    },
  ]

  return (
    <div>
      {sliderArr.map((slider) => (
        <Stack key={slider.url}>
        <Link sx={{mt: 2, mb: 2}} variant='h4' component={RouterLink} to={slider.url}>{slider.title}</Link>
        <BearCarousel 
          data={slider.data} 
          slidesPerView={1}
          slidesPerGroup={3}
          isEnableNavButton
          isEnableLoop
          autoPlayTime={5000}
          isEnableAutoPlay
          spaceBetween={16}
          breakpoints={{
            375: {
              isEnableAutoPlay: 0,
            },
    768: {
      slidesPerView: 5,
      spaceBetween: 20 
    }
  }}
/>
      </Stack>
      
      ))}
      
    </div>
  )
}

export default MoviesPage