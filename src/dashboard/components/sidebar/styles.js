import { makeStyles } from "@material-ui/core";
import { lightGrey, primary, white } from "theme/variables";

export const useStyles = makeStyles({
    container: {
        display: "flex",
        width: "100%",
        flexDirection: "column",
        padding: "5.5rem 2.5rem 0 9.5rem",
        boxSizing: "border-box"
    },
    logo: {
        display: "block",
        margin: "7.7rem 0 4.5rem 11.5rem"
    },
    loginLogo: {
        cursor: "pointer"
    },
    activeItemContainer: {
        background: "linear-gradient(45deg, #232E46 50%, #272234 90%)",
        borderRadius: ".4rem"
    },
    itemClickable: {
        cursor: "pointer"
    },
    doneIcon: {
        fill: primary
    },
    itemContainer: {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        width: "100%",
        minWidth: '28rem',
        maxWidth: "28rem",
        minHeight: "5.4rem",
        marginBottom: "3.5rem"
    },
    content: {
        display: "flex",
        padding: ".3rem 0 0 .1rem"
    },
    icon: {
        margin: "1.5rem 1rem 0 0",
        color: primary
    },
    itemText: {
        fontSize: "2.4rem",
        fontWeight: "600",
        color: white,
        marginLeft: "2rem"
    },
    activeItemText: {
        color: lightGrey
    },
    itemContent: {
        fontSize: "2.4rem",
        whiteSpace: 'nowrap',
        fontWeight: "600",
        marginLeft: "3.5rem"
    },
    logoutLogo: {
        display: "block",
        height: "2.2rem",
        width: "2.2rem"
    },
    logoutWrapper: {
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        position: "absolute",
        bottom: "10rem"
    },
    logoutText: {
        fontSize: "1.8rem",
        color: primary,
        margin: ".5rem 0 0 .5rem"
    }
});
