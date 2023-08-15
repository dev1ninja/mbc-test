import { alpha } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import { black, greyBackground } from "theme/variables";

export const useStyles = makeStyles({
    container: {
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "fixed",
        top: 0,
        right: 0,
        left: 0,
        bottom: 0,
        zIndex: "1001",
        backgroundColor: alpha(black, .5),
        boxSizing: "border-box",
    },
    modalContent: {
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        height: "auto",
        width: "50rem",
        backgroundColor: greyBackground,
        position: "relative",
        borderRadius: ".4rem",
        zIndex: "3000",
        boxShadow: "0 0 1rem rgba(0, 0, 0, .3)",
        animation: "$Verify-modal-animation 500ms alternate ease",
        boxSizing: "border-box",
        padding: "3rem 3rem 3rem 3.4rem",
    },
    infoIconWrapper: {
        width: '100%',
    },
    infoIcon:{
        marginBottom: "1rem",
        cursor: 'pointer'
    },
    buttonWrapper: {
        width: '100%',
        marginTop: '3rem'
    },
    closeIcon: {
        position: "absolute",
        top: ".5rem",
        right: ".5rem",
        cursor: "pointer"
    },
    button: {
        minWidth: "16rem",
    },
    "@keyframes Verify-modal-animation": {
        "0%": {
            opacity: 0,
            transform: "translateY(-6rem)",
        },
        "100%": {
            opacity: 1,
            transform: 'translateY(0)',
        }
    }
});
