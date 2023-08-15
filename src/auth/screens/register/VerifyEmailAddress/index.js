import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { Typography } from "@material-ui/core";
import FormInput from "shared/components/FormInput";
import CustomButton from "shared/components/CustomButton";
import { sendVerify, verifyEmail, getInfoByVerifyTokens, getUser } from "auth/services/AuthService";
import Navigations from "dashboard/components/navigations/Navigations";
import { DEFAULT_ERROR_MESSAGE } from "shared/components/Error";
import { useStyles } from "./styles";

const VerifyEmailAddress = () => {
    const [verificationCode, setVerificationCode] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [emailValue, setEmailValue] = useState("");
    const history = useHistory();
    const styles = useStyles();

    const getActivationTokens = () => {
        const activationToken = new URLSearchParams(history.location.search).get("code");
        return { activationToken };
    };

    const getUserEmail = async () => {
        try {
            if (emailValue) {
                return emailValue;
            }

            const emailFromHistory = history.location?.state?.email;
            if (emailFromHistory) {
                setEmailValue(emailFromHistory);
                return emailFromHistory;
            }

            const { activationToken } = getActivationTokens();
            if (activationToken) {
                const { email: emailByVerifyToken } = await getInfoByVerifyTokens(
                    activationToken,
                );
                if (emailByVerifyToken) {
                    setEmailValue(emailByVerifyToken);
                    return emailByVerifyToken;
                }
            }

            if (!emailValue && !emailFromHistory) {
                const { data } = await getUser();
                const { email } = data.user;
                setEmailValue(email);
                return email;
            }

            return false;
        } catch (error) {
            const message = error?.message || DEFAULT_ERROR_MESSAGE;
            return setErrorMessage(message);
        }
    };

    const handleChange = e => {
        const { value } = e.target;
        setErrorMessage("");
        setVerificationCode(value);
    };

    const verification = async code => {
        try {
            setIsLoading(true);
            const email = await getUserEmail();

            await verifyEmail(email, verificationCode || code);
            history.push("/admin/mobile-verification");
            setIsLoading(false);
        } catch (error) {
            const message = !verificationCode
                ? "Please enter verification code."
                : "Code is wrong. Please try again.";

            setErrorMessage(message);
            setIsLoading(false);
        }
    };

    const verify = async () => {
        const email = await getUserEmail();
        const { activationToken } = getActivationTokens();

        if (email && !activationToken) {
            await sendVerify(email);
        }

        if (activationToken && email) {
            await verification(activationToken);
        }
    };

    const sendNewCode = async () => {
        const email = await getUserEmail();
        await sendVerify(email);
    };

    useEffect(() => {
        verify();
    }, [history]);

    const emailMessage = emailValue
        ? `Enter the 6-digit code we sent you on ${emailValue} to confirm your email.`
        : "";

    return (
        <Navigations>
            <div className={styles.container}>
                <div className={styles.formWrapper}>
                    <Typography className={styles.title}>Verify your email address</Typography>
                    <Typography className={styles.subtitle}>{emailMessage}</Typography>
                    <FormInput
                        label="Code"
                        hasError={Boolean(errorMessage)}
                        errorMessage={errorMessage}
                        className={styles.input}
                        value={verificationCode}
                        onChange={handleChange}
                    />
                    <CustomButton
                        onClick={verification}
                        isLoading={isLoading}
                        className={styles.button}
                        variant="contained"
                    >
                        Continue
                    </CustomButton>
                    <div className={styles.footer}>
                        <Typography className={styles.footerContent}>
                            Didn’t get the code?{" "}
                        </Typography>
                        <Typography onClick={sendNewCode} className={styles.footerLink}>
                            Send a new code
                        </Typography>
                    </div>
                </div>
            </div>
        </Navigations>
    );
};

export default VerifyEmailAddress;
