import React from 'react';
import { CssBaseline } from '@mui/material';
import { Routes, Route } from 'react-router-dom';
import { Actors, Movieinfo, Movies } from '.';
import Profiles from './Profiles/Profiles';
import NavBar from './NavBar/NavBar';

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
          <Route path="/Profile/:id" element={<Profiles />} />
          <Route path="/approved?request_token=:944a86039ed756c689b64db10148afc83d5a6b4c&approved=true" element={<Movies />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
