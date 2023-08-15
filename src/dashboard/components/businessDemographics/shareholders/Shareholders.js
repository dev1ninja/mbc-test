import React, { useState, useEffect, useContext } from "react";
import { Box, Typography } from "@material-ui/core";
import authContext from "context/auth/authContext";
import Navigations from "dashboard/components/navigations/Navigations";
import Radio from "shared/components/Radio";
import { postBusinessApi } from "dashboard/services/businessDemographicsService";
import PercentEnter from "shared/components/PercentEnter";
import { initUser } from "shared/helpers/auth";
import CustomButton from "shared/components/CustomButton";
import { useHistory } from "react-router-dom";
import BackButtonLayout from "shared/components/BackButtonLayout";

import { useStyles } from './styles';

const Shareholders = () => {
    const [shareholder, setShareholder] = useState(0);
    const { veriff } = useContext(authContext);
    const [user, setUser] = useState(null);
    const [percentError, setPercentError] = useState('');
    const [percent, setPercent] = useState("");
    const [error, setError] = useState("");
    const history = useHistory();
    const styles = useStyles();
    const isShareholder = shareholder === 1;

    const getUser = async () => {
        const user = await initUser();
        setUser(user);
    }

    useEffect(() => {
        getUser();
    }, [])

    useEffect(() => {
        if (user) {
            const shareholder = user?.shareholders?.length && user?.shareholders[0];
            if (shareholder && shareholder.percOfVotingRightsOrShares) {
                setPercent(shareholder.percOfVotingRightsOrShares);
                setShareholder(1);
            } else {
                setShareholder(0);
            }
        }
    }, [user]);

    const goBack = () => {
        history.goBack();
    };

    const handleChange = e => {
        const { value } = e.target;
        if (percentError) {
            setPercentError('');
        }
        setPercent(value);
    };

    const handleSubmit = async () => {
        if (!shareholder) {
            setError("Please selcted an option to continue");
            return;
        }

        if (shareholder !== 2 && !percent) {
            setPercentError('Please enter an amount')
            return;
        }

        if (!user.isIdentityVerified) {
            veriff();
            return;
        }

        try {
            await postBusinessApi("updateRoleInShareholders", {
                isShareholder: shareholder === 1,
                percOfVotingRightsOrShares: Number(percent),
            });
    
        } catch (error) {
            const err = error?.response?.data?.message;
            setError(err);
        }
        
        history.push("/admin/general-agreement");
    };

    const handleShareholder = (value) => {
        if (error) {
            setError('')
        }
        setShareholder(value);
    }

    return (
        <Navigations>
            <Box className={styles.container}>
                <Box className={styles.wrapper}>
                    <BackButtonLayout
                        titleText="Are you a shareholder in the company?"
                        onClick={goBack}
                    />
                    <Radio
                        label="Yes"
                        className={styles.radioBtn}
                        onChange={() => handleShareholder(1)}
                        checked={shareholder === 1}
                    />
                    {isShareholder && (
                        <PercentEnter
                            title="Please enter your percentage of voting rights or shares"
                            onChange={handleChange}
                            value={percent}
                            hasError={Boolean(percentError)}
                            errorMessage={percentError}
                        />
                    )}
                    <Radio
                        label="No"
                        className={styles.radioBtn}
                        onChange={() => handleShareholder(2)}
                        checked={shareholder === 2}
                    />
                    <Typography className={styles.error}>{error}</Typography>
                    <CustomButton
                        isLoading={false}
                        onClick={handleSubmit}
                        className={styles.continueBtn}
                    >
                        Continue
                    </CustomButton>
                </Box>
            </Box>
        </Navigations>
    );
};

export default Shareholders;
