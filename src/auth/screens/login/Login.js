import React, { useContext, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useFormik } from "formik";
import classNames from "classnames";
import { Button, Typography, Box } from "@material-ui/core";
import eyeOpen from "assets/images/eye-open.svg";
import eyeClosed from "assets/images/eye-closed.svg";
import logo from "assets/images/logo.png";
import LoginLayout from "shared/layouts/LoginLayout";
import SvgIcon from "shared/components/SvgIcon";
import authContext from "context/auth/authContext";
import FormInput from "shared/components/FormInput";
import { loginCheck } from "shared/helpers/utils";
import sidebarContext from "context/sidebar/sidebarContext";
import Cookies from "js-cookie";
import userLogin from "../../services/LoginService";

import useStyles from "./styles";

const validate = async values => {
    const errors = {};
    if (!values.email) {
        errors.email = "Please enter email";
    }
    if (!values.password) {
        errors.password = "Please enter password";
    }
    return errors;
};

function Login() {
    const history = useHistory();
    const styles = useStyles();
    const  { isActive, hasCompleted } = useContext(sidebarContext)
    const { setUser: setUserToContext, veriff } = useContext(authContext)
    const [showPassword, setShowPassword] = useState(false);
    const [errorEmailServer, setErrorEmailServer] = useState('');

    const handleStep = (id) => {
        isActive(id)
        hasCompleted(id);
    }

    const handleLogin = async values => {
        try {
            const response = await userLogin(values);
            const { accessToken, _id } = response.data.user;
            Cookies.set('token', accessToken)
            sessionStorage.setItem("token", accessToken);
            sessionStorage.setItem("userId", _id);
            sessionStorage.setItem("type", "login");
            setUserToContext(response.data.user);
            loginCheck(response.data.user, true, history, handleStep, veriff);
            setErrorEmailServer('')
        } catch (error) {
            setErrorEmailServer("Invalid email or password")
        }

    };

    const handleValueChange = (e) => {
        if (errorEmailServer) {
            setErrorEmailServer('');
        }
        handleChange(e);
    }

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const formik = useFormik({
        initialValues: {
            email: "",
            password: "",
        },
        onSubmit: handleLogin,
        validate,
    });

     const { values, handleSubmit, handleChange, errors, touched } = formik;

    return (
        <LoginLayout>
            <div className={styles.loginWrapper}>
                <img className={styles.logo} src={logo} alt="logo" />
                <form onSubmit={handleSubmit} className={styles.formWrapper} autoComplete="off">
                    <Typography className={styles.title}>Login to your incard account</Typography>
                    <FormInput
                        label="Email address"
                        className={classNames([styles.input, styles.errorMessage])}
                        name="email"
                        value={values.email}
                        onChange={handleValueChange}
                        hasError={Boolean(errors.email)&&touched.email || errorEmailServer}
                        errorMessage={errors.email || errorEmailServer}
                    />
                    <FormInput
                        className={classNames([styles.formField, styles.errorMessage])}
                        label="Password"
                        type={showPassword ? "text" : "password"}
                        name="password"
                        value={values.password}
                        onChange={handleValueChange}
                        hasError={Boolean(errors.password)&&touched.password}
                        errorMessage={errors.password}
                        endAdornment={
                            values.password && (
                                <Box
                                    className={styles.passwordIcon}
                                    onClick={handleClickShowPassword}
                                >
                                    {showPassword ? (
                                        <SvgIcon iconPath={eyeOpen} />
                                    ) : (
                                        <SvgIcon iconPath={eyeClosed} />
                                    )}
                                </Box>
                            )
                        }
                    />
                    <Link className={styles.link} to="/auth/forgot-password">
                        Forgot password?
                    </Link>
                    <Button type="submit" className={styles.loginButton} variant="contained">
                        Login
                    </Button>
                    <div className={styles.startedWrapper}>
                        <Typography>Don't have an account?</Typography>
                        <Link className={styles.registerLink} to="/auth/register">
                            Get started here
                        </Link>
                    </div>
                </form>
            </div>
        </LoginLayout>
    );
}

export default Login;
