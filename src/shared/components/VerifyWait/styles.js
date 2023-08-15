import { makeStyles } from '@material-ui/styles';

export const useStyles = makeStyles({
  container: {
    height: '100%',
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
  },
  logo: {
    width: '12.8rem',
    marginTop: '10.5rem',
  },
  imageContainer: {
    margin: '11.8rem 5.9rem 5.8rem 0',
  },
  textContainer: {
    fontSize: '2.8rem',
    textAlign: 'center',
    fontWeight: '600',
  },
});
