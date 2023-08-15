import { makeStyles } from "@material-ui/core/styles";

export default makeStyles({
    formGroup: {
        width: "80%",
        maxWidth: "90%"
    },
    labelPosition: {
        marginRight: "0",
        justifyContent: "space-between",
        border: ".2rem solid #3C3E45", // var(--form-border)
        borderRadius: ".4rem",
        margin: ".8rem 0",
        padding: ".3rem 1rem",
        background: "#15161A" // var(--form-background)
    },

    selectedOption: {
        border: ".2rem solid #0CF8E9"
    },

    formLabel: {
        color: "#fff" // var(--color-dark-contrast)
    },
    checkbox: {
        color: "#5A5B63" // var(--color-dark-shade)
    },
    checkboxChecked: {
        color: "#00b9b9" // var(----primary-button)
    }
});
