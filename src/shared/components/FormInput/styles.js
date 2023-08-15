import { makeStyles } from "@material-ui/styles";
import { darkRed, disabledColor, red, textDisabled } from "theme/variables";

export const useStyles = makeStyles({
    inputDisabled: {
        border: `1px solid ${textDisabled}`,
        backgroundColor: disabledColor,
        color: textDisabled,
        "&:hover": {
            backgroundColor: disabledColor
        },
        "& input": {
            color: textDisabled,
        }
    },
    inputError: {
        border: `1px solid ${red}`,
        "&:hover": {
            backgroundColor: darkRed
        }
    }
});
