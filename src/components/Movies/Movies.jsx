import React, { useState, useEffect } from 'react';
import { Box, CircularProgress, useMediaQuery, Typography } from '@mui/material';
import { useSelector } from 'react-redux';

import { useGetMoviesQuery } from '../../services/TMDB.js';
import { Movielist } from '..';
import { selectGenreOrCatagory } from '../../features/currentGenreOrCatagory.js';

function Movies() {
  const [page, setPage] = useState(1);
  const { genreIdOrCatagoryName, searchQuery } = useSelector((state) => state.currentGenreOrCatagory);
  const { data, error, isFetching } = useGetMoviesQuery({ genreIdOrCatagoryName, page, searchQuery });
  if (isFetching) {
    return (
      <Box display="flex" justifyContent="center">
        <CircularProgress size="4rem" />
      </Box>
    );
  }
  if (!data.results.length) {
    return (
      <Box displayPrint="flex" alignItems="center" mt="20px">
        <Typography variant="h4">no movies that match that name.
          <br />
          please search for something else.
        </Typography>
      </Box>
    );
  }
  if (error) return 'An error has occured';
  return (
    <div>
      <Movielist movies={data} />
    </div>
  );
}

export default Movies;
