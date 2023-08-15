import React, { useEffect, useState } from "react";
import { Button, Box, Typography } from "@material-ui/core";
import {
    sendCode,
    getInfoByVerifyTokensForForgotPassword,
    verifyEmailForForgotPassword,
    createResetToken
} from "auth/services/AuthService";
import { useHistory } from "react-router-dom";
import DefaultLoginTemplate from "shared/templates/DefaultLoginTemplate";
import OtpVerification from "./components/OtpVerification";

import { useStyles } from "./styles";
import ContactSupport from "./components/ContactSupport";

const PhoneVerify = () => {
    const [isCodeSent, setIsCodeSent] = useState(false);
    const [isPhoneAvailable, setIsPhoneAvailable] = useState(true);
    const [isPhoneVerified, setIsPhoneVerified] = useState(false);
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");

    const history = useHistory();
    const styles = useStyles();

    const getActivationTokens = () => {
        const activationKey = new URLSearchParams(history.location.search).get("activationKey");
        const activationToken = new URLSearchParams(history.location.search).get("code");
        return { activationKey, activationToken };
    };

    const getUserInfo = async () => {
        if (email && phone) {
            return { email, phone };
        }

        const { activationKey, activationToken } = getActivationTokens();

        try {
            const infoByVerifyTokens = await getInfoByVerifyTokensForForgotPassword(
                activationKey,
                activationToken
            );
            const {
                email: emailByVerifyToken,
                phone: phoneByVerifyToken,
                isPhoneVerified
            } = infoByVerifyTokens;
            setIsPhoneVerified(Boolean(isPhoneVerified));
            if (emailByVerifyToken) {
                setEmail(emailByVerifyToken);
            }
            if (phoneByVerifyToken) {
                setPhone(phoneByVerifyToken);
            }

            return infoByVerifyTokens || {};
        } catch (error) {
            return error;
        }
    };

    const handleVerify = async () => {
        const { email: userEmail, isPhoneVerified } = await getUserInfo();
        const { activationToken } = getActivationTokens();

        try {
            await verifyEmailForForgotPassword(userEmail, activationToken);
            await ifPhoneNotVerified(isPhoneVerified, userEmail);
        } catch (error) {
            const message = `${error?.response?.data?.message} Please try again`;
            history.push({
                pathname: "/auth/forgot-password",
                state: {
                    message
                }
            });
        }
    };

    const ifPhoneNotVerified = async (isPhoneVerified, email) => {
        if (isPhoneVerified) {
            return true;
        }
        const { resetToken } = await createResetToken(email);

        sessionStorage.setItem("resetToken", resetToken);
        history.push({
            pathname: "/auth/set-new-password",
            state: {
                resetToken
            }
        });

        return true;
    };

    useEffect(() => {
        handleVerify();
    }, []);

    const handleSupport = () => {
        setIsPhoneAvailable(false);
    };

    const handleSendCode = async () => {
        try {
            const { email: userEmail } = await getUserInfo();

            setIsCodeSent(true);
            return await sendCode(userEmail);
        } catch (error) {
            return error;
        }
    };

    const title = !isCodeSent ? "Verification code" : "Confirmation";
    const subtitle = !isCodeSent
        ? `We will send a ONE time sms message with a verification code to: ${phone}.`
        : `To reset your password, please type the verification code sent to: ${phone}.`;
    const subtitleMessage = phone ? subtitle : "";

    return (
        <>
            {isPhoneAvailable && isPhoneVerified && (
                <DefaultLoginTemplate title={title} subtitle={subtitleMessage}>
                    {!isCodeSent && (
                        <Box className={styles.wrapper}>
                            <Button onClick={handleSendCode} variant="outlined">
                                Send a code
                            </Button>
                            <Typography onClick={handleSupport} className={styles.link}>
                                I don’t have access to my phone.
                            </Typography>
                        </Box>
                    )}
                    {isCodeSent && <OtpVerification resendOtp={sendCode} email={email} />}
                </DefaultLoginTemplate>
            )}
            {!isPhoneAvailable && isPhoneVerified && <ContactSupport />}
        </>
    );
};

export default PhoneVerify;
