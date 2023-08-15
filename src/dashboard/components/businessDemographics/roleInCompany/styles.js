import { makeStyles } from '@material-ui/styles';

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
            padding: '0 0 0 18%'
        },
        "@media (max-width: 678px)": {
            padding: "0 1.5rem 0 2.5rem"
        }
    },
    radio: {
        maxWidth: '26rem',
        marginTop: '2.5rem',
        '&:last-child': {
            marginTop: '1.6rem'
        }
    },
    rulesWrapper: {
        paddingTop: '1rem',
        marginBottom: '1rem'
    },
    continueBtn: {
        margin: '1rem 0 2.5rem 0'
    }
});
