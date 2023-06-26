import React, { useEffect, useState } from 'react';
import { Typography, Button, Box } from '@mui/material';
import { useSelector } from 'react-redux';
import { ExitToApp } from '@mui/icons-material';

import { userSelector } from '../../features/auth';

import { useGetListQuery } from '../../services/TMDB';

import RatedCards from '../RatedCards/RatedCards';
import Pagination from '../Pagination/Pagination';

const profiles = () => {
  const [pagefav, setPagefav] = useState(1);
  const [pagewat, setPagewat] = useState(1);
  const { user } = useSelector(userSelector);
  const { data: favoriteMovies, refetch: refetchFavorites } = useGetListQuery({ listName: 'favorite/movies', accountId: user.id, sessionId: localStorage.getItem('session_id'), page: pagefav });
  const { data: watchlistMovies, refetch: refetchWatchlisted } = useGetListQuery({ listName: 'watchlist/movies', accountId: user.id, sessionId: localStorage.getItem('session_id'), page: pagewat });

  useEffect(() => {
    refetchFavorites();
    refetchWatchlisted();
  }, []);
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
      {!favoriteMovies?.results?.kength && !watchlistMovies?.results?.length
        ? <Typography variant="h5">Add favorites or watchlist some movies to see them</Typography>
        : (
          <Box>
            <RatedCards title="Favorite Movies" data={favoriteMovies} />
            <Pagination currentPage={pagefav} setPage={setPagefav} totalPages={favoriteMovies.total_pages} />
            <RatedCards title="Watchlist " data={watchlistMovies} />
            <Pagination currentPage={pagewat} setPage={setPagewat} totalPages={watchlistMovies.total_pages} />
          </Box>
        )}
    </Box>
  );
};

export default profiles;
