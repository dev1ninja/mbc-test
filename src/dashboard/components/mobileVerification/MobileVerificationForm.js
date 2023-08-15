import React, { useState } from "react";
import { useFormik } from "formik";
import { PHONENUMBER } from "shared/helpers/validations/PatternConstants";
import { Button, Typography } from "@material-ui/core";
import { bool, func, number, string } from "prop-types";
import CustomButton from "shared/components/CustomButton";
import FormInput from "shared/components/FormInput";
import CountryAutocomplete from "shared/components/CountryAutocomplete";

import { useStyles } from "./styles";

const OTP_ERROR_MESSAGE = "The verification code you entered is incorrect. Please click resend";

const validate = values => {
    const errors = {};
    if (!values.phoneNumber || !PHONENUMBER.test(values.phoneNumber)) {
        errors.phoneNumber = "Phone is Required";
    }
    if (values.phoneNumber && !PHONENUMBER.test(values.phoneNumber)) {
        errors.phoneNumber = "Invalid phone number";
    }

    if (!values.otp) {
        errors.otp = "The verification code you entered is incorrect. Please click resend"
    }
    return errors;
};

const MobileVerificationForm = ({
    showVerification,
    sendOtp,
    isLoading,
    phoneError,
    otpError,
    showCountdown,
    clearPhoneError,
    clearOtpError,
    seconds,
    resendOtp,
    onSubmit,
    changedNumber
}) => {
    const styles = useStyles();
    const [errorSendNumber, setErrorSendNumber] = useState(false);

    const formik = useFormik({
        initialValues: {
            phoneNumber: "",
            countryCode: "+44",
            otp: ""
        },
        onSubmit,
        validate
    });

    const { values, errors, handleSubmit, handleChange, setFieldValue, touched } = formik;
    const errorContinueNumber = Boolean(errors.phoneNumber ) && touched.phoneNumber;

    const handleOtp = e => {
        handleChange(e);
        clearOtpError();
    };

    const handlePhoneNumber = async (e, country) => {
        await handleChange(e);
        clearPhoneError();
        setFieldValue("countryCode", `+${country.phone}`);
        changedNumber();
    };

    const sendCode = () =>{
        if (PHONENUMBER.test(values.phoneNumber)){
            sendOtp(values);
            setErrorSendNumber(false)
        } else {
            setErrorSendNumber(true);
        }
    }

    const otpCodeError = errors.otp && touched.otp || otpError;

    return (
        <div className={styles.container}>
            <form onSubmit={handleSubmit} className={styles.formWrapper}>
                <Typography className={styles.title}>Mobile number</Typography>
                <Typography className={styles.subtitle}>
                    Please verify your mobile number, so we can stay in touch.
                </Typography>
                <CountryAutocomplete
                    hasError={errorSendNumber || errorContinueNumber || Boolean(phoneError)}
                    name="phoneNumber"
                    errorMessage={errors.phoneNumber || phoneError}
                    onChange={handlePhoneNumber}
                    value={values.phoneNumber}
                />
                {!showVerification && (
                    <CustomButton
                        variant="contained"
                        type="submit"
                        className={styles.sendBtn}
                        onClick={sendCode}
                        isLoading={isLoading}
                    >
                        Send verification code
                    </CustomButton>
                )}
                {showVerification && (
                    <>
                        <FormInput
                            label="Verification code*"
                            hasError={otpCodeError}
                            value={values.otp}
                            className={styles.otp}
                            errorMessage={OTP_ERROR_MESSAGE}
                            name="otp"
                            type="number"
                            onChange={handleOtp}
                        />
                        <div className={styles.buttonWrapper}>
                            <div className={styles.resendWrapper}>
                                <Button
                                    className={styles.button}
                                    variant="outlined"
                                    disabled={showCountdown}
                                    onClick={() => resendOtp(values)}
                                >
                                    Resend
                                </Button>
                                {showCountdown && (
                                    <div className={styles.countdownWrapper}>
                                        <Typography className={styles.countdownLabel}>
                                            Please wait
                                        </Typography>
                                        <Typography className={styles.countdown}>
                                            {seconds}s
                                        </Typography>
                                    </div>
                                )}
                            </div>
                            <CustomButton
                                type="submit"
                                className={styles.continueButton}
                                variant="contained"
                            >
                                Continue
                            </CustomButton>
                        </div>
                    </>
                )}
            </form>
        </div>
    );
};

export default MobileVerificationForm;

MobileVerificationForm.propTypes = {
    onSubmit: func.isRequired,
    seconds: number.isRequired,
    phoneError: string,
    otpError: bool.isRequired,
    sendOtp: func.isRequired,
    resendOtp: func.isRequired,
    clearPhoneError: func.isRequired,
    showCountdown: bool.isRequired,
    showVerification: bool.isRequired,
    clearOtpError: func.isRequired,
    isLoading: bool.isRequired,
    changedNumber: func.isRequired,
};
