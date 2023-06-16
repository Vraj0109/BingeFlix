import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const tmdbApikey = process.env.REACT_APP_TMDB_KEY;
const page = 1;
// 'https://api.themoviedb.org/3/search/movie?include_adult=false&language=en-US&page=1
export const tmdbApi = createApi({
  reducerPath: 'tmdbApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://api.themoviedb.org/3' }),
  endpoints: (builder) => ({
    // get movies by type
    getMovies: builder.query({
      query: () => `movie/popular?page=${page}&api_key=${tmdbApikey}`,
    }),
  }),
});

export const {
  useGetMoviesQuery,
} = tmdbApi;
