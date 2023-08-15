import React, { useContext, useEffect, useState } from "react";
import classNames from "classnames";
import { Button, Typography, Box } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import Navigations from "dashboard/components/navigations/Navigations";
import BackButtonLayout from "shared/components/BackButtonLayout";
import AgreementLink from "shared/components/AgreementLink";
import sidebarContext from "context/sidebar/sidebarContext";
import { getUser } from "shared/services/CommonService";
import CustomChecbox from "shared/components/CustomCheckbox";
import authContext from "context/auth/authContext";
import serviceCall from "dashboard/services/generalAgreementService";

import { useStyles } from "./styles";

const GeneralService = () => {
    const [isChecked, setCheckbox] = useState(false);
    const { isActive, hasCompleted } = useContext(sidebarContext);
    const { veriff } = useContext(authContext);
    const [error, setError] = useState("");
    const history = useHistory();
    const styles = useStyles();

    const titleText = "Terms and conditions";
    const errorText = "Please agree to the terms and conditions";
    const subtitleText = "Please download, read and then agree to the following documents:";
    const titleGeneralService = {
        title: "incard General Service Agreement",
        linkTitle: "incard General Service Agreement",
        link: "https://www.incard.co/legal/terms-uk"
    };
    const tittleCardTerms = {
        title: "incard Card Terms with Nium",
        linkTitle: "incard Card Terms",
        link: "https://www.incard.co/legal/cardterms-uk"
    };

    useEffect(() => {
        isActive(4);
    }, []);

    const handleSubmit = async event => {
        event.preventDefault();
        const user = getUser();
        if (!user.isIdentityVerified) {
            veriff();
            return;
        }

        if (!isChecked) {
            setError(errorText);
            return;
        }
        const response = await serviceCall(isChecked);
        if (response.status === 200) {
            hasCompleted(4);
            sessionStorage.setItem("type", "login");
            history.push("/admin/verify-wait");
        }
    };

    const goBack = () => {
        history.goBack();
    };

    const checkAgreement = e => {
        const { checked } = e.target;
        setCheckbox(checked);
        setError("");
    };

    return (
        <Navigations>
            <Box className={styles.container}>
                <form onSubmit={handleSubmit} className={styles.formWrapper}>
                    <BackButtonLayout
                        titleText={titleText}
                        subtitleText={subtitleText}
                        onClick={goBack}
                    />
                    <AgreementLink
                        title={tittleCardTerms.title}
                        link={tittleCardTerms.link}
                        className={styles.reference}
                    />
                    <AgreementLink
                        title={titleGeneralService.title}
                        link={titleGeneralService.link}
                        className={styles.reference}
                    />
                    <Box className={styles.checkboxContainer}>
                        <CustomChecbox
                            color="primary"
                            checked={isChecked}
                            onChange={checkAgreement}
                            name="consentChecked"
                            labelPosition="right"
                            className={classNames([styles.checkbox, styles.formLabel])}
                            hasError={Boolean(error)}
                        />
                        <Typography className={styles.formLabel}>
                            I agree to the
                            <a
                                target="_blank"
                                href={titleGeneralService.link}
                                rel="noreferrer"
                                className={styles.linkAgreementText}
                            >
                                {titleGeneralService.linkTitle}
                            </a>
                            and
                            <a
                                target="_blank"
                                href={tittleCardTerms.link}
                                rel="noreferrer"
                                className={styles.linkAgreementText}
                            >
                                {tittleCardTerms.linkTitle}
                            </a>
                            and confirm I have read and understood the above agreements.
                        </Typography>
                    </Box>
                    <Typography className={styles.errorText}>{error}</Typography>
                    <Button type="submit" variant="contained">
                        Continue
                    </Button>
                </form>
            </Box>
        </Navigations>
    );
};

export default GeneralService;
