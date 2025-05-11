import { configureStore } from '@reduxjs/toolkit';
import currentQueryReducer from '../features/currentQuerySlice';
import searchQueryReducer from '../features/searchQuerySlice';
import { kinopoiskApi } from '../services/kinopoiskApi';
import { likesApi } from '../services/likesApi';

export const store = configureStore({
  reducer: {
    [kinopoiskApi.reducerPath]: kinopoiskApi.reducer,
    [likesApi.reducerPath]: likesApi.reducer,
    currentQuery: currentQueryReducer,
    searchQuery: searchQueryReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(kinopoiskApi.middleware)
      .concat(likesApi.middleware),
});