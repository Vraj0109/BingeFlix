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
      query: ({ genreIdOrCatagoryName, page, searchQuery }) => {
        // get movies by search
        if (searchQuery) {
          return `/search/movie?query=${searchQuery}&page=${page}&api_key=${tmdbApikey}`;
        }

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
    // get movie
    getMovie: builder.query({
      query: (id) => `/movie/${id}?append_to_response=videos,credits&api_key=${tmdbApikey}`,
    }),

    // get user specific movie list
    getRecommendation: builder.query({
      query: ({ movieId, list }) => `/movie/${movieId}/${list}?api_key=${tmdbApikey}`,
    }),

    // get actor's details
    getActorDetails: builder.query({
      query: (actorId) => `/person/${actorId}?api_key=${tmdbApikey}`,
    }),

    // get actor's movies
    getMoviesByActorId: builder.query({
      query: ({ id, page }) => `/discover/movie?with_cast=${id}&page=${page}&api_key=${tmdbApikey}`,
    }),

    // get specific movies

    getList: builder.query({
      query: ({ listName, accountId, sessionId, page }) => `/account/${accountId}/${listName}?api_key=${tmdbApikey}&session_id=${sessionId}&page=${page}`,
    }),
  }),
});

export const {
  useGetGenresQuery,
  useGetMoviesQuery,
  useGetMovieQuery,
  useGetRecommendationQuery,
  useGetActorDetailsQuery,
  useGetMoviesByActorIdQuery,
  useGetListQuery,
} = tmdbApi;
