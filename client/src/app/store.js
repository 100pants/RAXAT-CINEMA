import { configureStore } from '@reduxjs/toolkit';
import currentQueryReducer from '../features/currentQuerySlice';
import searchQueryReducer from '../features/searchQuerySlice';
import authReducer from '../features/authSlice';
import { kinopoiskApi } from '../services/kinopoiskApi';
import { likesApi } from '../services/likesApi';
import { favoritesApi } from '../services/favoritesApi';

export const store = configureStore({
  reducer: {
    [kinopoiskApi.reducerPath]: kinopoiskApi.reducer,
    [likesApi.reducerPath]: likesApi.reducer,
    [favoritesApi.reducerPath]: favoritesApi.reducer,
    currentQuery: currentQueryReducer,
    searchQuery: searchQueryReducer,
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(kinopoiskApi.middleware)
      .concat(likesApi.middleware)
      .concat(favoritesApi.middleware),
});