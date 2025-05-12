import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const likesApi = createApi({
  reducerPath: 'likesApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:5000/api/likes',
    credentials: 'include',
    prepareHeaders: (headers) => {
      const token = localStorage.getItem('accessToken');
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getLikes: builder.query({
      query: (movieId) => `/${movieId}`,
      providesTags: (result, error, movieId) => [{ type: 'Likes', id: movieId }],
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          await queryFulfilled;
        } catch (error) {
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
                dispatch(likesApi.util.invalidateTags([{ type: 'Likes', id: arg }]));
              } else {
                localStorage.removeItem('accessToken');
                localStorage.removeItem('refreshToken');
                window.location.href = '/login';
              }
            } catch (refreshError) {
              localStorage.removeItem('accessToken');
              localStorage.removeItem('refreshToken');
              window.location.href = '/login';
            }
          }
        }
      },
    }),
    setLike: builder.mutation({
      query: (movieId) => ({
        url: '/like',
        method: 'POST',
        body: { movieId },
      }),
      invalidatesTags: (result, error, movieId) => [{ type: 'Likes', id: movieId }],
    }),
    setDislike: builder.mutation({
      query: (movieId) => ({
        url: '/dislike',
        method: 'POST',
        body: { movieId },
      }),
      invalidatesTags: (result, error, movieId) => [{ type: 'Likes', id: movieId }],
    }),
  }),
});

export const {
  useGetLikesQuery,
  useSetLikeMutation,
  useSetDislikeMutation,
} = likesApi;