import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const likesApi = createApi({
  reducerPath: 'likesApi',
  baseQuery: fetchBaseQuery({ 
    baseUrl: 'http://localhost:5000/api/likes', 
    prepareHeaders: (headers, { getState }) => {
      const token = localStorage.getItem('token')
      if (token) {
        headers.set('Authorization', `Bearer ${token}`)
      }
      return headers
    }
  }),
  endpoints: (builder) => ({
    getLikes: builder.query({
      query: (movieId) => `/${movieId}`,
    }),
    setLike: builder.mutation({
      query: (movieId) => ({
        url: '/like',
        method: 'POST',
        body: { movieId },
      }),
    }),
    setDislike: builder.mutation({
      query: (movieId) => ({
        url: '/dislike',
        method: 'POST',
        body: { movieId },
      }),
    }),
  }),
})

export const { 
  useGetLikesQuery, 
  useSetLikeMutation, 
  useSetDislikeMutation 
} = likesApi