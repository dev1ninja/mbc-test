import { makeStyles } from '@material-ui/styles';
import { grey, lightGreyBackground, primary, white } from 'theme/variables';

export const useStyles = makeStyles({
    container: {
        padding: '1.2rem 1.2rem 1.2rem 1.5rem',
        display: "flex",
        alignItems: "center",
        marginBottom: '.5rem',
        cursor: "pointer",
        borderRadius: ".4rem",
        backgroundColor: lightGreyBackground,
    },
    radioHidden: {
        display: 'none'
    },
    radio: {
        width: '2.4rem',
        boxSizing: 'border-box',
        marginRight: '1rem',
        cursor: 'pointer',
        pointerEvents: 'none',
        height: '2.4rem',
        transition: 'background-color .2s ease-in-out',
        borderRadius: '50%',
        border: `2px solid ${grey}`,
    },
    radioActive: {
        backgroundColor: primary,
        border: 'none',
        position: 'relative',
        "&:before": {
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            borderRadius: '50%',
            content: '""',
            zIndex: '100000',
            backgroundColor: white,
            margin: 'auto',
            width: '1.2rem',
            height: '1.2rem'
        }
    },
});
