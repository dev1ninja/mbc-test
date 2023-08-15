import * as React from "react";
import {
    Button,
    Dialog,
    DialogContent,
    DialogActions,
    DialogTitle,
    Slide,
    IconButton,
    Grid
} from "@material-ui/core";
import PropTypes from "prop-types";
import CloseIcon from "@material-ui/icons/Close";
import "./AlertDialog.scss";

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function AlertDialogSlide({ open, handleClose, content, onSubmit }) {
    const onClick = () => {
        onSubmit();
        handleClose();
    };

    return (
        <div>
            <Dialog
                open={open}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                aria-describedby="alert-dialog-slide-description"
                className="alertdialog"
            >
                <DialogTitle>
                    <IconButton aria-label="close" className="close" onClick={handleClose}>
                        <CloseIcon />
                    </IconButton>
                </DialogTitle>
                <DialogContent>
                    <h3>{content}</h3>
                </DialogContent>
                <DialogActions>
                    <Grid container spacing={2}>
                        <Grid item xs={6}>
                            <Button variant="outlined" color="primary" onClick={handleClose}>
                                No
                            </Button>
                        </Grid>
                        <Grid item xs={6}>
                            <Button variant="contained" color="primary" onClick={onClick}>
                                Yes
                            </Button>
                        </Grid>
                    </Grid>
                </DialogActions>
            </Dialog>
        </div>
    );
}

AlertDialogSlide.propTypes = {
    open: PropTypes.bool.isRequired,
    handleClose: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
    content: PropTypes.string.isRequired
};
