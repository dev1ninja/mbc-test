import React from "react";
import { bool, func, string } from "prop-types";
import FormInput from "shared/components/FormInput";
import { Button, Typography } from "@material-ui/core";
import logo from "assets/images/logo.png";
import { useStyles } from "./styles";

const ForgotPassword = ({ emailError, email, handleChange, handleSubmit }) => {
    const styles = useStyles();

    return (
        <form className={styles.container}>
            <img className={styles.logo} src={logo} alt="logo" />
            <Typography className={styles.title}>Forgot your password?</Typography>
            <Typography className={styles.subtitle}>
                Forgot your password? Enter the email address you usually use to login to your
                incard account.
            </Typography>
            <FormInput
                label="Email address"
                className={styles.formField}
                name="email"
                hasError={Boolean(emailError)}
                errorMessage={emailError}
                value={email}
                onChange={handleChange}
            />
            <Button
                className={styles.sendBtn}
                variant="contained"
                onClick={handleSubmit}
            >
                Send
            </Button>
        </form>
    );
};

export default ForgotPassword;

ForgotPassword.propTypes = {
    emailError: bool.isRequired,
    email: string.isRequired,
    handleChange: func.isRequired,
    handleSubmit: func.isRequired
};
