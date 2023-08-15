import { makeStyles, alpha } from "@material-ui/core/styles";
import { red, white } from "theme/variables";

export const useStyles = makeStyles({
    container: {
        display: "flex",
        flexDirection: "column"
    },
    label: {
        margin: "0 0 .4rem .3rem",
        fontWeight: '300'
    },
    datePicker: {
        width: "100%",
        boxSizing: "border-box",
        position: "relative",
        border: `1px solid ${white}`,
        backgroundColor: alpha("#14142B", ".5"),
        color: white,
        height: "4.8rem",
        borderRadius: ".4rem",
        fontSize: "1.4rem",
        fontFamily: "Poppins",
        paddingLeft: "1rem",
        outline: "none",
        "&::placeholder": {
            color: white,
            opacity: 0.4,
            fontSize: "1.6rem"
        },
        "&:hover": {
            backgroundColor: alpha("#14142B", ".25")
        }
    },
    errorMessage: {
        color: red,
        margin: ".5rem 0 0 .3rem",
        fontSize: "1.2rem",
        minHeight: '1.8rem'
    },
    inputError: {
        border: `1px solid ${red}`
    },
    anchor: {
        position: "relative"
    },
    caret: {
        cursor: "pointer",
        position: "absolute",
        fontSize: "3.3rem",
        top: "0.8rem",
        right: ".7rem"
    }
});
