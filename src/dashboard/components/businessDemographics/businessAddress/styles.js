import { makeStyles } from "@material-ui/styles";

export const useStyles = makeStyles({
    container: {
        paddingTop: "8rem",
        "@media (max-width: 1200px)": {
            paddingTop: 0
        }
    },
    formWrapper: {
        padding: "0 0 0 25.3%",
        maxWidth: "47rem",
        "@media (max-width: 1200px)": {
            padding: '0 0 0 18%',
            boxSizing: 'border-box',
            width: '100%',
            maxWidth: "84%",
        },
        "@media (max-width: 678px)": {
            width: "100%",
            maxWidth: '100%',
            padding: "0 1.5rem 0 2.5rem"
        }
    },
    submitBtn: {
        marginTop: '1rem'
    },
    modalText: {
        marginTop: '2rem',
        fontSize: '1.6rem',
        fontWeight: '300'
    },
    checkbox: {
        justifyContent: 'flex-end',
        fontSize: '1.2rem',
        fontWeight: '300',
        marginBottom: '2.5rem'
    },
    formField: {
        marginBottom: ".3rem"
    }
});
