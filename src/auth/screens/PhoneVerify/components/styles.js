import { makeStyles } from "@material-ui/core";
import { primary } from "theme/variables";

export const useStyles = makeStyles({
    input: {},
    receivedWrapper: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        marginTop: "3rem"
    },
    otpWrapper: {
        marginTop: '3rem',
        justifyContent: "center"
    },
    button: {
        marginTop: '3rem'
    },
    errorWrapper: {
        textAlign: 'left',
    },
    link: {
        color: primary,
        marginLeft: ".5rem",
        cursor: "pointer"
    }
});
