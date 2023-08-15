import { makeStyles } from "@material-ui/styles";

export const useStyles = makeStyles({
    container: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "fixed",
        top: 0,
        right: 0,
        left: 0,
        bottom: 0,
        zIndex: 1000,
        backgroundColor: "#04040599"
    },
    modalContent: {
        textAlign: "center",
        height: "30rem",
        width: "50rem",
        backgroundColor: "#232429",
        position: "relative",
        borderRadius: ".4rem",
        boxShadow: "0 0 1rem rgba(0, 0, 0, .3)",
        animation: "$Verify-modal-animation 500ms alternate ease"
    },
    closeIcon: {
        position: "absolute",
        top: ".5rem",
        right: ".5rem",
        cursor: "pointer"
    },
    successIcon: {
        marginTop: "2rem"
    },
    title: {
        fontSize: "2.8rem",
        fontWeight: "500",
        margin: "2rem 0 3rem 0"
    },
    "@keyframes Verify-modal-animation": {
        "0%": {
            opacity: 0,
            top: "-6rem"
        },
        "100%": {
            opacity: 1,
            top: 0
        }
    }
});
