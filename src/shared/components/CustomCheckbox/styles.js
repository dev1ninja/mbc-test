import { makeStyles } from "@material-ui/core";
import { primary, red, lighterGrey } from "theme/variables";

export const useStyles = makeStyles({
    wrapper: {
        display: "flex",
        alignItems: "center"
    },
    labelReverse: {
        flexDirection: "row-reverse",
        justifyContent: 'flex-end'
    },
    label: {
        cursor: "pointer",
        margin: "0 .5rem",
        fontWeight: '300',
    },
    checkbox: {
        "& svg": {
            fill: lighterGrey
        }
    },
    checked: {
        "& svg": {
            fill: primary,
            width: "2.2rem",
            height: "2.2rem"
        }
    },
    error: {
        "& svg": {
            fill: red
        }
    }
});
