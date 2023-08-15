import { makeStyles } from "@material-ui/styles";
import { alpha } from "@material-ui/core";
import {
    white,
    popupBackground,
    darkGrey,
    lightBlack,
    smoothBlack,
    primary,
    red
} from "theme/variables";

export const useStyles = makeStyles({
  container: {
    width: '100%',
    position: 'relative',
  },
  input: {
    width: '13rem',
    marginRight: '1.4rem',
    color: white,
  },
  doneIcon: {
    fill: primary,
  },
  inputWrapper: {
    display: 'flex',
  },
  caret: {
    color: white,
    width: '2.2rem',
    height: '2.2rem',
  },
  searchInput: {
    '&$focused': {
      border: 'none',
    },
    height: '3.2rem',
    backgroundColor: darkGrey,
    marginBottom: '.8rem',
    padding: '0 .4rem',
    border: 'none',
    color: white,
  },
  searchIcon: {
    color: lightBlack,
  },
  label: {
    marginBottom: '.4rem',
    fontWeight: '500',
  },
  emptyValue: {
    textAlign: 'center',
    marginTop: '2rem',
    color: lightBlack,
  },
  popup: {
    position: 'absolute',
    padding: '.8rem',
    width: '28.5rem',
    opacity: 0,
    maxHeight: 0,
    zIndex: 1000,
    backgroundColor: popupBackground,
    borderRadius: '.4rem',
    overflow: 'hidden',
  },
  popupTop: {
    bottom: '7rem',
  },
  errorMessage: {
    color: red,
    margin: '.5rem 0 0 .3rem',
    fontSize: '1.2rem',
    minHeight: '1.8rem',
  },
  popupVisible: {
    opacity: 1,
    width: '100%',
    marginTop: '5rem',
    boxSizing: 'border-box',
    maxHeight: '28.5rem',
    pointerEvents: 'auto',
  },
  currencyInput: {
    width: '100%',
    color: white,
    border: `1px solid ${white}`,
    position: 'relative',
    fontSize: '1.5rem',
    fontWeight: '300',
    backgroundColor: alpha("#14142B", ".5"),
    padding: '1.1rem .6rem 1.2rem 1.2rem',
    borderRadius: '0.4rem',
    
      '&:focus':{
        outline: 'none',
      },
  },
  inputError: {
    border: `1px solid ${red}`,
  },
  popupTitle: {
    fontSize: '1.6rem',
    padding: '.8rem',
    opacity: '.9',
  },
  flag: {
    marginRight: '1rem',
  },
  countryWrapper: {
    cursor: 'pointer',
    display: 'flex',
    padding: '.6rem .8rem',
    alignItems: 'center',
    borderRadius: '.4rem',
    '&:hover': {
      backgroundColor: smoothBlack,
    },
  },
  listWrapper: {
    overflow: 'auto',
    height: 'auto',
    paddingBottom: '.6rem',
  },
});
