import React from "react";
import { func } from "prop-types";
import { Typography, Button } from "@material-ui/core";
import logo from "assets/images/logo.png";
import { useStyles } from "./styles";

const EmailSent = ({ handleSubmit }) => {
    const styles = useStyles();

    return (
        <div className={styles.container}>
            <img className={styles.logo} src={logo} alt="logo" />
            <Typography className={styles.title}>Email sent</Typography>
            <Typography className={styles.subtitle}>
                Please check your email address, we sent a link to reset your password. If you did
                not receive an email, you can trigger a new email by clicking the button below.
            </Typography>
            <Button onClick={handleSubmit} variant="outlined">
                Resend email
            </Button>
        </div>
    );
};

export default EmailSent;

EmailSent.propTypes = {
    handleSubmit: func.isRequired
};
