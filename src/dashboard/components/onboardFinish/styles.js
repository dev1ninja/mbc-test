import { makeStyles } from "@material-ui/styles";
import { primary, white } from "theme/variables";

export const useStyles = makeStyles({
    container: {
        display: 'flex',
        flexDirection: 'column',
        boxSizing: 'border-box',
        textAlign: 'center',
        alignItems: 'center',
        width: '100%',
        height: '100%',
    },
    logo: {
        width: '13rem',
        margin: '10rem 0 4.5rem 0',
        "@media (max-width: 1200px)": {
            margin: '2rem 0 2.5rem 0',
        },
    },
    codeContainer: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minWidth: '235px',
        minHeight: '235px',
        backgroundColor: white,
        borderRadius: '1.6rem',
        padding: '20px',
        marginBottom: '8.5rem',
        "@media (max-width: 1200px)": {
            marginBottom: '3rem',
        },
    },
    title: {
        fontSize: '2.2rem',
        marginBottom: '2rem',
        fontWeight: '600',
        "@media (max-width: 1200px)": {
            fontSize: '1.6rem',
        },
    },
    subtitle: {
        fontSize: '3.2rem',
        fontWeight: '500',
        marginBottom: '7rem',
        "@media (max-width: 1200px)": {
            fontSize: '2.6rem',
            marginBottom: '3rem'
        },
        "@media (max-width: 678px)": {
            fontSize: '2rem',
        }
    },
    step: {
        backgroundColor: primary,
        minWidth: '2.4rem',
        minHeight: '2.4rem',
        padding: '0',
        borderRadius: '50%',
    },
    stepsContainer: {
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        boxSizing: 'border-box',
        flexDirection: 'column',
        justifyContent: 'center',
        maxWidth: '94rem',
        padding: '0 2rem'
    },
    footer: {
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexWrap: 'wrap',
    },
    icon: {
        display: 'block',
        padding: '0 1.3rem',
        cursor: 'pointer',
        "@media (max-width: 678px)": {
            maxHeight: '13rem',
        }
    },
    stepper: {
        width: '100%',
        maxWidth: '83rem',
        backgroundColor: 'transparent',
        padding: '0 2rem'
    },
    labelsContainer: {
        width: '100%',
        display: 'flex',
        justifyContent: 'space-between'
    },
    labels: {
        marginTop: '4.5rem',
        fontSize: '2.2rem',
        fontWeight: '600',
        paddingRight: '1rem',
        "@media (max-width: 1200px)": {
            fontSize: '1.6rem',
            wordBreak: 'break-word',
            marginTop: '2rem'
        },
        "@media (max-width: 678px)": {
            fontSize: '1.3rem',
        }
    },
    connector: {
        width: '100%',
        backgroundColor: primary,
        height: '.4rem'
    }
})
