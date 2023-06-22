import { makeStyles } from '@mui/styles';

export default makeStyles(() => ({
  main: {
    marginLeft: '10px',
    marginRight: '10px',
  },
  image: {
    maxWidth: '90%',
    borderRadius: '20px',
    objectFit: 'cover',
    boxShadow: '0.5em 1em 1em rgba(0, 0, 0, 0.64)',
  },
}));
