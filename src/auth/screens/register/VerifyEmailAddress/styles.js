import { makeStyles } from "@material-ui/core";
import { primary } from "theme/variables";

export const useStyles = makeStyles({
    container: {
        width: "100%",
        paddingTop: "15rem",
        boxSizing: "border-box",
        "@media (max-width: 1200px)": {
            paddingTop: 0
        }
    },
    backButton: {
        marginBottom: "7.4rem"
    },
    formWrapper: {
        paddingLeft: "24.4rem",
        maxWidth: '47rem',
        "@media (max-width: 1200px)": {
            margin: "0 auto",
            width: "69%",
            padding: "0 0 0 4.5rem"
        },
        "@media (max-width: 678px)": {
            margin: "0 auto",
            width: "88%",
            padding: "0 1.5rem 0 0"
        }
    },
    title: {
        fontSize: "3.2rem",
        fontWeight: "600",
        marginBottom: "1.1rem"
    },
    subtitle: {
        fontSize: "1.6rem",
        fontWeight: '300',
        marginBottom: "3.4rem",
        maxWidth: "45rem",
        lineHeight: "1.375em"
    },
    label: {
        marginBottom: ".4rem"
    },
    input: {
        marginBottom: ".8rem",
        maxWidth: "46.5rem"
    },
    footer: {
        display: "flex",
        alignItems: "center",
        marginTop: "1.7rem"
    },
    footerLink: {
        color: primary,
        marginLeft: ".5rem",
        cursor: "pointer",
        textDecoration: "none"
    }
});
