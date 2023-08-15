import { makeStyles } from "@material-ui/core/styles";
import { primary } from "theme/variables";

export const useStyles = makeStyles({
    title: {
        fontSize: "3.3rem",
        fontWeight: "600",
        marginBottom: "1rem"
    },
    container: {
        paddingTop: "15rem",
        "@media (max-width: 1200px)": {
            paddingTop: 0
        }
    },
    subtitle: {
        fontSize: "1.6rem",
        fontWeight: '300',
        marginBottom: "2.3rem"
    },
    formContainer: {
        width: "100%",
        maxWidth: "76rem",
        padding: "0 5rem 0 25%",
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
    formField: {
        width: "100%",
        "@media (max-width: 678px)": {
            width: "100%"
        }
    },
    fullWidthField: {
        width: "100%",
        margin: "0 0 .2rem 0"
    },
    postcodeContainer: {
        width: "100%",
        position: "relative"
    },
    postcodeAddressWrapper: {
        height: "30.5rem",
        overflow: "auto"
    },
    searchPostcode: {
        marginBottom: '.7rem',
    },
    postcodeDropdown: {
        position: "absolute",
        marginTop: "-3rem",
        width: "100%",
        backgroundColor: "#292932",
        borderRadius: "4px",
        maxHeight: "30.5rem",
        overflow: "hidden",
        zIndex: "999"
    },
    address: {
        padding: "1.6rem",
        cursor: "pointer",
        "&:hover": {
            backgroundColor: "#3E3E46"
        },
        "&:focus": {
            backgroundColor: "#3E3E46"
        }
    },
    postCodeWrapper: {
        display: "flex",
        alignItems: "center",
        width: "100%"
    },
    manually: {
        color: primary,
        width: "fit-content",
        cursor: "pointer",
        marginBottom: "2rem"
    },
    cityWrapper: {
        display: "flex",
        alignItems: "center",
        flexWrap: "wrap",
        justifyContent: "space-between",
        width: "100%"
    },
    continueBtn: {
        marginTop: '1rem',
    },
    findAddressBtn: {
        margin: "0 0 0 1rem",
        whiteSpace: "nowrap",
        minWidth: "10rem",
        padding: ".8rem 2.5rem"
    },
});
