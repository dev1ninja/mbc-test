import { Box, Typography } from "@material-ui/core";
import classNames from "classnames";
import SvgIcon from "shared/components/SvgIcon";
import infoIcon from "assets/images/info.svg";
import { bool, func, node, string } from "prop-types";
import React from "react";
import { useStyles } from "./styles";

const FieldTemplate = ({ errorMessage, className, label, disabled, children, onInfoIconClick }) => {
    const styles = useStyles();

    return (
        <Box className={classNames([styles.inputWrapper, className])}>
            <Box className={styles.headerWrapper}>
                {label && (
                    <Typography
                        className={classNames([styles.label, { [styles.labelDisabled]: disabled }])}
                    >
                        {label}
                    </Typography>
                )}
                {onInfoIconClick && (
                    <Box className={styles.infoIcon} onClick={onInfoIconClick}>
                        <SvgIcon iconPath={infoIcon} />
                    </Box>
                )}
            </Box>
            {children}
            <Typography className={styles.errorMessage}>{errorMessage}</Typography>
        </Box>
    );
};

export default FieldTemplate;

FieldTemplate.defaultProps = {
    errorMessage: "",
    className: "",
    label: "",
    disabled: false
};

FieldTemplate.propTypes = {
    errorMessage: string,
    className: string,
    label: string,
    disabled: bool,
    onInfoIconClick: func,
    children: node.isRequired
};
