import React from "react";
import { Box, Typography } from "@material-ui/core";
import { bool, func, string } from "prop-types";
import classNames from "classnames";

import { useStyles } from "./styles";

const BusinessTypeRadio = ({ title, subtitle, checked, onChange, className }) => {
    const styles = useStyles();

    return (
        <Box onClick={onChange} onKeyDown={onChange} className={classNames([className, styles.container])} tabIndex={0}>
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
                />
            </label>
            <Box className={styles.contentWrapper}>
                <Typography className={styles.title}>{title}</Typography>
                <Typography className={styles.subtitle}>{subtitle}</Typography>
            </Box>
        </Box>
    );
};

export default BusinessTypeRadio;

BusinessTypeRadio.defaultProps = {
    title: "",
    subtitle: "",
    className: ""
};

BusinessTypeRadio.propTypes = {
    title: string,
    subtitle: string,
    className: string,
    checked: bool.isRequired,
    onChange: func.isRequired
};
