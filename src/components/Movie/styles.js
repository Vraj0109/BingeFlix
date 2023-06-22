import { makeStyles } from '@mui/styles';

export default makeStyles((theme) => ({
  movie: {
    paddingTop: '20px',
    padding: '1px',
  },
  tname: {
    marginTop: '13px',
    width: 'inherit',
  },
  title: {
    color: theme.palette.text.primary,
    textOverflow: 'ellipsis',
    width: '180px',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    marginTop: '10px',
    marginBottom: 0,
    textAlign: 'center',
    [theme.breakpoints.up('xs')]: {
      width: '90%',
    },
  },
  image: {
    width: '190px',
    aspectRatio: '10/15',
    borderRadius: '20px',
    marginButton: '10px',
    marginRight: '25px',
    transition: 'transform 200ms ease',
    boxShadow: theme.palette.mode === 'dark' ? '5px 5px 5px rgba(100, 100, 100, 0.64)' : '5px 5px 5px rgba(0, 0, 0, 0.64)',
    '&:hover': {
      boxShadow: theme.palette.mode === 'dark' ? '15px 15px 5px rgba(100, 100, 100, 0.64)' : '15px 15px 5px rgba(0, 0, 0, 0.64)',
      transform: 'scale(1.1)',
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
