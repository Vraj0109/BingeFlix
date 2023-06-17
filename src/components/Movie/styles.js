import { makeStyles } from '@mui/styles';

export default makeStyles((theme) => ({
  movie: {
    padding: '10px',
  },
  title: {
    color: theme.palette.text.primary,
    textOverflow: 'ellipsis',
    width: '190px',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    marginTop: '10px',
    marginBottom: 0,
    textAlign: 'center',
    [theme.breakpoints.up('xs')]: {
      width: '90%',
    },
  },
  image: {
    width: '190px',
    height: 'auto',
    borderRadius: '20px',
    marginButton: '10px',
    '&:hover': {
      transform: 'scale(1.05)',
    },
    [theme.breakpoints.up('xs')]: {
      width: '90%',
    },
  },
  links: {
    alignItems: 'center',
    fontWeight: 'bolder',
    textDecoration: 'none',
    [theme.breakpoints.up('xs')]: {
      display: 'flex',
      flexDirection: 'column',
      width: '100%',
    },
    '&:hover': {
      cursor: 'pointer',
    },
  },
}));
