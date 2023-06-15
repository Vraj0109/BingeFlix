import React from 'react';
import { CssBaseline } from '@mui/material';
import { Routes, Route } from 'react-router-dom';
import { Actors, Movieinfo, Movies, Profiles, NavBar } from '.';

import useStyles from './styles';

function App() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <CssBaseline />
      <NavBar />
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <Routes>
          <Route path="/" element={<Movies />} />
          <Route path="/movie/:id" element={<Movieinfo />} />
          <Route path="/actors/:id" element={<Actors />} />
          <Route path="/Profile" element={<Profiles />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
