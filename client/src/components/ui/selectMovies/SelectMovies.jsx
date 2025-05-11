import { Box, Button, FormControl, InputLabel, MenuItem, Select, Stack } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import React from 'react';
import { useDispatch } from 'react-redux';
import { selectQuery, initialState, resetQuery } from '../../../features/currentQuerySlice';

export default function SelectMovies({
  countriesList = [],
  genresList = [],
  countries = '',
  order = 'NUM_VOTE',
  year = '',
  genreId = '',
}) {
  const dispatch = useDispatch();

  const ordersList = [
    { title: 'По рейтингу', value: 'RATING' },
    { title: 'По оценкам', value: 'NUM_VOTE' },
  ];

  const yearsList = new Array(60).fill(null).map((_, index) => ({
    title: new Date().getFullYear() - index,
    value: (new Date().getFullYear() - index).toString(),
  }));

  const handleChange = (name, value) => {
    console.log(`SelectMovies: Changing ${name} to ${value}`);
    dispatch(selectQuery({ [name]: value }));
  };

  return (
    <Stack mt={2} mb={2} sx={{ flexDirection: { sm: 'column', md: 'row' }, gap: 1 }}>
      <FormControl fullWidth size="small">
        <InputLabel>Сортировка</InputLabel>
        <Select
          value={order}
          label="Сортировка"
          onChange={(e) => handleChange('order', e.target.value)}
        >
          {ordersList.map((item) => (
            <MenuItem key={item.value} value={item.value}>
              {item.title}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl fullWidth size="small">
        <InputLabel>Страна</InputLabel>
        <Select
          value={countries}
          label="Страна"
          onChange={(e) => handleChange('countries', e.target.value)}
        >
          <MenuItem value="">Все страны</MenuItem>
          {countriesList.map((country) => (
            <MenuItem key={country.id} value={country.id}>
              {country.country}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl fullWidth size="small">
        <InputLabel>Жанр</InputLabel>
        <Select
          value={genreId}
          label="Жанр"
          onChange={(e) => handleChange('genreId', e.target.value)}
        >
          <MenuItem value="">Все жанры</MenuItem>
          {genresList.map((genre) => (
            <MenuItem key={genre.id} value={genre.id.toString()}>
              {genre.genre}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl fullWidth size="small">
        <InputLabel>Год</InputLabel>
        <Select
          value={year}
          label="Год"
          onChange={(e) => handleChange('year', e.target.value)}
        >
          <MenuItem value="">Все годы</MenuItem>
          {yearsList.map((item) => (
            <MenuItem key={item.value} value={item.value}>
              {item.title}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <Box>
        <Button variant="outlined" startIcon={<CloseIcon />} onClick={() => dispatch(resetQuery())}>
          Сбросить
        </Button>
      </Box>
    </Stack>
  );
}