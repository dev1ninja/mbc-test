import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles({
    loading: {
        opacity: 0,
        marginTop: "1rem",
        position: "absolute",
        transition: "opacity .2s ease-in-out"
    },
    loadingShow: {
        opacity: 1
    },
    contentBox: {
        display: 'flex',
        alignItems: 'center'
    },
    text: {
        marginTop: "3.5rem",
        transition: "margin .2s ease-in-out"
    },
    textHidden: {
        marginTop: "-3.5rem"
    },
    loadingText: {
        marginLeft: '1rem',
        paddingTop: ".5rem"
    }
});
