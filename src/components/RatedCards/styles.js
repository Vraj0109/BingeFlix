import { makeStyles } from '@mui/styles';

export default makeStyles((theme) => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContentL: 'space-between',
    overflow: 'auto',
    scrollbarWidth: 'thin',
    paddingLeft: '20px',
    paddingRight: '10px',
    [theme.breakpoints.down('sm')]: {
      justifyContent: 'center',
    },
  },
}));
