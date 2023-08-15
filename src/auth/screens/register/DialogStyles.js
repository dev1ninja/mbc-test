import { makeStyles } from "@material-ui/core/styles";

export default makeStyles({
    backdrop: {
        background: "rgba(0, 0, 0, 0.86)"
    },
    dialog: {
        background: "#1B1C21",
        color: "#fff",
        borderRadius: "2rem"
    },
    popup: {
        background: "#1B1C21",
        color: "#fff",
        borderRadius: ".4rem"
    },
    dialogWidth: {
        maxWidth: "40rem"
    },
    popupWidth: {
        maxWidth: "43rem"
    },
    dialogHeight: {
        maxHeight: "48rem",
        alignItems: "center"
    },
    popupHeight: {
        maxHeight: "35rem",
        alignItems: "center"
    },

    dialogHeader: {
        background: "#15161A",
        padding: "1rem 2rem",
        justifyContent: "space-between"
    },
    dialogTitle: {
        textAlign: "center",
        width: "92%"
    },

    iconButton: {
        background: "#fff",
        color: "#000",
        "& svg": {
            width: "1rem",
            height: "1rem"
        },
        "&:hover": {
            background: "#fff"
        }
    },

    dialogContent: {
        padding: "2rem 6rem 1rem"
    },
    popupContent: {
        padding: "2rem 4.5rem 2rem",
        "& ul": {
            width: "89%",
            paddingInlineStart: "3rem"
        }
    },

    textMargin: {
        marginBottom: "1.7rem"
    },

    continueButton: {
        background: "#00b9b9", // var(--primary-button)
        padding: "1rem 2.4rem",
        borderRadius: "10rem",
        margin: "4rem 0 2rem",
        fontSize: "1.6rem",
        fontWeight: "900",
        textTransform: "none",

        "&:hover": {
            background: "#00cfcf" // var(--primary-checkbox)
        }
    }
});
