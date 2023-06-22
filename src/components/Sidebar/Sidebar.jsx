import React, { useEffect } from 'react';
import { Divider, List, ListItem, ListItemText, ListSubheader, ListItemIcon, Box, CircularProgress } from '@mui/material';
import { Link } from 'react-router-dom';
import { useTheme } from '@mui/styles';
import { useDispatch, useSelector } from 'react-redux';
import useStyles from './styles';
import { useGetGenresQuery } from '../../services/TMDB';
import genreIcons from '../../assets/genres/index';
import { selectGenreOrCatagory } from '../../features/currentGenreOrCatagory';

const categories = [
  { label: 'Popular', value: 'popular' },
  { label: 'Top Rated', value: 'top_rated' },
  { label: 'Upcoming', value: 'upcoming' },
];

function Sidebar({ setMobileOpen }) {
  const { genreIdOrCatagoryName } = useSelector((state) => state.currentGenreOrCatagory);
  const theme = useTheme();
  const classes = useStyles();
  const { data, isFetching } = useGetGenresQuery();
  const dispatch = useDispatch();
  const red = 'https://github.com/Vraj0109/BingeFlix/blob/main/public/logo-dark.png?raw=true';
  const bla = 'https://github.com/Vraj0109/BingeFlix/blob/main/public/logo-light.png?raw=true';
  useEffect(() => {
    setMobileOpen(false);
  }, [genreIdOrCatagoryName]);
  return (
    <div className={classes.man}>
      <Link to="/" className={classes.imageLink}>
        <img
          className={classes.image}
          src={theme.palette.mode === 'light' ? bla : red}
          alt="BingeFlix-logo"
        />
      </Link>
      <Divider />
      <List>
        <ListSubheader>Catagories</ListSubheader>
        {categories.map(({ label, value }) => (
          <Link key={value} className={classes.links} to="/">
            <ListItem onClick={() => dispatch(selectGenreOrCatagory(value))} button>
              <ListItemIcon>
                <img src={genreIcons[label.toLocaleLowerCase()]} className={classes.genreImage} height={30} />
              </ListItemIcon>
              <ListItemText primary={label} />
            </ListItem>
          </Link>
        ))}
      </List>
      <Divider />
      <List>
        <ListSubheader>Genre</ListSubheader>
        {isFetching ? (
          <Box display="flex" justifyContent="center">
            <CircularProgress size="4rem" />
          </Box>
        ) : (
          data.genres.map(({ name, id }) => (
            <Link key={name} className={classes.links} to="/">
              <ListItem onClick={() => dispatch(selectGenreOrCatagory(id))} button>
                <ListItemIcon>
                  <img src={genreIcons[name.toLowerCase()]} className={classes.genreImage} height={30} />
                </ListItemIcon>
                <ListItemText primary={name} />
              </ListItem>
            </Link>
          ))
        )}

      </List>
    </div>
  );
}

export default Sidebar;
