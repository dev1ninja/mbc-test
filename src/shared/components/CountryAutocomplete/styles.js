import { makeStyles } from "@material-ui/styles";
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
        width: "100%",
        position: "relative"
    },
    input: {
        width: "11rem",
        marginRight: "1rem",
        color: white
    },
    doneIcon: {
        fill: primary
    },
    inputWrapper: {
        display: "flex"
    },
    caret: {
        color: white,
        width: "2.2rem",
        height: "2.2rem"
    },
    inputError: {
        border: `1px solid ${red}`
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
        color: lightBlack
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
        marginTop: '5rem',
        padding: ".8rem",
        width: "28.5rem",
        opacity: 0,
        maxHeight: 0,
        zIndex: 1000,
        backgroundColor: popupBackground,
        borderRadius: ".4rem",
        overflow: "hidden"
    },
    popupTop: {
        bottom: "7rem"
    },
    errorMessage: {
        color: red,
        margin: ".5rem 0 0 .3rem",
        fontSize: "1.2rem",
        minHeight: '1.8rem'
    },
    popupVisible: {
        opacity: 1,
        maxHeight: "28.5rem",
        pointerEvents: "auto"
    },
    popupTitle: {
        fontSize: "1.6rem",
        padding: ".8rem",
        opacity: ".9"
    },
    flag: {
        marginRight: "1rem",
    },
    customFlag: {
        width: '2.4rem',
        height: '1.8rem',
        marginRight: '1rem'
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
