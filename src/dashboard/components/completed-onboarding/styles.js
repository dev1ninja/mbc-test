import { makeStyles } from "@material-ui/core/styles";
import breakpoint from "../../../shared/constants/breakpoint";
import BgImage from "../../../assets/images/finalScreenBg1.svg";

export default makeStyles({
    root: {
        boxSizing: "border-box",
        background: `linear-gradient(0deg, rgba(0, 0, 0, 0.25), rgba(0, 0, 0, 0.25)), url(${BgImage})`,
        color: "#fff",
        textAlign: "center",
        padding: "2rem"
    },
    heading: {
        fontSize: "7.5rem",
        lineHeight: "7.8rem"
    },
    nextStep: {
        fontSize: "2.1rem",
        lineHeight: "2.7rem"
    },
    linksToAppStore: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        maxWidth: "28rem",
        margin: "3rem auto"
    },
    detail: {
        maxWidth: "63rem",
        margin: "auto"
    },

    footerHeading: {
        fontSize: "2.5rem",
        fontWeight: "500"
    },
    socialIcons: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        maxWidth: "120rem",
        margin: "auto",
        flexWrap: "wrap",
        [breakpoint.down("lg")]: {
            justifyContent: "center"
        }
    },
    icon: {
        width: "14rem"
    }
});
