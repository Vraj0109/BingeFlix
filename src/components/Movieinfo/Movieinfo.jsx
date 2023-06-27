import React, { useState, useEffect } from 'react';
import { Typography, Modal, Button, ButtonGroup, Grid, Box, CircularProgress, useMediaQuery, Rating } from '@mui/material';
import { Movie as MovieIcon, Theaters, Language, PlusOne, Favorite, FavoriteBorderOutlined, Remove, ArrowBack } from '@mui/icons-material';

import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';

import { skipToken } from '@reduxjs/toolkit/dist/query';

import useStyles from './styles';

import genreIcons from '../../assets/genres';

import { useGetListQuery, useGetMovieQuery, useGetRecommendationQuery } from '../../services/TMDB';

import { selectGenreOrCatagory } from '../../features/currentGenreOrCatagory';

import MovieList from '../Movielist/Movielist';

import { userSelector } from '../../features/auth';

function Movieinfo() {
  const dispatch = useDispatch();
  const { user } = useSelector(userSelector);
  const { id } = useParams();
  const { data: recommendations, isFeatching: isRecommendationsFetching } = useGetRecommendationQuery({ list: '/recommendations', movieId: id });
  const { data, isFetching, error } = useGetMovieQuery(id);

  const [pagefav, setPagefav] = useState(1);
  const [pagewat, setPagewat] = useState(1);
  const { data: favoriteMovies } = useGetListQuery({ listName: 'favorite/movies', accountId: user.id, sessionId: localStorage.getItem('session_id'), page: pagefav });
  const { data: watchlistMovies } = useGetListQuery({ listName: 'watchlist/movies', accountId: user.id, sessionId: localStorage.getItem('session_id'), page: pagewat });
  const classes = useStyles();
  const [isMovieFavorated, setIsMovieFavorited] = useState(false);
  const [isMovieWatchlisted, setIsMovieWatchlisted] = useState(false);
  useEffect(() => {
    setIsMovieFavorited(false);
    setIsMovieWatchlisted(false);
    setPagefav(1);
    setPagewat(1);
  }, [id, data, dispatch]);
  useEffect(() => {
    // let i = 1;
    // while (i < 10) {
    //   console.log(i);
    //   setPagefav(i);
    //   console.log(favoriteMovies);
    //   // if (tempfav?.results === null) break;
    //   // console.log(tempfav);
    //   // setIsMovieFavorited(!!tempfav?.results.find((movie) => movie?.id === data?.id));
    //   // if (isMovieFavorated) break;
    //   // if (i >= tempfav.total_pages) break;
    //   i += 1;
    // }
    if (isMovieFavorated) return;
    // console.log(favoriteMovies);
    if (favoriteMovies?.results.length === 0) return;
    setIsMovieFavorited(!!favoriteMovies?.results.find((movie) => movie?.id === data?.id));
    // if (pagefav === 10) return;
    if (pagefav !== favoriteMovies?.total_pages) setPagefav(pagefav + 1);
  }, [favoriteMovies, data]);
  // useEffect(() => {
  //   console.log(favoriteMovies);
  //   // setIsMovieFavorited(!!favoriteMovies?.results?.find((movie) => movie?.id === data?.id));
  // }, [favoriteMovies]);
  useEffect(() => {
    if (isMovieWatchlisted) return;
    if (watchlistMovies?.results.length === 0) return;
    setIsMovieWatchlisted(!!watchlistMovies?.results.find((movie) => movie?.id === data?.id));
    if (pagewat !== watchlistMovies?.total_pages) setPagewat(pagewat + 1);
  }, [watchlistMovies, data]);

  const [open, setOpen] = useState(false);

  // console.log(data?.videos);
  const xl = useMediaQuery((theme) => theme.breakpoints.only('xl'));

  const numberOfMovies = xl ? 10 : 12;
  const addToFavorites = async () => {
    await axios.post(`https://api.themoviedb.org/3/account/${user.id}/favorite?api_key=${process.env.REACT_APP_TMDB_KEY}&session_id=${localStorage.getItem('session_id')}`, {
      media_type: 'movie',
      media_id: id,
      favorite: !isMovieFavorated,
    });
    setIsMovieFavorited((prev) => !prev);
  };
  const addToWatchlist = async () => {
    await axios.post(`https://api.themoviedb.org/3/account/${user.id}/watchlist?api_key=${process.env.REACT_APP_TMDB_KEY}&session_id=${localStorage.getItem('session_id')}`, {
      media_type: 'movie',
      media_id: id,
      watchlist: !isMovieWatchlisted,
    });
    setIsMovieWatchlisted((prev) => !prev);
  };
  if (isFetching || isRecommendationsFetching) {
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
  return (
    <Grid container className={classes.containerSpaceAround}>
      <Grid item sm={12} lg={4} md={6}>
        <img
          className={classes.poster}
          src={`https://image.tmdb.org/t/p/w500/${data?.poster_path}`}
          alt={data?.title}
        />
      </Grid>
      <Grid item container direction="column" lg={7} md={6}>
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
        <Typography variant="h5" gutterBottom style={{ marginTop: '10px' }}>
          Overview
        </Typography>
        <Typography style={{ marginBottom: '2rem' }}>
          {data?.overview}
        </Typography>
        <Typography variant="h5" gutterBottom>
          Top cast
        </Typography>
        <Grid item container spacing={2}>
          {data && data.credits?.cast?.map((character, i) => (
            character.profile_path && (
              <Grid key={i} item xs={4} md={2} component={Link} to={`/actors/${character.id}`} style={{ textDecoration: 'none' }}>
                <img className={classes.castImage} src={`https://image.tmdb.org/t/p/w500/${character.profile_path}`} alt={character.name} />
                <Typography color="textPrimary">{character?.name}</Typography>
                <Typography color="textSecondary">{character?.character.split('/')[0]}</Typography>
              </Grid>
            )
          )).slice(0, 6)}
        </Grid>
        <Grid item container style={{ marginTop: '2rem' }}>
          <div className={classes.buttonContainer}>
            <Grid item xs={12} sm={6} className={classes.buttonContainer}>
              <ButtonGroup size="small" variant="outlined">
                <Button target="_blank" rel="noopener noreferrer" href={data?.homepage} endIcon={<Language />}>
                  Website
                </Button>
                <Button target="_blank" rel="noopener noreferrer" href={`https://www.imdb.com/title/${data?.imdb_id}`} endIcon={<MovieIcon />}>
                  IMDB
                </Button>
                <Button onClick={() => setOpen(true)} href="#" endIcon={<Theaters />}>
                  Trailer
                </Button>
              </ButtonGroup>
            </Grid>
            <Grid item xs={12} sm={6} className={classes.buttonContainer}>
              <ButtonGroup size="small" variant="outlined">
                <Button onClick={addToFavorites} endIcon={isMovieFavorated ? <Favorite /> : <FavoriteBorderOutlined />}>
                  {isMovieFavorated ? ('unfavorite') : ('favorite')}
                </Button>
                <Button onClick={addToWatchlist} endIcon={isMovieWatchlisted ? <Remove /> : <PlusOne />}>
                  Watchlist
                </Button>
                <Button endIcon={<ArrowBack />} sx={{ borderColor: 'primary.main' }}>
                  <Typography component={Link} to="/" color="inherit" variant="subtitle2" style={{ textDecoration: 'none' }} />
                </Button>
              </ButtonGroup>
            </Grid>
          </div>
        </Grid>
      </Grid>
      <Box marginTop="5rem" width="100%">
        <Typography variant="h3" gutterBottom align="center">
          You might also like
        </Typography>
        {recommendations
          ? <MovieList movies={recommendations} numberOfMovies={numberOfMovies} />
          : <Box> Sorry nothing was found. </Box>}
      </Box>
      <Modal
        closeAfterTransition
        className={classes.modal}
        open={open}
        onClose={() => setOpen(false)}
      >
        <iframe
          autoPlay
          className={classes.video}
          allowFullScreen
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          frameBorder="0"
          title="Trailer"
          src={`https://api.riptv.net/v2/embed/movie?id=${id}`}
        />
      </Modal>
    </Grid>
  );
}

export default Movieinfo;
