import { makeStyles } from "@material-ui/core/styles";
import { white } from "theme/variables";

const useStyles = makeStyles({
    loginWrapper: {
        color: "#fff",
        maxHeight: "100%",
        width: "100%",
        textAlign: "center"
    },
    formWrapper: {
        maxWidth: "50rem",
        padding: '1rem 1rem 20rem 1rem',
        textAlign: "center",
        margin: "auto",
        paddingBottom: "20rem",
        "@media (max-width: 1200px)": {
            padding: "1rem"
        },
    },
    inputTitle: {
        textAlign: "left",
        margin: "1.5rem 0 .8rem .3rem"
    },
    input: {
        marginBottom: ".2rem"
    },
    textFieldInput: {
        paddingLeft: ".4rem",
        borderRadius: ".4rem",
        height: "4.3rem",
        width: "100%",
        "&:hover": {
            backgroundColor: "#15161A"
        }
    },
    loginButton: {
        margin: "2.8rem 0",
        backgroundColor: "#0CF8E9",
        width: "18rem",
        height: "4.4rem",
        textTransform: "none",
        "&:disabled": {
            backgroundColor: "#0CF8E9",
            opacity: ".2",
            color: "#000"
        }
    },
    hidePasswordIcon: {
        "& svg": {
            color: white,
            width: "2.2rem",
            height: "2.2rem"
        }
    },
    textFieldFocused: {
        border: "1px solid #0CF8E9"
    },
    startedWrapper: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: "1.6rem"
    },
    registerLink: {
        color: "#00B9B9",
        textAlign: "right",
        fontWeight: "300",
        textDecoration: "none",
        marginLeft: ".5rem"
    },
    passwordIcon: {
        padding: '1rem .5rem .5rem',
    },
    link: {
        fontSize: "1.6rem",
        color: "#00B9B9",
        textAlign: "right",
        fontWeight: "300",
        textDecoration: "none",
        display: "block"
    },
    title: {
        fontSize: "3.3rem",
        fontWeight: "600",
        marginBottom: "5.5rem",
        "@media (max-width: 1200px)": {
            marginBottom: "1rem"
        },
    },
    logo: {
        width: "11rem",
        height: "3rem",
        margin: "1rem 0 6rem",
        textAlign: "center",
        "@media (max-width: 1200px)": {
            margin: "1rem 0 2rem 0"
        },
    },
    errorMessage: {
        textAlign: 'left',
    }
});

export default useStyles;
