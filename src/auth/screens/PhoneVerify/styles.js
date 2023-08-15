import { makeStyles } from "@material-ui/core/styles";
import { primary } from "theme/variables";

export const useStyles = makeStyles({
    wrapper: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        marginTop: '0',
        "@media (max-width: 1200px)": {
            marginTop: "6rem"
        },
    },
    link: {
        color: primary,
        marginTop: "4.5rem",
        textDecoration: "underline",
        cursor: "pointer"
    }
});
