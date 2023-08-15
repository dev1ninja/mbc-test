import { makeStyles } from '@material-ui/styles';
import { red } from 'theme/variables';

export const useStyles = makeStyles({
  container: {
    height: '100%',
    width: '100%',
  },
  errorContainer: {
    border: `1px solid ${red}`,
  },
  title: {
    marginBottom: '.4rem',
  },
  numberInput: {
    width: '6.5rem',
    height: '5rem',
    textAlign: 'end',
    paddingRight: '1rem',
    '& input': {
      textAlign: 'end',
      padding: '0 0.5rem 0 0',
      fontSize: '1.4rem',
    },
  },
  percentText: {
    fontSize: '1.4rem',
  },
});
