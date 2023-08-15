import React from "react";
import { Typography } from "@material-ui/core";
import { string } from "prop-types";

import { useStyles } from './styles';

const DEFAULT_ERROR_MESSAGE = "Something wrong.";

const ErrorComponent = ({ message }) => {
    const styles = useStyles();
    return <Typography className={styles.error}>{message}</Typography>;
};

ErrorComponent.propTypes = {
    message: string,
}

const parseErrorResponse = error => {
    const message = error.response?.data?.message;
    return message || DEFAULT_ERROR_MESSAGE;
};

export { DEFAULT_ERROR_MESSAGE, ErrorComponent, parseErrorResponse };
