import React, { useEffect } from 'react';
import { Typography, Button, Box } from '@mui/material';
import { useSelector } from 'react-redux';
import { ExitToApp } from '@mui/icons-material';

import { userSelector } from '../../features/auth';

const profiles = () => {
  const { user } = useSelector(userSelector);
  const favoriteMovies = [];
  const logout = () => {
    localStorage.clear();
    window.location.href = '/';
  };
  console.log(user);
  return (
    <Box>
      <Box display="flex" justifyContent="space-between">
        <Typography variant="h4" gutterBottom> MY Profile</Typography>
        <Button color="inherit" onClick={logout}>
          Logout &nbsp; <ExitToApp />
        </Button>
      </Box>
      {!favoriteMovies.length
        ? <Typography variant="h5">Add favorites or watchlist some movies to see them</Typography>
        : (
          <Box>
            FAVORITE MOVIES
          </Box>
        )}
    </Box>
  );
};

export default profiles;
