import { makeStyles } from "@material-ui/core/styles";
import {
    darkGrey,
    darkRed,
    lightBlack,
    popupBackground,
    red,
    smoothBlack,
    white
} from "theme/variables";

export const useStyles = makeStyles({
    container: {
        width: "100%",
        position: "relative"
    },
    input: {
        width: "100%",
        color: white
    },
    inputWrapper: {
        display: "flex",
        flexDirection: "column",
        position: "relative"
    },
    customFlag: {
        width: '2.4rem',
        height: '1.8rem',
        marginRight: '1rem'
    },
    caret: {
        color: white,
        fontSize: "3.3rem"
    },
    inputError: {
        border: `1px solid ${red}`,
        "&:hover": {
            backgroundColor: darkRed
        }
    },
    errorMessage: {
        color: red,
        margin: ".5rem 0 0 .3rem",
        fontSize: "1.2rem",
        minHeight: '1.8rem'
    },
    searchInput: {
        height: "3.2rem",
        backgroundColor: darkGrey,
        marginBottom: ".8rem",
        padding: "0 .4rem",
        border: "none",
        color: white
    },
    searchIcon: {
        color: lightBlack,
        width: "2.2rem",
        height: "2.2rem"
    },
    label: {
        marginBottom: ".4rem",
        fontWeight: '300'
    },
    emptyValue: {
        textAlign: "center",
        marginTop: "2rem",
        color: lightBlack
    },
    popup: {
        position: "absolute",
        boxSizing: "border-box",
        padding: ".8rem",
        marginTop: '-2rem',
        opacity: 0,
        maxHeight: 0,
        pointerEvents: "none",
        width: "100%",
        zIndex: 1000,
        backgroundColor: popupBackground,
        borderRadius: ".4rem",
        overflow: "hidden"
    },
    popupTop: {
        bottom: "7rem"
    },
    popupVisible: {
        opacity: 1,
        minHeight: "28.5rem",
        maxHeight: "28.5rem",
        pointerEvents: "auto"
    },
    popupTitle: {
        fontSize: "1.6rem",
        padding: ".8rem",
        opacity: ".9"
    },
    flag: {
        marginRight: "1rem"
    },
    countryWrapper: {
        cursor: "pointer",
        display: "flex",
        padding: ".6rem .8rem",
        alignItems: "center",
        borderRadius: ".4rem",
        "&:hover": {
            backgroundColor: smoothBlack
        }
    },
    listWrapper: {
        overflow: "auto",
        height: "19.5rem",
        paddingBottom: ".6rem"
    }
});
