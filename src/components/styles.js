import { makeStyles } from '@mui/styles';

export default makeStyles(() => ({
  root: {
    display: 'flex',
    height: '100%',
    scrollbarWidth: 'thin',
  },
  toolbar: {
    height: '70px',
  },
  content: {
    flexGrow: '1',
    paddingTop: '2em',
  },
}));
