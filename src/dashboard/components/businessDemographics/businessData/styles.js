import { makeStyles } from "@material-ui/styles";

export const useStyles = makeStyles({
    container: {
        paddingTop: "8rem",
        "@media (max-width: 1200px)": {
            paddingTop: 0
        }
    },
    formWrapper: {
        padding: "0 0 0 25%",
        maxWidth: "47rem",
        "@media (max-width: 1200px)": {
            width: "85%",
            boxSizing: "border-box",
            maxWidth: "100%",
            padding: "0 0 0 18%"
        },
        "@media (max-width: 678px)": {
            width: "100%",
            maxWidth: "100%",
            padding: "0 1.5rem 0 2.5rem"
        }
    },
    continueBtn: {
        marginTop: '1rem'
    },
    formField: {
        marginBottom: ".3rem"
    }
});
