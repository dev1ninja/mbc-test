import { makeStyles } from "@material-ui/styles";
import { red, textDisabled } from "theme/variables";

export const useStyles = makeStyles({
    label: {
        margin: "0 0 .5rem 0",
        textAlign: "left",
        fontWeight: "300"
    },
    labelDisabled: {
        color: textDisabled
    },
    headerWrapper: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    inputWrapper: {
        display: "flex",
        flexDirection: "column",
        position: "relative"
    },
    infoIcon: {
        paddingRight: '.5rem',
        cursor: 'pointer'
    },
    errorMessage: {
        color: red,
        margin: ".5rem 0 0 0rem",
        fontSize: "1.2rem",
        minHeight: '1.8rem'
    },
});
