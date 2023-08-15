import { makeStyles } from "@material-ui/styles";
import { white } from "theme/variables";

export const useStyles = makeStyles({
    container: {
        maxWidth: "52.5rem",
        padding: '1rem 1rem 10vh 1rem',
        margin: "auto",
        color: white,
        textAlign: "center",
        "@media (max-width: 1200px)": {
            padding: ".4rem",
        },
    },
    title: {
        marginBottom: "2rem",
        fontSize: "3.3rem",
        fontWeight: "600",
        "@media (max-width: 1200px)": {
            marginBottom: ".5rem",
        },
    },
    subtitle: {
        marginBottom: "7rem",
        fontWeight: '300',
    },
    logo: {
        width: "11rem",
        height: "3rem",
        marginBottom: "6rem",
        "@media (max-width: 1200px)": {
            marginBottom: "1rem",
        },
    }
});
