import React from 'react';
import { Typography, Modal, Button, ButtonGroup, Grid, Box, CircularProgress, useMediaQuery, Rating } from '@mui/material';
import { Movie as MovieIcon, Theaters, Language, PlusOne, Favorite, FavoriteBorderOutlined, Remove, ArroBack } from '@mui/icons-material';

import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import useStyles from './styles';

import genreIcons from '../../assets/genres';

import { useGetMovieQuery } from '../../services/TMDB';

import { selectGenreOrCatagory } from '../../features/currentGenreOrCatagory';

function Movieinfo() {
  const { id } = useParams();
  const { data, isFeatching, error } = useGetMovieQuery(id);
  const classes = useStyles();
  const dispatch = useDispatch();
  if (isFeatching) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center">
        <CircularProgress size="8rem" />
      </Box>
    );
  }
  if (error) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center">
        <Link to="/"> something has gone wrong please go to the home page</Link>
      </Box>
    );
  }
  const r = data?.vote_average;
  const rat = Math.round(r * 10) / 10;
  console.log(data);
  return (
    <Grid container className={classes.containerSpaceAround}>
      <Grid item sm={12} lg={4} md={6}>
        <img
          className={classes.poster}
          src={`https://image.tmdb.org/t/p/w500/${data?.poster_path}`}
          alt={data?.title}
        />
      </Grid>
      <Grid item container direction="column" lg={7}>
        <Typography variant="h4" align="center" gutterBottom>
          {data?.title}({data?.release_date.split('-')[0]})
        </Typography>
        <Typography variant="h5" align="center" gutterBottom>
          {data?.tagline}
        </Typography>
        <Grid item className={classes.containerSpaceAround}>
          <Box display="flex" align="center">
            <Rating readOnly value={rat / 2} precision={0.1} />
            <Typography variant="subtitle1" gutterBottom style={{ marginLeft: '10px' }}>
              {rat} / 10
            </Typography>
          </Box>
          <Typography variant="h6" align="center" gutterBottom>
            {data?.runtime}min / {data?.spoken_languages.length > 0 ? data?.spoken_languages[0].name : ''}
          </Typography>
        </Grid>
        <Grid item className={classes.genresContainer}>
          {data?.genres?.map((genre) => (
            <Link key={genre?.name} className={classes.links} to="/" onClick={() => dispatch(selectGenreOrCatagory(genre.id))}>
              <img src={genreIcons[genre?.name.toLowerCase()]} className={classes.genreImage} height={30} />
              <Typography color="textPrimary" variant="subtitle1">
                {genre?.name}
              </Typography>

            </Link>
          ))}
        </Grid>
      </Grid>
    </Grid>
  );
}

export default Movieinfo;
