import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';

import { Button, Dialog, DialogTitle, DialogContent, DialogActions, Grid, IconButton, Typography } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';

import incardLogo from '../../../assets/images/logo.svg';
import useStyle from './DialogStyles';

function ShowDialog({ init }) {
    const [open, setOpen] = useState(init);
    const { push } = useHistory();
    const classes = useStyle();

    const handleClose = () => {
        setOpen(false);
        push('/auth/login');
    };

    const proceedOnboarding = () => {
        setOpen(false);
        push('/admin/mobile-verification');
    };

    return (
        <Dialog
            open={open}
            classes={{
                root: classes.backdrop,
                paper: classes.dialog,
                paperWidthSm: classes.dialogWidth,
                paperScrollPaper: classes.dialogHeight
            }}
        >
            <Grid container className={classes.dialogHeader}>
                <Grid item className={classes.dialogTitle}>
                    <DialogTitle>
                        <img src={incardLogo} alt="Incard Logo" />
                        <Typography>Confirm your e-mail address</Typography>
                    </DialogTitle>
                </Grid>

                <Grid item>
                    <IconButton size="small" aria-label="close" classes={{ root: classes.iconButton }} onClick={handleClose}>
                        <CloseIcon />
                    </IconButton>
                </Grid>
            </Grid>

            <DialogContent classes={{ root: classes.dialogContent }}>
                <Typography classes={{ gutterBottom: classes.textMargin }} gutterBottom>
                    An email has been sent to the email address you have entered.
                </Typography>
                <Typography>You will need to verify your email by clicking on the link that has been sent to you before being able to transfer funds or create cards.</Typography>
            </DialogContent>
            <DialogActions>
                <Button variant="contained" classes={{ root: classes.continueButton }} onClick={proceedOnboarding}>
                    Continue onboarding
                </Button>
            </DialogActions>
        </Dialog>
    );
}
ShowDialog.propTypes = { init: PropTypes.bool.isRequired };
export default ShowDialog;
