import { makeStyles } from "@material-ui/core/styles";
import { white } from "theme/variables";

const useStyle = makeStyles({
    formInput: {
        display: "flex",
        borderRadius: ".4rem",
        border: "1px solid #3C3E45",
        padding: ".5rem .6rem",
        "& :hover": {
            cursor: "pointer !important"
        },

        color: "rgba(255, 255, 255,1)"
    },
    error: {
        background: "rgba(221, 66, 90, 0.15)",
        border: "1px solid rgba(221, 66, 90, 1) !important"
    },

    inputFocused: {
        border: "1px solid #0cf8e9 !important"
    },

    formInputText: {
        padding: "1.2rem .6rem"
    },

    hidePasswordIcon: {
        "& svg": {
            color: white,
            width: "2.2rem",
            height: "2.2rem"
        }
    }
});

export default useStyle;
