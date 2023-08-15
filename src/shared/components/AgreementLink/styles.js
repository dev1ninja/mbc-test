import { makeStyles } from "@material-ui/styles";
import { primary, lightGreyBackground, white } from "theme/variables";

export const useStyles = makeStyles({
    referenceLinkIcon: {
        cursor: "pointer",
        textDecoration: "none"
    },
    reference: {
        width: "100%",
        display: "flex",
        alignItems: "center",
        marginBottom: ".5rem",
        background: lightGreyBackground,
        borderRadius: "0.4rem"
    },
    referenceDescription: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        width: "100%",
        color: primary,
        boxSizing: "border-box",
        padding: "1.5rem 2rem 1.5rem 1rem"
    },
    referenceSelect: {
        display: "flex",
        alignItems: "center",
        "& svg": {
            fill: white
        }
    },
    outlinedIcon: {
        width: "2.6em",
        height: "1.6em"
    },
    referenceName: {
        color: primary,
        marginLeft: "0.5rem",
        fontWeight: "500"
    },
    referenceIcon: {
        width: "fit-content"
    }
});
