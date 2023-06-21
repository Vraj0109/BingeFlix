import { makeStyles } from '@mui/styles';

export default makeStyles((theme) => ({
  man: {
    scrollbarWidth: 'none',
  },
  imageLink: {
    dispay: 'flex',
    justifyContent: 'center',
    padding: '10% 0',
  },
  image: {
    width: '70%',
    padding: '10px',
  },
  links: {
    color: theme.palette.text.primary,
    textDecoration: 'none',
  },
  genreImage: {
    filter: theme.palette.mode === 'dark' ? 'invert(1)' : 'dark',
  },
}));
