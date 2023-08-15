import { makeStyles } from "@material-ui/styles";
import { red } from "theme/variables";

export const useStyles = makeStyles({
    container: {
        paddingTop: '8rem',
        "@media (max-width: 1200px)": {
            paddingTop: 0
        }
    },
    formWrapper: {
        padding: '0 0 0 25%',
        maxWidth: '47rem',
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
    button: {
        marginTop: '1rem'
    },
    rulesWrapper: {
        maxWidth: '32rem',
        paddingTop: '1rem',
        marginBottom: '1rem'
    },
    error: {
        fontSize: '1.2rem',
        color: red,
    },
    modalWrapper: {
        paddingTop: '1.2rem',
        marginBottom : '2rem'
    },
})
