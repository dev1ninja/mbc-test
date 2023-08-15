import React, { useContext, useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import FormInput from "shared/components/FormInput";
import { setUser } from "shared/helpers/auth";
import { useFormik } from "formik";
import { Typography, Box, Button } from "@material-ui/core";
import SvgIcon from "shared/components/SvgIcon";
import eyeOpen from "assets/images/eye-open.svg";
import eyeClosed from "assets/images/eye-closed.svg";
import { EMAIL, PASSWORD } from "shared/helpers/validations/PatternConstants";
import CustomButton from "shared/components/CustomButton";
import sidebarContext from "context/sidebar/sidebarContext";
import authContext from "context/auth/authContext";
import Cookies from "js-cookie";
import DefaultLoginTemplate from "shared/templates/DefaultLoginTemplate";
import { logout } from "auth/services/AuthService";
import ValidationInput from "shared/components/ValidationInput";
import CustomChecbox from "shared/components/CustomCheckbox";
import { onPressKeyHandler } from "shared/helpers/utils";
import Navigations from "dashboard/components/navigations/Navigations";
import userSignUp from "../../services/RegisterService";

import useStyles from "./RegisterStyles";

const validate = values => {
    const errors = {};
    const isEmailValid = EMAIL.test(values.email);
    const isPasswordValid = PASSWORD.test(values.password);
    const isConfirmPasswordValid = values.password && values.confirmPassword === values.password;
    if (!isEmailValid) {
        errors.email = "Please enter your email address";
    }
    if (!isPasswordValid) {
        errors.password = "Required";
    }
    if (!isConfirmPasswordValid) {
        errors.confirmPassword = "Please confirm your password";
    }
    if (!values.isPrivacyAccepted) {
        errors.isPrivacyAccepted = "Required";
    }

    return errors;
};

const Register = () => {
    const styles = useStyles();
    const history = useHistory();
    const [showPassword, setShowPassword] = useState({ initPassword: false, finalPassword: false });
    const { user, setUser: setUserToContext } = useContext(authContext);
    const token = Cookies.get('token');
    const [isLoading, setIsLoading] = useState(false);
    const { isActive } = useContext(sidebarContext);

    const sendRequest = async values => {
        setIsLoading(true);
        const data = {
            email: values.email,
            password: values.password,
            isPrivacyAccepted: values.isPrivacyAccepted
        };

        const verifyEmailPath = {
            pathname: "/auth/verify-email",
            state: {
                email: values.email
            }
        };

        sessionStorage.clear();
        try {
            const response = await userSignUp(data);
            const { accessToken } = response.data;
            Cookies.set("token", accessToken);
            setUserToContext(response.data);
            setUser(response.data);
            setShowPassword(false);
            history.push(verifyEmailPath);

            setIsLoading(false);
        } catch (error) {
            const emailError = error.response.data.message;
            const serverError = error?.response?.data?.error?.message;
            setErrors({ email: emailError, serverError });
            setIsLoading(false);
        }
    };

    const formik = useFormik({
        validateOnMount: true,
        initialValues: {
            email: "",
            password: "",
            confirmPassword: "",
            isPrivacyAccepted: false
        },
        onSubmit: sendRequest,
        validate
    });

    const { values, handleChange, handleSubmit, setErrors, errors, touched } = formik;

    const onSubmit = event => {
        event.preventDefault();
        handleSubmit();
    };

    useEffect(() => {
        isActive(1);
    }, []);

    const handleClickShowPassword = (e, val) => {
        const verificationKey = onPressKeyHandler(e);
        if (verificationKey) {
            setShowPassword({ ...showPassword, [val]: !showPassword[val] });
        }
    };

    const emailError = Boolean(errors.email) && touched.email;
    const serverError = Boolean(errors.serverError);

    const logoutClear = () => {
        sessionStorage.clear();
        setUserToContext(null);
        Cookies.set('token', '');
        history.push('/auth/register');
    };

    const handleLogout = async () => {
        try {
            await logout();
        } catch (error) {
            return logoutClear();
        }
        return logoutClear();
    };

    return (
        <>
            {user || token ? (
                <DefaultLoginTemplate title="You are already logged in">
                    <Button className={styles.logoutButton} variant="contained" onClick={handleLogout}>Logout</Button>
                </DefaultLoginTemplate>
            ) : (
                <Navigations>
                    <div className={styles.container}>
                        <form onSubmit={onSubmit} className={styles.formWrapper} autoComplete="off">
                            <Typography className={styles.title}>
                                Sign-up to your incard account
                            </Typography>
                            <Typography className={styles.subtitle}>
                                Verify your email address and choose a secure password that you can
                                easily remember.
                            </Typography>
                            <FormInput
                                className={styles.formField}
                                label="Email address*"
                                name="email"
                                errorMessage={errors.email}
                                hasError={emailError}
                                value={values.email}
                                onChange={handleChange}
                            />
                            <ValidationInput
                                label="Password*"
                                name="password"
                                hasError={Boolean(errors.password && touched.password)}
                                className={styles.formField}
                                value={values.password}
                                onChange={handleChange}
                            />
                            <FormInput
                                className={styles.formField}
                                label="Confirm password*"
                                errorMessage={errors.confirmPassword}
                                hasError={Boolean(
                                    errors.confirmPassword && touched.confirmPassword
                                )}
                                type={showPassword.finalPassword ? "text" : "password"}
                                name="confirmPassword"
                                value={values.confirmPassword}
                                onChange={handleChange}
                                endAdornment={
                                    values.confirmPassword && (
                                        <Box
                                            className={styles.passwordIcon}
                                            onClick={e =>
                                                handleClickShowPassword(e, "finalPassword")
                                            }
                                            onKeyDown={e =>
                                                handleClickShowPassword(e, "finalPassword")
                                            }
                                            tabIndex="0"
                                        >
                                            {showPassword.finalPassword ? (
                                                <SvgIcon iconPath={eyeOpen} />
                                            ) : (
                                                <SvgIcon iconPath={eyeClosed} />
                                            )}
                                        </Box>
                                    )
                                }
                            />
                            <div className={styles.checkPolicy}>
                                <CustomChecbox
                                    checked={values.isPrivacyAccepted}
                                    label="I agree with the"
                                    labelPosition="right"
                                    hasError={
                                        Boolean(errors.isPrivacyAccepted) &&
                                        touched.isPrivacyAccepted
                                    }
                                    onChange={handleChange}
                                    name="isPrivacyAccepted"
                                />
                                <Typography className={styles.terms}>
                                    <a
                                        href="https://www.incard.co/privacy-policy"
                                        target="_blank"
                                        className={styles.link}
                                        rel="noreferrer"
                                    >
                                        Privacy Policy
                                    </a>
                                </Typography>
                            </div>
                            <CustomButton
                                type="submit"
                                isLoading={isLoading}
                                disabled={isLoading}
                                className={styles.createButton}
                                variant="contained"
                            >
                                Create account
                            </CustomButton>
                            <Typography className={styles.errorMessage}>
                                {serverError && errors.serverError}
                            </Typography>
                            <Typography className={styles.logIn}>
                                Already have an account?&nbsp;
                                <Link className={styles.loginLink} to="/auth/login">
                                    Log in here
                                </Link>
                            </Typography>
                        </form>
                    </div>
                </Navigations>
            )}
        </>
    );
};

export default Register;
