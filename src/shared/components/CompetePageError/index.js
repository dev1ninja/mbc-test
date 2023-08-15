import React from "react";
import { Box, Typography } from "@material-ui/core";
import verifyNot from "assets/images/not-verify.svg";
import logo from "assets/images/logo.svg";
import SvgIcon from "shared/components/SvgIcon";
import LoginLayout from "shared/layouts/LoginLayout";

import { useStyles } from "./styles";

const CompletePageError = () => {
    const styles = useStyles();

    return (
        <LoginLayout>
            <Box className={styles.container}>
                <SvgIcon className={styles.logo} iconPath={logo} alt="logo" />
                <SvgIcon className={styles.imageContainer} iconPath={verifyNot} alt="verifyNot" />
                <Typography className={styles.textContainer}>
                    Unfortunately, we are unable to process your information.
                </Typography>
                <Typography className={styles.textContainer}>
                    Please contact our support team for assistance.
                </Typography>
            </Box>
        </LoginLayout>
    );
};

export default CompletePageError;
