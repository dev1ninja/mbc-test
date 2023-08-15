import React from "react";
import { Box, Typography } from "@material-ui/core";
import verifyWait from "assets/images/verify-wait.svg";
import logo from "assets/images/logo.svg";
import SvgIcon from "shared/components/SvgIcon";
import LoginLayout from "shared/layouts/LoginLayout";

import { useStyles } from "./styles";

const CompletePageSuccess = () => {
    const styles = useStyles();

    return (
        <LoginLayout>
            <Box className={styles.container}>
                <SvgIcon className={styles.logo} iconPath={logo} alt="logo" />
                <SvgIcon className={styles.imageContainer} iconPath={verifyWait} alt="verifyWait" />
                <Typography className={styles.textContainer}>
                    We are currently processing your information.
                </Typography>
                <Typography className={styles.textContainer}>
                    Please note that this can take between 48 to 72 hours.
                </Typography>
            </Box>
        </LoginLayout>
    );
};

export default CompletePageSuccess;
