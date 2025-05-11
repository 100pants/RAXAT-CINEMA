import React, { useEffect, useState } from 'react';
import { useGetFilmsQuery, useGetGenresAndCountriesQuery } from '../../../services/kinopoiskApi';
import { MOVIE_LISTS } from '../../../constants';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button, Stack, Typography } from '@mui/material';
import MoviesList from '../../ui/moviesList/MoviesList';
import { ArrowBack } from '@mui/icons-material';
import ErrorMessage from '../../ui/errorMessage/ErrorMessage';
import MoviesListTopSkeleton from '../../ui/moviesListTopSkeleton/MoviesListMainSkeleton';
import { useSelector, useDispatch } from 'react-redux';
import SelectMovies from '../../ui/selectMovies/SelectMovies';
import { selectQuery } from '../../../features/currentQuerySlice';

export default function MoviesListMain() {
  const location = useLocation();
  const dispatch = useDispatch();
  const currentQuery = useSelector((state) => state.currentQuery) || {};
  const { countries = '', order = 'NUM_VOTE', year = '', genreId = '' } = currentQuery;
  const [page, setPage] = useState(1);
  const navigate = useNavigate();

  const movieType = MOVIE_LISTS.find((el) => el.url === location.pathname);

  console.log('MoviesListMain: Current query:', currentQuery);

  const queryParams = {
    type: movieType?.value || 'FILM',
    countries,
    order,
    year,
    genreId: movieType?.url === '/cartoons' && !genreId ? '18' : genreId,
    page,
  };

  const {
    data: filmsData,
    error: filmsError,
    isLoading: filmsIsLoading,
    refetch,
  } = useGetFilmsQuery(queryParams, { skip: !movieType });

  const { data: filtersData, error: filtersError, isLoading: filtersIsLoading } = useGetGenresAndCountriesQuery();

  useEffect(() => {
    console.log('MoviesListMain: Filters changed, refetching:', queryParams);
    refetch();
    setPage(1);
  }, [countries, order, year, genreId, location.pathname, refetch]);

  if (filmsError || filtersError) {
    console.log('MoviesListMain: Error:', filmsError || filtersError);
    return <ErrorMessage />;
  }
  if (filmsIsLoading || filtersIsLoading) {
    console.log('MoviesListMain: Loading...');
    return <MoviesListTopSkeleton />;
  }
  if (!movieType) {
    console.log('MoviesListMain: Movie type not found');
    return <ErrorMessage message="Страница не найдена" />;
  }

  return (
    <>
      <Stack flexDirection="row" sx={{ mt: 2, mb: 2 }}>
        <Button startIcon={<ArrowBack />} onClick={() => navigate(-1)} />
        <Typography variant="h4">{movieType.title}</Typography>
      </Stack>
      <SelectMovies
        countriesList={filtersData?.countries || []}
        genresList={filtersData?.genres || []}
        countries={countries}
        order={order}
        year={year}
        genreId={genreId}
      />
      <MoviesList
        movies={filmsData?.items || []}
        totalPages={filmsData?.totalPages || 1}
        page={page}
        setPage={setPage}
      />
    </>
  );
}