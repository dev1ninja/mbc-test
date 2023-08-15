import { makeStyles } from "@material-ui/core/styles";
import breakpoint from "../../../shared/constants/breakpoint";

export default makeStyles({
    slider: {
        color: "hsla(233, 5%, 37%, 1)",
        marginBottom: "8rem",
        [breakpoint.down("xl")]: {
            width: "90%"
        }
    },
    sliderRail: {
        height: "1.2rem",
        borderRadius: "4rem"
    },
    sliderTrack: {
        height: "1.2rem",
        borderRadius: "4rem",
        backgroundColor: "hsla(180, 100%, 36%, 1)"
    },
    thumb: {
        width: "3rem",
        height: "3rem",
        background: "#FCFCFC",
        border: ".2rem solid #454545",
        marginTop: "-.9rem",
        marginLeft: "-.7rem",
        "&::before": {
            content: '"|"',
            position: "absolute",
            top: "10%",
            left: "40%",
            color: "hsla(0, 0%, 27%, 1)"
        }
    },
    mark: {
        width: ".4rem",
        height: ".4rem",
        top: "60%",
        left: "calc(50% - .4rem/2 + 14.95rem)",
        background: "#9092A0"
    },
    markActive: {
        backgroundColor: "#fff"
    },
    markLabel: {
        maxWidth: "10rem",
        color: "#fff",
        fontSize: "1.6rem",
        whiteSpace: "normal",
        marginTop: "1.1rem",
        [breakpoint.down("sm")]: {
            maxWidth: "8rem",
            fontSize: "12rem"
        }
    }
});
