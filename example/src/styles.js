import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  cardContainer: {
    width: '80%',
  },
  card: {
    width: '100%',
    padding: 30,
  },
  form: {
    width: '100%',
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    flexDirection: 'column',
  },
  centerContent: {
    justifyContent: 'center',
    flexDirection: 'column',
    alignItems: 'center',
    display: 'flex',
  },
  centerSelf: {
    alignSelf: 'center',
    justifySelf: 'center',
  },
  marginTop5: {
    marginTop: theme.spacing(5),
  },
  marginTop2: {
    marginTop: theme.spacing(2),
  },
  marginTop1: {
    marginTop: theme.spacing(1),
  },
  fullWidth: {
    width: '100%',
  },
}));

export default useStyles;
