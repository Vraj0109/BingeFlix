import React from 'react';

import { Typography, Grid, Grow, Tooltip, Rating } from '@mui/material';
import { Link } from 'react-router-dom';

import useStyles from './styles';

function Movie({ movie, i }) {
  const classes = useStyles();
  return (
    <Grid item xs={6} sm={6} md={4} lg={3} xl={2.4} className={classes.movie}>
      <Grow in key={i} timeout={(i + 1) * 130}>
        <Link className={classes.links} to={`/movie/${movie.id}`}>
          {movie.poster_path
            ? <img alt={movie.title} className={classes.image} src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} />
            : <img alt={movie.title} className={classes.image} src="https://dummyimage.com/200x300" />}
          <Tooltip disableTouchListener title={`${movie.title} `}>
            <div className={classes.tname}>
              <Typography variant="h6" className={classes.title}>{movie.title}</Typography>
            </div>
          </Tooltip>
          <Tooltip disableTouchListener title={`${movie.vote_average}/10 `}>
            <div>
              <Rating readOnly value={movie.vote_average / 2} precision={0.1} />
            </div>
          </Tooltip>
        </Link>
      </Grow>
    </Grid>
  );
}

export default Movie;
