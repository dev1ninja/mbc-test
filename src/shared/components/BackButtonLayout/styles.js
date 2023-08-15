import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles({
    container: {
        display: "flex",
        alignItems: "center",
        width: "fit-content",
        cursor: "pointer",
        borderBottom: "1px solid white"
    },
    buttonContent: {
        marginBottom: ".2rem"
    },
    icon: {
        margin: "0 .3rem .2rem 0"
    },
    backButton: {
        marginBottom: "4.5rem"
    },
    title: {
        fontSize: "3.2rem",
        fontWeight: "600",
        marginBottom: "1.1rem"
    },
    subtitle: {
        fontSize: "1.6rem",
        marginBottom: "2.5rem",
        fontWeight: '300',
        maxWidth: "45rem",
        lineHeight: "1.375em"
    }
});
