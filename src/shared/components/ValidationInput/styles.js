import { makeStyles } from "@material-ui/core/styles";
import { primary, red, white, darkRed } from "theme/variables";

export const useStyles = makeStyles({
    inputContainer: {
        width: "100%",
        boxSizing: "border-box"
    },
    label: {
        margin: "0 0 .5rem 0",
        textAlign: "left",
        fontWeight: "300"
    },
    validationContainer: {
        margin: ".6rem 0 .3rem 0",
        display: "flex",
        justifyContent: "space-between",
        minHeight: '1.8rem',
        flexWrap: "wrap",
        width: "100%"
    },
    passwordIcon: {
        padding: '1rem .5rem .5rem',
    },
    inputError: {
        border: `1px solid ${red}`,
        "&:hover": {
            backgroundColor: darkRed
        }
    },
    eyeIcon: {
        color: white,
        "& svg": {
            width: "2.2rem",
            height: "2.2rem"
        }
    },
    valid: {
        color: primary,
        display: "flex",
        alignItems: "center",
        fontSize: "1.2rem",
        "& svg": {
            fill: primary
        }
    },
    contentWrapper: {
        display: "flex",
        alignItems: "center"
    },
    validText: {
        marginLeft: ".4rem",
        color: primary,
        fontSize: "1.2rem"
    },
    erroText: {
        marginLeft: ".4rem",
        color: red,
        fontSize: "1.2rem"
    },
    icon: {
        height: "2rem",
        width: "2rem"
    },
    error: {
        color: red,
        "& svg": {
            fill: red
        }
    }
});
