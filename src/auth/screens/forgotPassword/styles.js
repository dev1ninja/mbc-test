import { makeStyles } from "@material-ui/styles";
import { white, darkRed } from "theme/variables";

export const useStyles = makeStyles({
    main: {
        textAlign: "center",
        width: "100%",
        maxHeight: "100%",
        overflow: "auto"
    },
    container: {
        maxWidth: "52.5rem",
        padding: '1rem 1rem 10vh 1rem',
        paddingBottom: "10vh",
        margin: "auto",
        color: white,
        textAlign: "center",
        "@media (max-width: 1200px)": {
            padding: "1rem"
        },
    },
    sendBtn: {
        marginTop: "3rem"
    },
    title: {
        marginBottom: "2rem",
        fontSize: "3.3rem",
        fontWeight: "800"
    },
    subtitle: {
        marginBottom: "7rem"
    },
    input: {
        marginBottom: "3rem"
    },
    inputError: {
        backgroundColor: darkRed,
        "&:hover": {
            backgroundColor: darkRed
        }
    },
    label: {
        textAlign: "left",
        margin: "0 0 .9rem .3rem",
        fontWeight: "bold"
    },
    formField: {
        textAlign: "left",
    },
    logo: {
        width: "11rem",
        height: "3rem",
        marginBottom: "6rem",
        "@media (max-width: 1200px)": {
            marginBottom: "3rem"
        },
    }
});
