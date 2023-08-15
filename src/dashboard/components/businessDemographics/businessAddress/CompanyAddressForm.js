import React from "react";
import { bool, any, func } from "prop-types";
import CountryDropdown from "shared/components/CountryDropdown";
import FormInput from "shared/components/FormInput";

import { useStyles } from "./styles";

const CompanyAddressForm = ({
    isTradingForm,
    values,
    onChange,
    onCountryChange,
    toggleModal,
    errors,
    touched
}) => {
    const formName = isTradingForm ? "businessAddress" : "registeredAddress";
    const styles = useStyles();

    const getValue = key => {
        const value = values[formName][key];
        return value;
    };

    const getError = key => {
        const isTouched = touched[formName] && touched[formName][key]
        const error = isTouched && errors[formName] && errors[formName][key];
        return error;
    };

    const addressLabel = isTradingForm ? "Trading address*" : "Registered address*";

    return (
        <>
            <FormInput
                label={addressLabel}
                onInfoIconClick={toggleModal}
                hasError={Boolean(getError("address_1"))}
                errorMessage={getError("address_1")}
                className={styles.formField}
                onChange={onChange}
                name={`${formName}.address_1`}
                value={getValue("address_1")}
            />
            <FormInput
                label="City*"
                className={styles.formField}
                hasError={Boolean(getError("town"))}
                errorMessage={getError("town")}
                onChange={onChange}
                name={`${formName}.town`}
                value={getValue("town")}
            />
            <FormInput
                label="Postcode*"
                onChange={onChange}
                hasError={Boolean(getError("postCode"))}
                errorMessage={getError("postCode")}
                className={styles.formField}
                name={`${formName}.postCode`}
                value={getValue("postCode")}
            />
            <CountryDropdown
                title="Country*"
                hasError={Boolean(getError("countryOfIncorporation"))}
                errorMessage={getError("countryOfIncorporation")}
                className={styles.formField}
                value={getValue("countryOfIncorporation")}
                onChange={country => onCountryChange(`${formName}.countryOfIncorporation`, country)}
            />
        </>
    );
};

export default CompanyAddressForm;

CompanyAddressForm.defaultProps = {
    isTradingForm: false
};

CompanyAddressForm.propTypes = {
    isTradingForm: bool,
    onChange: func.isRequired,
    onCountryChange: func.isRequired,
    values: any.isRequired,
    toggleModal: func,
    errors: any.isRequired,
    touched: any.isRequired,
};
