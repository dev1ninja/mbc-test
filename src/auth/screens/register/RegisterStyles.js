import { makeStyles } from "@material-ui/core/styles";
import { darkRed, primary, red, white } from "theme/variables";

const useStyles = makeStyles({
    createButton: {
        marginBottom: ".3rem"
    },
    container: {
        width: "100%",
        boxSizing: "border-box",
        paddingTop: "15rem",
        maxWidth: "76rem",
        "@media (max-width: 1200px)": {
            margin: "-1.3rem 0 0 0",
            maxWidth: "100%",
            paddingTop: 0
        }
    },
    logoutButton: {
        marginTop: '4rem'
    },
    formWrapper: {
        width: "100%",
        padding: "0 3rem 0 30%",
        boxSizing: "border-box",
        "@media (max-width: 1200px)": {
            margin: "0 auto",
            width: "69%",
            padding: "0 0 0 2.5rem"
        },
        "@media (max-width: 678px)": {
            margin: "0 auto",
            width: "100%",
            padding: "0 1.5rem 0 2.5rem"
        }
    },
    doneIcon: {
        fill: primary
    },
    passwordIcon: {
        padding: "1rem .5rem .5rem",
    },
    subtitle: {
        fontSize: "1.6rem",
        marginBottom: "3.3rem",
        maxWidth: "48rem",
        fontWeight: "300",
        lineHeight: "1.375em",
        "@media (max-width: 678px)": {
            lineHeight: "1.5em"
        }
    },
    label: {
        marginBottom: ".4rem"
    },
    title: {
        fontSize: "3.2rem",
        margin: "0 0 1.3rem 0",
        fontWeight: "600",
        "@media (max-width: 678px)": {
            fontSize: "2.4rem",
            margin: "4rem 0 1.3rem 0"
        }
    },
    formField: {
        width: "100%",
        marginBottom: ".7rem"
    },
    terms: {
        fontSize: "1.2rem",
        marginTop: "0.1rem",
        fontWeight: "300"
    },
    link: {
        display: 'block',
        marginTop: '-.2rem',
        color: primary,
        fontSize: "1.2rem",
        textDecoration: "none"
    },
    logIn: {
        fontSize: "1.6rem",
        fontWeight: '300',
    },
    loginLink: {
        display: "inline-block",
        fontSize: "1.6rem",
        fontWeight: '300',
        color: primary,
        textDecoration: "none",
        letterSpacing: "0"
    },
    inputError: {
        backgroundColor: darkRed,
        "&:hover": {
            backgroundColor: darkRed
        }
    },
    checkPolicy: {
        display: "flex",
        alignItems: "center",
        margin: "0 0 2.7rem 0",
        fontSize: "1.2rem",
        "@media (max-width: 678px)": {
            margin: "3.1rem 0 2.8rem 0"
        }
    },
    hidePasswordIcon: {
        "& svg": {
            color: white,
            width: "2.2rem",
            height: "2.2rem"
        }
    },
    checked: {
        "& svg": {
            fill: primary,
            width: "2.2rem",
            height: "2.2rem"
        }
    },
    errorMessage: {
        color: red,
        margin: ".5rem 0 0 .3rem",
        minHeight: "1.8rem",
        fontSize: "1.2rem"
    }
});

export default useStyles;
