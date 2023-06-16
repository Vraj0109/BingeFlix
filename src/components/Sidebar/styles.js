import { makeStyles } from '@mui/styles';

export default makeStyles((theme) => ({
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
    filter: theme.palette.mode === 'dark' ? 'dark' : 'invert(1)',
  },
}));
