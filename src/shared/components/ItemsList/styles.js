import { makeStyles } from '@material-ui/styles';

export const useStyles = makeStyles({
    container: {
        marginTop: '.5rem'
    },
    title: {
        fontWeight: 500,
    },
    list: {
        margin: '1.6rem 0 0 0',
        padding: '0 0 0 2.5rem',
    },
    infoItem: {
        display: 'flex',
        alignItems: 'center'
    },
    infoIcon: {
        marginLeft: '1rem',
        cursor: 'pointer'
    },
    listItem: {
        margin: '.5rem 0',
        lineHeight: '2.4rem',
        '&::marker': {
            fontSize: '1.2rem',
        }
    }
})
