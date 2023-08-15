import React from "react";
import { node, func, bool } from "prop-types";
import { Button, ClickAwayListener } from "@material-ui/core";
import Portal from "shared/components/Portal";
import SvgIcon from "shared/components/SvgIcon";
import infoIcon from "assets/images/info.svg";

import { useStyles } from "./styles";

const InfoModal = ({ isShown, children, onClose }) => {
    const styles = useStyles();
    return (
        <>
            {isShown && (
                <Portal>
                    <div className={styles.container}>
                        <ClickAwayListener onClickAway={onClose}>
                            <div className={styles.modalContent}>
                                <div className={styles.infoIconWrapper}>
                                    <SvgIcon className={styles.infoIcon} iconPath={infoIcon} />
                                </div>
                                <div className={styles.contentWrapper}>{children}</div>
                                <div className={styles.buttonWrapper}>
                                    <Button
                                        className={styles.button}
                                        onClick={onClose}
                                        variant="contained"
                                    >
                                        Close
                                    </Button>
                                </div>
                            </div>
                        </ClickAwayListener>
                    </div>
                </Portal>
            )}
        </>
    );
};

export default InfoModal;

InfoModal.propTypes = {
    isShown: bool.isRequired,
    children: node.isRequired,
    onClose: func.isRequired
};
