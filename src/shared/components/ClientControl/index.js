import React from "react";
import { string, func, bool } from "prop-types";
import { Box } from "@material-ui/core";
import classNames from "classnames";
import trashIcon from "assets/images/trash-icon.svg";
import plus from "assets/images/plus.svg";
import edit from "assets/images/edit.svg";
import SvgIcon from "../SvgIcon";

import { useStyles } from "./styles";

const ClientControl = ({ title, subtitle, onEdit, className, onDelete, onAdd, isActive }) => {
    const styles = useStyles();

    return (
        <Box
            className={classNames([className, styles.control], {
                [styles.isActiveControlDescription]: isActive
            })}
        >
            <Box className={styles.controlDescription}>
                <Box className={styles.controlSelect}>
                    <Box className={styles.controlTitle}>{title}</Box>
                    <Box className={styles.controlSubtitle}>{subtitle}</Box>
                </Box>
                <Box className={styles.controlButtonsEnter}>
                    {onEdit && (
                        <Box onClick={onEdit} onKeyDown={onEdit} tabIndex={0} className={styles.controlButtonIcon}>
                            <SvgIcon className={styles.controlIcon} iconPath={edit} alt="edit" />
                        </Box>
                    )}
                    {onAdd && (
                        <Box onClick={onAdd} onKeyDown={onAdd} tabIndex={0} className={styles.controlButtonIcon}>
                            <SvgIcon className={styles.controlIcon} iconPath={plus} alt="plus" />
                        </Box>
                    )}
                    {onDelete && (
                        <Box onClick={onDelete} onKeyDown={onDelete} tabIndex={0} className={styles.controlButtonIcon}>
                            <SvgIcon
                                className={styles.controlIcon}
                                iconPath={trashIcon}
                                alt="plus"
                            />
                        </Box>
                    )}
                </Box>
            </Box>
        </Box>
    );
};

export default ClientControl;

ClientControl.propTypes = {
    title: string.isRequired,
    subtitle: string,
    onEdit: func,
    className: string,
    onDelete: func,
    onAdd: func,
    isActive: bool
};
