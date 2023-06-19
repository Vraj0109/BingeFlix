import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const tmdbApikey = process.env.REACT_APP_TMDB_KEY;
// 'https://api.themoviedb.org/3/search/movie?include_adult=false&language=en-US&page=1
export const tmdbApi = createApi({
  reducerPath: 'tmdbApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://api.themoviedb.org/3' }),
  endpoints: (builder) => ({
    // get genres
    getGenres: builder.query({
      query: () => `genre/movie/list?api_key=${tmdbApikey}`,
    }),
    // get movies by type
    getMovies: builder.query({
      query: ({ genreIdOrCatagoryName, page }) => {
        // get movies by category
        if (genreIdOrCatagoryName && typeof genreIdOrCatagoryName === 'string') {
          return `movie/${genreIdOrCatagoryName}?page=${page}&api_key=${tmdbApikey}`;
        }
        // get movies by genres
        if (genreIdOrCatagoryName && typeof genreIdOrCatagoryName === 'number') {
          return `discover/movie?with_genres=${genreIdOrCatagoryName}&page=${page}&api_key=${tmdbApikey}`;
        }
        // get popular movies
        return `movie/popular?page=${page}&api_key=${tmdbApikey}`;
      },
    }),
  }),
});

export const {
  useGetGenresQuery,
  useGetMoviesQuery,
} = tmdbApi;
