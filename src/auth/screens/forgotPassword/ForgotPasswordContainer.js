import React, { useEffect, useState } from "react";
import PostForgotPassword from "auth/services/ForgotPasswordService";
import { EMAIL } from "shared/helpers/validations/PatternConstants";
import { useHistory } from "react-router-dom";
import { parseErrorResponse } from 'shared/components/Error';
import LoginLayout from "shared/layouts/LoginLayout";
import EmailSent from "./EmailSent";
import ForgotPassword from "./ForgotPassword";
import { useStyles } from "./styles";

const ForgotPasswordContainer = () => {
    const styles = useStyles();
    const history = useHistory();

    const [email, setEmail] = useState("");
    const [isCodeSend, setIsCodeSend] = useState(false);
    const [emailError, setEmailError] = useState('');

    useEffect(() => {
        if (history.location.state?.message) {
            setEmailError(history.location.state.message);
        }

    }, [history.location.state])

    const handleChange = e => {
        if (emailError) {
            setEmailError('')
        }
        const { value } = e.target;
        setEmail(value);
    };

    const handleSubmit = async () => {
        const matched = EMAIL.test(email);
        setEmailError(!matched);
        if (!matched) {
            return;
        }
        try {
            await PostForgotPassword("forgotPassword/email", {
                email,
                source: "web",
                isV2: true
            });
            setIsCodeSend(true);
        } catch (error) {
            const message = parseErrorResponse(error);
            setEmailError(message);
        }
    };

    return (
        <LoginLayout>
            <div className={styles.main}>
                {!isCodeSend ? (
                    <ForgotPassword
                        email={email}
                        handleSubmit={handleSubmit}
                        emailError={emailError}
                        handleChange={handleChange}
                    />
                ) : (
                    <EmailSent handleSubmit={handleSubmit} />
                )}
            </div>
        </LoginLayout>
    );
};

export default ForgotPasswordContainer;
