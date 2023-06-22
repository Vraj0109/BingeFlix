import React, { useState } from 'react';

import { Box, Button, CircularProgress, Grid, Typography, useMediaQuery } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';

import { ArrowBack } from '@mui/icons-material';

import { useGetActorDetailsQuery, useGetMoviesByActorIdQuery } from '../../services/TMDB';

import MovieList from '../Movielist/Movielist';
import useStyles from './style';

import Pagination from '../Pagination/Pagination';

function Actors() {
  const { id } = useParams();
  const navigate = useNavigate();
  const classes = useStyles();
  const [page, setPage] = useState(1);
  const { data, isFetching, error } = useGetActorDetailsQuery(id);
  const { data: movies } = useGetMoviesByActorIdQuery({ id, page });
  const md = useMediaQuery((theme) => theme.breakpoints.only('md'));

  const numberOfMovies = md ? 18 : 20;
  if (isFetching) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center">
        <CircularProgress size="8rem" />
      </Box>
    );
  }
  if (error) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center">
        <Button startIcon={<ArrowBack />} onClick={() => navigate(-1)} color="primary">
          goBack
        </Button>
      </Box>
    );
  }
  console.log(data);
  return (
    <div className={classes.main}>
      <Grid container spacing={3}>
        <Grid item lg={5} xl={4}>
          <img
            className={classes.image}
            src={`https://image.tmdb.org/t/p/w780/${data?.profile_path}`}
            alt={data.name}
          />
        </Grid>
        <Grid item lg={7} xl={8} style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column' }}>
          <Typography variant="h2" gutterBottom>
            {data?.name}
          </Typography>
          <Typography variant="h5" gutterBottom>
            Born: {new Date(data?.birthday).toDateString()}
          </Typography>
          <Typography variant="body1" align="justify" paragraph>
            {data?.biography || 'Sorry, no further information about the actor'}
          </Typography>
          <Box marginTop="2rem" display="flex" justifyContent="space-around">
            <Button variant="contained" color="primary" target="_blank" href={`https://imdb.com/name/${data?.imdb_id}`}>IMDB</Button>
            <Button startIcon={<ArrowBack />} onClick={() => navigate(-1)} color="primary">goBack</Button>
          </Box>
        </Grid>
      </Grid>
      <Box margin="2rem 0">
        <Typography variant="h2" gutterBottom align="center">Movies</Typography>
        {movies && <MovieList movies={movies} numberOfMovies={numberOfMovies} />}
        <Pagination currentPage={page} setPage={setPage} totalPages={movies?.total_pages} />
      </Box>
    </div>
  );
}

export default Actors;
