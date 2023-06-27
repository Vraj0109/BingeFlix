import React, { useState } from 'react';
import { TextField, InputAdornment } from '@mui/material';
import { Search as SearchIcon } from '@mui/icons-material';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import useStyles from './styles.js';

import { searchMovie } from '../../features/currentGenreOrCatagory.js';

function Search() {
  const navigate = useNavigate();
  const classes = useStyles();
  const [query, setQuery] = useState('');
  const dispatch = useDispatch();
  const handlekeyPress = (event) => {
    if (event.key === 'Enter') {
      navigate('/');
      console.log('here ', query);
      dispatch(searchMovie(query));
    }
  };
  return (
    <div className={classes.searchContainer}>
      <TextField
        onKeyPress={handlekeyPress}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        variant="standard"
        InputProps={{
          className: classes.input,
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
      />
    </div>
  );
}

export default Search;
