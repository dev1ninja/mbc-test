import React, { useState } from "react";
import { useFormik } from "formik";
import { useHistory } from "react-router-dom";
import { Button } from "@material-ui/core";
import { resetPassword } from "auth/services/AuthService";
import { PASSWORD } from "shared/helpers/validations/PatternConstants";
import DefaultLoginTemplate from "shared/templates/DefaultLoginTemplate";
import ValidationInput from "shared/components/ValidationInput";
import FormInput from "shared/components/FormInput";

import { useStyles } from "./styles";

const validate = values => {
    const errors = {};
    const isPasswordValid = PASSWORD.test(values.password);
    if (!values.password) {
        errors.password = "Required";
    }
    if (!isPasswordValid) {
        errors.password = "Required";
    }
    if (!values.confirmPassword) {
        errors.confirmPassword = "Required";
    }
    if (values.password !== values.confirmPassword) {
        errors.confirmPassword = "Passwords is not equal";
    }
    return errors;
};

const ResetPasswordForm = () => {
    const [isAllSet, setIsAllSet] = useState(false);
    const history = useHistory();
    const styles = useStyles();

    const onSubmit = async values => {
        const resetToken = history.location.state?.resetToken;
        const sessionResetToken = sessionStorage.getItem("resetToken");
        try {
            await resetPassword(values.password, resetToken || sessionResetToken);
            setIsAllSet(true);
            return null;
        } catch (err) {
            return err;
        }
    };

    const formik = useFormik({
        validateOnMount: true,
        initialErrors: {
            password: "Required",
            confirmPassword: "Required"
        },
        initialValues: {
            password: "",
            confirmPassword: ""
        },
        onSubmit,
        validate
    });

    const handleLogin = () => {
        history.push("/auth/login");
    };

    const { values, handleSubmit, handleChange, errors, touched } = formik;

    const handleInputChange = e => {
        handleChange(e);
    };

    const title = !isAllSet ? "Reset Password" : "All set!";
    const subtitle = !isAllSet
        ? "In order to protect your account and password, make sure you don’t use personal information or an older password. "
        : "You password has been updated, you can now login to your incard account. ";

    return (
        <DefaultLoginTemplate title={title} subtitle={subtitle}>
            {!isAllSet ? (
                <form onSubmit={handleSubmit}>
                    <ValidationInput
                        name="password"
                        className={styles.input}
                        value={values.password}
                        hasError={Boolean(errors.password) && touched.password}
                        onChange={handleInputChange}
                        label="New password"
                    />
                    <FormInput
                        name="confirmPassword"
                        type="password"
                        className={styles.textToLeft}
                        hasError={Boolean(errors.confirmPassword) && touched.confirmPassword}
                        errorMessage={errors.confirmPassword}
                        value={values.confirmPassword}
                        onChange={handleChange}
                        label="Confirm new password"
                    />
                    <Button type="submit" className={styles.resetBtn} variant="contained">
                        Reset
                    </Button>
                </form>
            ) : (
                <Button variant="contained" onClick={handleLogin}>
                    Login
                </Button>
            )}
        </DefaultLoginTemplate>
    );
};

export default ResetPasswordForm;
