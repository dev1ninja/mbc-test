import { makeStyles } from "@material-ui/styles";

export const useStyles = makeStyles({
    container: {
        height: "100%",
        width: "100%",
        display: "flex",
        alignItems: "center",
        flexDirection: "column"
    },
    logo: {
        width: "12.8rem",
        marginTop: "10.5rem"
    },
    imageContainer: {
        right: "3.1rem",
        margin: "6.4rem 0 2.5rem 4rem"
    },
    textContainer: {
        fontSize: "1.8rem",
        textAlign: "center",
        fontWeight: "600"
    }
});
