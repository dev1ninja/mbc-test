import { makeStyles } from '@material-ui/core/styles';
import { white, red, primary } from 'theme/variables';

export const useStyles = makeStyles({
  container: {
    paddingTop: '8rem',
    '@media (max-width: 1200px)': {
      paddingTop: '0',
    },
  },
  formWrapper: {
    padding: '0 0 0 25%',
    maxWidth: '47rem',
    '@media (max-width: 1200px)': {
      margin: '0 auto',
      maxWidth: '67%',
      boxSizing: 'border-box',
      padding: '0 0 0 2.5rem',
    },
    '@media (max-width: 678px)': {
      margin: '0 auto',
      width: '100%',
      maxWidth: '70rem',
      padding: '0 1.5rem 0 2.5rem',
    },
  },
  reference: {
    margin: '2.6rem 0 0 0',
  },
  checkboxContainer: {
    display: 'flex',
    margin: '3.2rem 0 0 0',
  },
  checkbox: {
    paddingTop: '0',
  },
  formLabel: {
    fontSize: '1.2rem',
    lineHeight: '1.6rem',
    color: white,
    alignItems: 'start',
    padding: '0 0 0 1rem',
  },
  linkAgreementText: {
    color: primary,
    textDecoration: 'none',
    margin: '0 .3rem',
    cursor: 'pointer',
  },
  errorText: {
    color: red,
    margin: '2.6rem 0 2.6rem 0',
    fontSize: '1.2rem',
  },
});
