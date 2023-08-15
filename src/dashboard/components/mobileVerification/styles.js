import { makeStyles } from "@material-ui/core/styles";
import { darkRed, primary } from "theme/variables";

export const useStyles = makeStyles({
    container: {
        boxSizing: "border-box",
        paddingTop: "15rem",
        "@media (max-width: 1200px)": {
            paddingTop: 0
        }
    },
    formWrapper: {
        width: "100%",
        maxWidth: "86rem",
        padding: "0 15rem 0 20%",
        boxSizing: "border-box",
        "@media (max-width: 1200px)": {
            margin: "0 auto",
            width: "69%",
            padding: "0 0 0 2.5rem"
        },
        "@media (max-width: 678px)": {
            margin: "0 auto",
            width: "100%",
            padding: "0 1.5rem 0 2.5rem"
        }
    },
    continueButton: {
        minWidth: "16rem",
        maxHeight: "4.8rem"
    },
    title: {
        fontSize: "3.3rem",
        fontWeight: "600",
        marginBottom: "1rem"
    },
    otp: {
        margin: ".7rem 0 .7rem 0"
    },
    label: {
        margin: "0 0 .4rem .3rem"
    },
    doneIcon: {
        fill: primary
    },
    input: {
        marginBottom: "5rem"
    },
    button: {
        minWidth: "16rem",
        margin: "0 2rem 0 0"
    },
    countdownLabel: {
        marginRight: ".8rem"
    },
    countdown: {
        color: primary
    },
    countdownWrapper: {
        display: "flex",
        alignItems: "center",
        marginTop: "2.5rem"
    },
    inputError: {
        backgroundColor: darkRed,
        "&:hover": {
            backgroundColor: darkRed
        }
    },
    buttonWrapper: {
        display: "flex",
        marginTop: ".7rem"
    },
    subtitle: {
        marginBottom: "2.3rem",
        fontWeight: '300',
        fontSize: "1.6rem"
    },
    sendBtn: {
        margin: ".8rem 0"
    },
    inputWrapper: {
        display: "flex",
        alignItems: "center"
    },
    phoneInput: {
        marginLeft: "2rem"
    }
});
