import { makeStyles } from "@material-ui/core/styles";

export default makeStyles({
    labelPosition: {
        marginRight: "0",
        justifyContent: "space-between",
        border: ".2rem solid #3C3E45", // var(--form-border)
        borderRadius: ".4rem .4rem 0 0",
        margin: ".8rem 0 0",
        padding: ".3rem 1rem",
        background: "#15161A" // var(--form-background)
    },
    textInput: {
        boxSizing: "border-box",
        border: ".2rem solid #3C3E45", // var(--form-border)
        borderTop: "none",
        borderRadius: "0 0 .4rem .4rem",

        background: "none",
        color: "#fff",
        padding: "1.2rem 1rem",

        fontSize: "1.6rem",

        "&:focus": {
            outline: "transparent"
        }
    },
    disableInput: { cursor: "not-allowed" },
    outlineInput: {
        border: ".2rem solid #0CF8E9",
        borderTop: "0 solid #3C3E45"
    },

    selectedOption: {
        border: ".2rem solid #0CF8E9",
        borderBottomColor: "#3C3E45"
    }
});
