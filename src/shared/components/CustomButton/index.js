import React from "react";
import { Button, CircularProgress, Box } from "@material-ui/core";
import classNames from "classnames";
import { any, bool, func, string } from "prop-types";
import { useStyles } from "./styles";

const CustomButton = ({ onClick, type, isLoading, className, variant, children, disabled }) => {
    const styles = useStyles();

    return (
        <Button
            disabled={isLoading || disabled}
            onClick={onClick}
            type={type}
            className={className}
            variant={variant}
        >
            <Box className={styles.contentBox}>
                {isLoading && <CircularProgress size={20} />}
                <div className={classNames([styles.text, { [styles.textHidden]: isLoading }])}>
                    <span>{children}</span>
                    <div className={styles.loadingText}>Loading</div>
                </div>
            </Box>
        </Button>
    );
};

export default CustomButton;

CustomButton.defaultProps = {
    onClick: () => {},
    type: "button",
    isLoading: false,
    className: "",
    variant: "contained",
    disabled: false
};

CustomButton.propTypes = {
    onClick: func,
    type: string,
    isLoading: bool,
    className: string,
    variant: string,
    children: any.isRequired,
    disabled: bool
};
