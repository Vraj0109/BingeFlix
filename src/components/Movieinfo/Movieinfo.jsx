import React from 'react';
import { Typography, Modal, Button, ButtonGroup, Grid, Box, CircularProgress, useMediaQuery, Rating } from '@mui/material';
import { Movie as MovieIcon, Theaters, Language, PlusOne, Favorite, FavoriteBorderOutlined, Remove, ArroBack } from '@mui/icons-material';

import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';

import { useGetMovieQuery } from '../../services/TMDB';

function Movieinfo() {
  const { id } = useParams();
  const { data, isFeatching, error } = useGetMovieQuery(id);
  if (isFeatching) {
    <Box display="flex" justifyContent="center" alignItems="center">
      <CircularProgress size="8rem" />
    </Box>;
  }
  if (error) {
    <Box display="flex" justifyContent="center" alignItems="center">
      <Link to="/"> something has gone wrong please go to the home page</Link>
    </Box>;
  }
  console.log(data);
  return (
    <div>
      MovieInformation {id}
    </div>
  );
}

export default Movieinfo;
