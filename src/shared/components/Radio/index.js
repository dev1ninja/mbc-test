import React from "react";
import { Box, Typography } from "@material-ui/core";
import { bool, func, string } from "prop-types";
import classNames from "classnames";
import { onPressKeyHandler } from "shared/helpers/utils";

import { useStyles } from "./styles";

const Radio = ({ label, onChange, checked, className }) => {
    const styles = useStyles();

    const onKey = (e) =>{
        const verificationKey = onPressKeyHandler(e);
        if(verificationKey)   {
            onChange();
        }
    }
    return (
        <Box onClick={onChange} onKeyDown={onKey} className={classNames([className, styles.container])} tabIndex={0}>
            <label
                htmlFor="radio"
                className={classNames([
                    styles.radio,
                    { [styles.radioActive]: checked }
                ])}
            >
                <input
                    id="radio"
                    type="radio"
                    className={styles.radioHidden}
                    onChange={onChange}
                    checked={checked}
                />
            </label>
            <Box className={styles.contentWrapper}>
                <Typography className={styles.label}>{label}</Typography>
            </Box>
        </Box>
    );
};

export default Radio;

Radio.propTypes = {
    label: string.isRequired,
    onChange: func.isRequired,
    checked: bool.isRequired,
    className: string
};
