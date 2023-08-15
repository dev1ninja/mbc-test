import { makeStyles } from "@material-ui/styles";
import { formFieldBackground, inputBorderColor, primary } from "theme/variables";

export const useStyles = makeStyles({
    container: {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        cursor: "pointer",
        border: `1px solid ${inputBorderColor}`,
        borderRadius: ".4rem",
        backgroundColor: formFieldBackground,
        padding: "1rem"
    },
    active: {
        border: `1px solid ${primary}`
    },
    title: {
        marginBottom: "1rem",
        fontWeight: "600"
    },
    radio: {
        "&:hover": {
            backgroundColor: "transparent"
        },
        "&:hover:active": {
            backgroundColor: "transparent"
        },
        "& svg": {
            fill: "#565656",
            width: "2.4rem",
            height: "2.4rem"
        }
    },
    checked: {
        "& svg": {
            fill: primary
        }
    }
});
