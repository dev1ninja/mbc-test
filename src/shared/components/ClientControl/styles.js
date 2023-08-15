import { makeStyles } from "@material-ui/styles";
import { primary, lighterGrey, red, lightGreyBackground, white } from "theme/variables";

export const useStyles = makeStyles({
    control: {
        width: "100%",
        display: "flex",
        alignItems: "center",
        background: lightGreyBackground,
        borderRadius: "0.4rem"
    },
    controlDescription: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        width: "100%",
        color: white,
        boxSizing: "border-box",
        padding: "1.5rem 2rem 1.5rem 1.5rem"
    },
    isActiveControlDescription: {
        border: `1px solid ${primary}`
    },
    controlSelect: {
        display: "flex",
        alignItems: "flex-start",
        flexDirection: "column",
        "& svg": {
            fill: white
        }
    },
    outlinedIcon: {
        width: "2.6em",
        height: "1.6em"
    },
    controlTitle: {
        fontWeight: "300"
    },
    controlSubtitle: {
        fontSize: "1.4rem",
        color: lighterGrey,
        marginTop: "1rem",
        fontWeight: "300"
    },
    controlButtonsEnter: {
        display: "flex"
    },
    controlButtonIcon: {
        color: red,
        cursor: "pointer"
    },
    controlIcon: {
        padding: "0rem 0rem 0 1.5rem"
    }
});
