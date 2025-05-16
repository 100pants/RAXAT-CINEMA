import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const favoritesApi = createApi({
  reducerPath: 'favoritesApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:5000/api/favorites',
    credentials: 'include',
    prepareHeaders: (headers) => {
      const token = localStorage.getItem('accessToken');
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ['Favorites'],
  endpoints: (builder) => ({
    getFavorites: builder.query({
      query: () => '/',
      providesTags: ['Favorites'],
    }),
    addFavorite: builder.mutation({
      query: (kinopoiskId) => {
        console.log('Отправляем запрос addFavorite:', { kinopoiskId });
        return {
          url: '/',
          method: 'POST',
          body: { kinopoiskId },
        };
      },
      invalidatesTags: ['Favorites'],
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const response = await queryFulfilled;
          console.log('Ответ addFavorite:', response); 
        } catch (error) {
          console.error('Ошибка addFavorite:', error);
          if (error.error?.status === 401) {
            try {
              const response = await fetch('http://localhost:5000/api/user/refresh', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ refreshToken: localStorage.getItem('refreshToken') }),
              });
              const data = await response.json();
              if (data.accessToken) {
                localStorage.setItem('accessToken', data.accessToken);
                localStorage.setItem('refreshToken', data.refreshToken);
                dispatch(favoritesApi.util.invalidateTags(['Favorites']));
              } else {
                localStorage.removeItem('accessToken');
                localStorage.removeItem('refreshToken');
                dispatch(favoritesApi.util.resetApiState());
                window.location.href = '/login';
              }
            } catch (refreshError) {
              console.error('Ошибка обновления токена:', refreshError);
              localStorage.removeItem('accessToken');
              localStorage.removeItem('refreshToken');
              dispatch(favoritesApi.util.resetApiState());
              window.location.href = '/login';
            }
          }
        }
      },
    }),
    removeFavorite: builder.mutation({
      query: (kinopoiskId) => {
        console.log('Отправляем запрос removeFavorite:', { kinopoiskId });
        return {
          url: '/',
          method: 'DELETE',
          body: { kinopoiskId },
        };
      },
      invalidatesTags: ['Favorites'],
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const response = await queryFulfilled;
          console.log('Ответ removeFavorite:', response); 
        } catch (error) {
          console.error('Ошибка removeFavorite:', error);
          if (error.error?.status === 401) {
            try {
              const response = await fetch('http://localhost:5000/api/user/refresh', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ refreshToken: localStorage.getItem('refreshToken') }),
              });
              const data = await response.json();
              if (data.accessToken) {
                localStorage.setItem('accessToken', data.accessToken);
                localStorage.setItem('refreshToken', data.refreshToken);
                dispatch(favoritesApi.util.invalidateTags(['Favorites']));
              } else {
                localStorage.removeItem('accessToken');
                localStorage.removeItem('refreshToken');
                dispatch(favoritesApi.util.resetApiState());
                window.location.href = '/login';
              }
            } catch (refreshError) {
              console.error('Ошибка обновления токена:', refreshError);
              localStorage.removeItem('accessToken');
              localStorage.removeItem('refreshToken');
              dispatch(favoritesApi.util.resetApiState());
              window.location.href = '/login';
            }
          }
        }
      },
    }),
  }),
});

export const {
  useGetFavoritesQuery,
  useAddFavoriteMutation,
  useRemoveFavoriteMutation,
} = favoritesApi;