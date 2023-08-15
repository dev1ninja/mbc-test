import { makeStyles } from "@material-ui/core/styles";
import breakpoint from "../../../shared/constants/breakpoint";

export default makeStyles({
    staticForm: {
        height: "100vh",
        position: "fixed",
        overflowY: "auto",
        [breakpoint.short("md")]: {
            position: "initial"
        }
    },
    heading: {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between"
    },
    radioButton: {
        color: "#fff"
    },
    checkedRadio: {
        color: "#00b9b9"
    },
    scrollableForm: {
        boxSizing: "border-box",
        width: "100%",
        overflowX: "hidden",
        overflowY: "auto",
        background: "#23252B",
        borderRadius: ".4rem",
        padding: "3rem",
        [breakpoint.down("xl")]: {
            minWidth: "80%",
            width: "90%"
        },
        [breakpoint.down("sm")]: {
            padding: "3rem 1rem 3rem 2rem"
        },

        // custom scrollbar for Chrome, Safari, Opera
        "&::-webkit-scrollbar": {
            width: "1.1rem",
            height: "24.6rem"
        },
        "&::-webkit-scrollbar-track": {
            boxShadow: "inset 0 0 .6rem rgba(0,0,0,0.00)"
        },
        "&::-webkit-scrollbar-thumb": {
            backgroundColor: "hsla(225, 10%, 27%, 1)",
            borderRadius: ".4rem"
        }
    },
    listContainer: {
        width: "100%"
    },
    divider: {
        backgroundColor: "#3E414B"
    },
    listItemActions: {
        paddingRight: "0"
    },
    radioGroup: {
        flexDirection: "row",
        justifyContent: "flex-end"
    },
    listAction: {
        // overriding default styles of Mui
        top: "0",
        right: "0",
        position: "relative",
        transform: "none"
    },
    questionText: {
        color: "#fff"
    },
    actionLabel: {
        color: "#fff"
    },
    activeLabel: {
        color: "#00b9b9"
    },
    answerDescription: {
        width: "100% !important",
        boxSizing: "border-box",
        background: "#1B1C21 !important",
        margin: "1rem"
    }
});
