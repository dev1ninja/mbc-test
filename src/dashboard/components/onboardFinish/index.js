import { Box, Typography, Step, Stepper } from "@material-ui/core";
import React, { useContext } from "react";
import QRCode from "react-qr-code";
import logo from "assets/images/logo.svg";
import authContext from "context/auth/authContext";
import appStore from "assets/images/app-store-badge.svg";
import googlePlay from "assets/images/google-play-badge.svg";
import SvgIcon from "shared/components/SvgIcon";
import LoginLayout from "shared/layouts/LoginLayout";

import { useStyles } from "./styles";

const OnboardFinish = () => {
    const styles = useStyles();
    const { user } = useContext(authContext);

    const steps = [
        { id: 1, label: "Download the incard app" },
        { id: 2, label: `Log in as ${user?.email}` },
        { id: 3, label: "Your account is ready!" }
    ];

    return (
        <LoginLayout>
            <Box className={styles.container}>
                <SvgIcon className={styles.logo} iconPath={logo} />
                <Typography className={styles.title}>Activate your incard account now</Typography>
                <Typography className={styles.subtitle}>
                    Scan the QR code to install incard
                </Typography>
                <Box className={styles.codeContainer}>
                    <QRCode size={210} value="https://app.dev.incard.co" />
                </Box>
                <Box className={styles.stepsContainer}>
                    <Stepper
                        className={styles.stepper}
                        connector={<Box className={styles.connector} />}
                    >
                        {steps.map(({ id }) => (
                            <Step key={id} className={styles.step} />
                        ))}
                    </Stepper>
                    <Box className={styles.labelsContainer}>
                        {steps.map(({ id, label }) => {
                            return (
                                <Box key={id} className={styles.labels}>
                                    {label}
                                </Box>
                            );
                        })}
                    </Box>
                </Box>
                <Box className={styles.footer}>
                    <a href="https://app.dev.incard.co" target="_blank" rel="noreferrer">
                        <SvgIcon className={styles.icon} iconPath={appStore} />
                    </a>
                    <a href="https://app.dev.incard.co" target="_blank" rel="noreferrer">
                        <SvgIcon className={styles.icon} iconPath={googlePlay} />
                    </a>
                </Box>
            </Box>
        </LoginLayout>
    );
};

export default OnboardFinish;
