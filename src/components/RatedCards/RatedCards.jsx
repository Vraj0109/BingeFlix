import React from 'react';
import { Typography, Box, Grid } from '@mui/material';

import Movie from '../Movie/Movie';
import useStyles from './styles';

function RatedCards({ title, data }) {
  const classes = useStyles();
  return (
    <Box>
      <Typography variant="h5" gutterBottom>{title}</Typography>
      <Grid container className={classes.container}>
        {data?.results.map((movie, i) => (
          <Movie key={movie.id} movie={movie} i={i} />
        ))}
      </Grid>
    </Box>
  );
}

export default RatedCards;
