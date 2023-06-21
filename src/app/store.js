import { configureStore } from '@reduxjs/toolkit';

import { tmdbApi } from '../services/TMDB';

import genreOrCatagoryReducer from '../features/currentGenreOrCatagory';
import userReducer from '../features/auth';

export default configureStore({
  reducer: {
    [tmdbApi.reducerPath]: tmdbApi.reducer,
    currentGenreOrCatagory: genreOrCatagoryReducer,
    user: userReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(tmdbApi.middleware),
});
