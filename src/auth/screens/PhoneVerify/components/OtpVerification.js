import React, { useState } from "react";
import { Button, Typography, Box } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import { func, string } from "prop-types";
import { ErrorComponent, parseErrorResponse } from "shared/components/Error";
import { verifyPhone } from "auth/services/AuthService";
import { red, white } from "theme/variables";
import OtpInput from "react-otp-input";

import { useStyles } from "./styles";

const otpInputStyle = {
    width: "3.6rem",
    height: "4.8rem",
    borderRadius: ".4rem",
    backgroundColor: "transparent",
    border: `1px solid #1B1C21`,
    margin: "0 .5rem",
    fontSize: "1.6rem",
    color: white
};

const errorOtp = {
    ...otpInputStyle,
    border: `1px solid ${red}`
};

const OtpVerification = ({ resendOtp, email }) => {
    const [otpValue, setOtpValue] = useState("");
    const [error, setError] = useState("");
    const history = useHistory();
    const styles = useStyles();

    const handlePhoneVerify = async () => {
        if (!otpValue) {
            setError("Please enter otp");
            return;
        }

        try {
            const { resetToken } = await verifyPhone(email, otpValue);
            sessionStorage.setItem("resetToken", resetToken);
            history.push({
                pathname: "/auth/set-new-password",
                state: {
                    resetToken
                }
            });
        } catch (error) {
            const err = parseErrorResponse(error);
            setError(err);
        }
    };

    const handleOtpValue = value => {
        if (error) {
            setError("");
        }
        setOtpValue(value);
    };

    return (
        <>
            <OtpInput
                value={otpValue}
                onChange={handleOtpValue}
                numInputs={6}
                containerStyle={styles.otpWrapper}
                focusStyle={{ border: `1px solid #1B1C21` }}
                inputStyle={error ? errorOtp : otpInputStyle}
            />
            <Box className={styles.errorWrapper}>
                <ErrorComponent message={error} />
            </Box>
            <Button className={styles.button} onClick={handlePhoneVerify} variant="contained">
                Verify
            </Button>
            <Box className={styles.receivedWrapper}>
                <Typography>Didn’t receive a code?</Typography>
                <Typography onClick={() => resendOtp(email)} className={styles.link}>
                    Resend
                </Typography>
            </Box>
        </>
    );
};

export default OtpVerification;

OtpVerification.propTypes = {
    email: string.isRequired,
    resendOtp: func.isRequired
};
