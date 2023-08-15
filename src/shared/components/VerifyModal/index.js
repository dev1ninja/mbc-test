import React from "react";
import { func, string } from "prop-types";
import { Typography, Button } from "@material-ui/core";
import SvgIcon from "shared/components/SvgIcon";
import Portal from "shared/components/Portal";
import CloseIcon from "@material-ui/icons/Close";
import successIcon from "assets/images/success.svg";
import { useStyles } from "./styles";

const VerifyModal = ({ onClose, title, buttonText, onButtonClick }) => {
    const styles = useStyles();

    return (
        <Portal>
            <div className={styles.container}>
                <div className={styles.modalContent}>
                    <CloseIcon onClick={onClose} className={styles.closeIcon} />
                    <SvgIcon className={styles.successIcon} iconPath={successIcon} />
                    <Typography className={styles.title}>{title}</Typography>
                    <Button onClick={onButtonClick} className={styles.button} variant="contained">
                        {buttonText}
                    </Button>
                </div>
            </div>
        </Portal>
    );
};

export default VerifyModal;

VerifyModal.defaultProps = {
    title: "Email verified",
    buttonText: "Continue"
};

VerifyModal.propTypes = {
    onClose: func.isRequired,
    onButtonClick: func.isRequired,
    buttonText: string,
    title: string
};
