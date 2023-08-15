import React, { useEffect, useState } from "react";
import { Button, Typography } from "@material-ui/core";
import Navigations from "dashboard/components/navigations/Navigations";
import * as _ from "underscore";
import { postBusinessApi } from "dashboard/services/businessDemographicsService";
import { useHistory } from "react-router-dom";
import CustomChecbox from "shared/components/CustomCheckbox";
import BackButtonLayout from "shared/components/BackButtonLayout";
import CompanyAddressForm from "dashboard/components/businessDemographics/businessAddress/CompanyAddressForm";
import InfoModal from "shared/components/InfoModal";
import countries from "shared/constants/country";
import { getUser } from "shared/services/CommonService";
import { useFormik } from "formik";

import { useStyles } from "./styles";

const addressToDTO = (values, isTrading) => {
    const { registeredAddress, businessAddress } = values;
    const regAddress = {
        ...registeredAddress,
        countryOfIncorporation: registeredAddress.countryOfIncorporation.label,
        countryCode: registeredAddress.countryOfIncorporation.code,
        countryNumericCode: registeredAddress.countryOfIncorporation.iso
    };
    const busAddress = {
        ...businessAddress,
        countryOfIncorporation: businessAddress?.countryOfIncorporation?.label,
        countryCode: businessAddress.countryOfIncorporation?.code,
        countryNumericCode: businessAddress.countryOfIncorporation?.iso
    };

    const address = !isTrading ? busAddress : regAddress;

    return {
        registeredAddress: regAddress,
        businessAddress: address
    };
};

const validate = (values, isChecked) => {
    const errors = {
        businessAddress: {},
        registeredAddress: {}
    };

    if (!values.registeredAddress.countryOfIncorporation) {
        errors.registeredAddress.countryOfIncorporation = "Please select a country";
    }
    if (!values.registeredAddress.address_1) {
        errors.registeredAddress.address_1 = "Please enter register address";
    }
    if (!values.registeredAddress.postCode) {
        errors.registeredAddress.postCode = "Please enter postcode";
    }
    if (!values.registeredAddress.town) {
        errors.registeredAddress.town = "Please enter city";
    }

    if (!isChecked) {
        if (!values.businessAddress.countryOfIncorporation) {
            errors.businessAddress.countryOfIncorporation = "Please select a country";
        }
        if (!values.businessAddress.address_1) {
            errors.businessAddress.address_1 = "Please enter trading address";
        }
        if (!values.businessAddress.postCode) {
            errors.businessAddress.postCode = "Please enter postcode";
        }
        if (!values.businessAddress.town) {
            errors.businessAddress.town = "Please enter city";
        }
    }

    const hasNoErrors =
        !Object.keys(errors.businessAddress).length &&
        !Object.keys(errors.registeredAddress).length;

    if (hasNoErrors) {
        return {};
    }

    return errors;
};

const BusinessAddress = () => {
    const [isChecked, setIsChecked] = useState(true);
    const [user, setUser] = useState(null);
    const [isShown, setIsShown] = useState(false);
    const history = useHistory();
    const styles = useStyles();

    const onSubmit = async values => {
        const data = addressToDTO(values, isChecked);
        const resp = await postBusinessApi("demographics/business/address", { ...data });
        if (resp.status) {
            navigate();
        }
    };

    const formik = useFormik({
        initialValues: {
            registeredAddress: {
                countryOfIncorporation: null,
                address_1: "",
                town: "",
                postCode: ""
            },
            businessAddress: {
                countryOfIncorporation: null,
                address_1: "",
                town: "",
                postCode: ""
            }
        },
        onSubmit,
        validate: values => validate(values, isChecked)
    });

    const { values, setFieldValue, handleChange, handleSubmit, errors, touched } = formik;

    const initUser = async () => {
        const user = await getUser();
        setUser(user);
    };

    useEffect(() => {
        initUser();
    }, []);

    useEffect(() => {
        if (user) {
            if (user.registeredAddress) {
                const address = {
                    address_1: user.registeredAddress?.address_1 || "",
                    town: user.registeredAddress?.town || "",
                    postCode: user.registeredAddress?.postCode || "",
                    countryOfIncorporation: _.findWhere(countries, {
                        label: user.registeredAddress.countryOfIncorporation
                    })
                };
                setFieldValue("registeredAddress", address);
            }

            if (user.businessAddress) {
                const businessAddress = {
                    address_1: user.businessAddress?.address_1 || "",
                    town: user.businessAddress?.town || "",
                    postCode: user.businessAddress?.postCode || "",
                    countryOfIncorporation: _.findWhere(countries, {
                        label: user.registeredAddress.countryOfIncorporation
                    })
                };
                setFieldValue("businessAddress", businessAddress);
            }

            if (JSON.stringify(user.businessAddress) === JSON.stringify(user.registeredAddress)) {
                setIsChecked(true);
            }
        }
    }, [user]);

    const goBack = () => {
        history.goBack();
    };

    const navigate = () => {
        if (user?.isCompanyFetchedFromApi) {
            history.push("/admin/businessCategory");
        } else {
            history.push("/admin/upload-docs");
        }
    };

    const handleCheckbox = e => {
        const { checked } = e.target;
        setIsChecked(checked);

        const defaultBusinessAddress = {
            countryOfIncorporation: null,
            address_1: "",
            town: "",
            postCode: ""
        };

        if (checked) {
            setFieldValue("businessAddress", { ...values.registeredAddress });
        } else {
            setFieldValue("businessAddress", { ...defaultBusinessAddress });
        }
    };

    const handleInputChange = e => {
        handleChange(e);
    };

    const handleCountry = (name, country) => {
        setFieldValue(name, country);
    };

    const toggleModal = () => {
        setIsShown(prev => !prev);
    };

    return (
        <Navigations>
            <div className={styles.container}>
                <form className={styles.formWrapper} onSubmit={handleSubmit}>
                    <BackButtonLayout titleText="Company address details" onClick={goBack} />
                    <CompanyAddressForm
                        values={values}
                        errors={errors}
                        touched={touched}
                        onChange={handleInputChange}
                        toggleModal={toggleModal}
                        onCountryChange={handleCountry}
                    />
                    <CustomChecbox
                        className={styles.checkbox}
                        label="My business address is the same as the registered address"
                        labelPosition="right"
                        checked={isChecked}
                        onChange={handleCheckbox}
                    />
                    {!isChecked && (
                        <CompanyAddressForm
                            values={values}
                            errors={errors}
                            touched={touched}
                            onChange={handleInputChange}
                            onCountryChange={handleCountry}
                            isTradingForm={!isChecked}
                        />
                    )}
                    <Button className={styles.submitBtn} type="submit" variant="contained">
                        Continue
                    </Button>
                </form>
            </div>
            <InfoModal isShown={isShown} onClose={toggleModal}>
                <Typography className={styles.modalText}>
                    A registered address is the official address of your company. It's on the public
                    record.
                </Typography>
                <Typography className={styles.modalText}>
                    A trading address is primarily where you would conduct your daily business
                    affairs from.
                </Typography>
            </InfoModal>
        </Navigations>
    );
};

export default BusinessAddress;
