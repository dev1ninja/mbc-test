import React from "react";
import { Button } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import DefaultLoginTemplate from "shared/templates/DefaultLoginTemplate";
import { IntercomProvider } from "react-use-intercom";

const ContactSupport = () => {
    const history = useHistory();

    const handleGoBack = () => {
        history.push("/auth/login");
    };

    return (
        <IntercomProvider autoBoot appId={process.env.REACT_APP_INTERCOM_APP_ID}>
            <DefaultLoginTemplate
                title="Please contact our customer support."
                subtitle="We will help you to recover your account."
            >
                <Button onClick={handleGoBack} variant="outlined">
                    Back
                </Button>
            </DefaultLoginTemplate>
        </IntercomProvider>
    );
};

export default ContactSupport;
