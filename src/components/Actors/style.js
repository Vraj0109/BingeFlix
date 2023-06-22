import { makeStyles } from '@mui/styles';

export default makeStyles((theme) => ({
  main: {
    marginLeft: '10px',
    marginRight: '10px',
  },
  image: {
    maxWidth: '90%',
    borderRadius: '20px',
    objectFit: 'cover',
    boxShadow: theme.palette.mode === 'dark' ? '0.5em 1em 1em rgba(100, 100, 100, 0.64)' : '0.5em 1em 1em rgba(0, 0, 0, 0.64)',
  },
}));
