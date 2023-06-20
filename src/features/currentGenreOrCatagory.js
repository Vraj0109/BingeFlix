import { createSlice } from '@reduxjs/toolkit';

export const genreOrCatagory = createSlice({
  name: 'genreOrCatagory',
  initialState: {
    genreIdOrCatagoryName: '',
    page: '1',
    searchQuery: '',
  },
  reducers: {
    selectGenreOrCatagory: (state, action) => {
      state.genreIdOrCatagoryName = action.payload;
      state.searchQuery = '';
    },
    searchMovie: (state, action) => {
      state.searchQuery = action.payload;
    },
  },
});

export const { selectGenreOrCatagory, searchMovie } = genreOrCatagory.actions;

export default genreOrCatagory.reducer;
