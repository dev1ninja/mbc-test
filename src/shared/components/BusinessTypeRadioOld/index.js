import React from "react";
import { Box, Radio, Typography } from "@material-ui/core";
import { bool, func, string } from "prop-types";
import classNames from "classnames";

import { useStyles } from "./styles";

const BusinessTypeRadio = ({ title, subtitle, checked, onChange, className }) => {
    const styles = useStyles();

    return (
        <Box
            onClick={onChange}
            className={classNames([className, styles.container, { [styles.active]: checked }])}
        >
            <Box className={styles.contentWrapper}>
                <Typography className={styles.title}>{title}</Typography>
                <Typography className={styles.subtitle}>{subtitle}</Typography>
            </Box>
            <Radio
                className={classNames([styles.radio, { [styles.checked]: checked }])}
                checked={checked}
                onChange={onChange}
            />
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

