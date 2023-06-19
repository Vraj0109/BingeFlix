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
    },
  },
});

export const { selectGenreOrCatagory } = genreOrCatagory.actions;

export default genreOrCatagory.reducer;
