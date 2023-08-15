import React, { useEffect, useRef, useState } from "react";
import { Box, Button, ClickAwayListener, Typography } from "@material-ui/core";
import { bool, func } from "prop-types";
import { useFormik } from "formik";
import moment from "moment";
import { initUser } from "shared/helpers/auth";
import { findCountry, onPressKeyHandler, onPressKeyEnter } from "shared/helpers/utils";
import DatePicker from "shared/components/DatePicker";
import ErrorIcon from "@material-ui/icons/Error";
import { useHistory } from "react-router-dom";
import CustomButton from "shared/components/CustomButton";
import FormInput from "shared/components/FormInput";
import Dropdown from "shared/components/Dropdown";
import CountryDropdown from "shared/components/CountryDropdown";
import getPostcodeAddressReq from "dashboard/services/PostcodeService";

import { useStyles } from "./styles";

const GENDERS_MOCK = [
    { id: 1, name: "Male" },
    { id: 2, name: "Female" }
];

const UK_CODE = "GB";

const validate = values => {
    const errors = {};
    if (!values.firstName) {
        errors.firstName = "Enter your first name";
    }
    if (!values.lastName) {
        errors.lastName = "Enter your last name";
    }
    if (!values.gender) {
        errors.gender = "Select your gender";
    }
    if (!values.nationality) {
        errors.nationality = "Select your nationality";
    }
    if (!values.dob) {
        errors.dob = "Enter your date of birth";
    }
    if (!values.placeOfBirth) {
        errors.placeOfBirth = "Select your country of birth";
    }
    if (!values.countryOfResidence) {
        errors.countryOfResidence = "Select country";
    }
    if (!values.postCode) {
        errors.postCode = "Enter your postcode";
    }
    if (!values.address1) {
        errors.address1 = "Enter your address";
    }
    if (!values.town) {
        errors.town = "Enter your city";
    }

    return errors;
};

const API_REQUEST_RICHED_LIMIT_STATUS_CODE = 429;

const PersonalDemographicsForm = ({ onSubmit, forbidden, isLoading, setIsLoading }) => {
    const history = useHistory();
    const [user, setUser] = useState(null);
    const [isAddressExist, setIsAddressExist] = useState(false);
    const [isManuallyTextShown, setIsManuallyTextShown] = useState(false);
    const [isAddressFormShown, setIsAddressFormShown] = useState(false);
    const [isSelectedManually, setIsSelectedManually] = useState(true);
    const [isPostcodeDropdownShown, setIsPostcodeDropdownShown] = useState(false);
    const [isMenuallyFormShown, setIsMenuallyFormShown] = useState(false);
    const [postcodeAddresses, setPostcodeAddresses] = useState([]);
    const styles = useStyles();
    const dropdownRef = useRef();

    const submit = async values => {
        let error;
        if (isUKSelected) {
            error = await findAddress(true, { type: 'click' });
        }

        const isShouldSubmit = error && error.response.status !== API_REQUEST_RICHED_LIMIT_STATUS_CODE;
        if (isShouldSubmit) {
            return;
        }
        await onSubmit(values);
    };

    const formik = useFormik({
        initialErrors: {
            firstName: "Required",
            lastName: "Required",
            gender: "Required",
            dob: "Required"
        },
        initialValues: {
            firstName: "",
            lastName: "",
            gender: "",
            nationality: null,
            dob: "",
            placeOfBirth: null,
            countryOfResidence: null,
            postCode: "",
            address1: "",
            address2: "",
            town: ""
        },
        onSubmit: submit,
        validate
    });

    const getUser = async () => {
        setIsLoading(true);
        const user = await initUser();
        setUser(user);
        setIsLoading(false);
    };

    const {
        values,
        errors,
        touched,
        setValues,
        handleChange,
        handleSubmit,
        setFieldValue,
        setErrors
    } = formik;

    useEffect(() => {
        getUser();
    }, []);

    const initPage = async () => {
        const nationality = findCountry(user?.nationality);
        const placeOfBirth = findCountry(user?.nationality);
        const countryOfResidence = findCountry(user?.homeAddress?.countryCode);
        await setValues({
            firstName: user?.firstName || "",
            lastName: user?.lastName || "",
            gender: user?.gender || "",
            nationality,
            dob: user?.dob || "",
            placeOfBirth,
            address1: user?.homeAddress?.address_1 || "",
            address2: user?.homeAddress?.address_2 || "",
            countryOfResidence,
            town: user?.homeAddress?.town || "",
            postCode: user?.homeAddress?.postCode || ""
        });
        if (history.location?.state?.veriff) {
            handleSubmit();
        }
    }

    useEffect(() => {
        if (user) {
            initPage();
        }
    }, [user, history]);

    useEffect(() => {
        if (user?.homeAddress?.postCode) {
            setIsMenuallyFormShown(true);
            setIsSelectedManually(false);
        }
    }, [isAddressFormShown]);

    const isUKSelected = values.countryOfResidence?.code === UK_CODE;
    const isShouldShowSearchForm = values.countryOfResidence && !isUKSelected;

    const handleSelect = (name, country) => {
        const isCountryOfResidence = name === "countryOfResidence";
        const isNotUK = country?.code !== UK_CODE;
        if (isCountryOfResidence && isNotUK) {
            setIsManuallyTextShown(false);
            setIsSelectedManually(false);
            setIsMenuallyFormShown(true);
        }
        setIsManuallyTextShown(true);
        setFieldValue(name, country);
        setErrors({});
    };

    const findAddress = async (isSubmit, e) => {
        const verificationKey = onPressKeyHandler(e);
        if(verificationKey)   {
            if (values.postCode) {
                try {
                    const resp = await getPostcodeAddressReq(values.postCode);
                    if (resp.status) {
                        setPostcodeAddresses(resp.data.addresses);
                        setIsPostcodeDropdownShown(!isSubmit);
                    }
                    return null;
                } catch (error) {
                    setErrors({ postCode: "Invalid postcode" });
                    return error;
                }
            }
        }
        return null;
    };

    const handleChangeDate = date => {
        setFieldValue("dob", date);
    };

    const handleChangeGender = value => {
        setFieldValue("gender", value.name);
    };

    const isShouldRenderMenuallyForm = isAddressExist || isMenuallyFormShown;
    const title = !isAddressFormShown ? "Personal details" : "Address";
    const firstNameError = Boolean(errors.firstName) && touched.firstName;
    const lastNameError = Boolean(errors.lastName) && touched.lastName;
    const genderError = Boolean(errors.gender) && touched.gender;
    const dobError = Boolean(errors.dob) && touched.dob;

    const handleStep = () => {
        const validFields = [
            Boolean(errors.firstName),
            Boolean(errors.lastName),
            Boolean(errors.gender),
            Boolean(errors.dob),
            Boolean(errors.nationality),
            Boolean(errors.placeOfBirth)
        ];
        const isShouldShowNextStep = validFields.every(error => !error);
        if (isShouldShowNextStep) {
            setIsAddressFormShown(true);
            setErrors({});
        } else {
            handleSubmit();
        }
    };

    const toggleMenuallyForm = (e) => {
        const verificationKey = onPressKeyHandler(e);
        if(verificationKey)   {
            setIsManuallyTextShown(false);
            setIsMenuallyFormShown(true);
            if (isSelectedManually) {
                setIsSelectedManually(false);
            }
        }
    };

    const closeAddressDropdown = () => {
        setIsPostcodeDropdownShown(false);
    };

    const handleFocusPostcode = () => {
        if (postcodeAddresses.length) {
            dropdownRef.current?.focus();
            setIsPostcodeDropdownShown(true);
        }
    };

    const handleChangePostcode = e => {
        setPostcodeAddresses([]);
        handleChange(e);
    };

    const handleAddress = (address, e) => {
        const verificationKey = onPressKeyHandler(e);
        if(verificationKey)   {
            setValues({
                ...values,
                address1: address.line_1 || '',
                address2: address.line_2 || '',
                town: address.town_or_city
            });
            setErrors({});
            setIsSelectedManually(true);
            setIsManuallyTextShown(true);
            setIsAddressExist(true);
            setIsPostcodeDropdownShown(false);
        }
    };

    const isMenually = !isMenuallyFormShown || isSelectedManually;

    const isShouldShowManuallyText =
        isMenually &&
        isAddressFormShown &&
        values.countryOfResidence &&
        isUKSelected &&
        isManuallyTextShown;

    const onKeyDown = (e) =>{
        if (onPressKeyEnter(e)) {
            e.preventDefault();
        }
    }

    return (
        <div className={styles.container}>
            <form
                onSubmit={handleSubmit}
                className={styles.formContainer}
            >
                <Typography className={styles.title}>{title}</Typography>
                <Typography className={styles.subtitle}>Let's start with the simplest!</Typography>
                {!isAddressFormShown && (
                    <>
                        <FormInput
                            label="First Name*"
                            className={styles.formField}
                            errorMessage={errors.firstName}
                            hasError={firstNameError}
                            value={values.firstName}
                            name="firstName"
                            onChange={handleChange}
                        />
                        <FormInput
                            label="Last Name*"
                            className={styles.formField}
                            errorMessage={errors.lastName}
                            hasError={lastNameError}
                            value={values.lastName}
                            name="lastName"
                            onChange={handleChange}
                        />
                        <Dropdown
                            label="Gender*"
                            className={styles.formField}
                            errorMessage={errors.gender}
                            hasError={genderError}
                            onChange={handleChangeGender}
                            value={values.gender}
                            options={GENDERS_MOCK}
                        />
                        <CountryDropdown
                            className={styles.formField}
                            errorMessage={errors.nationality}
                            title="Nationality*"
                            hasError={Boolean(errors.nationality) && touched.nationality}
                            isNationality
                            value={values.nationality}
                            name="nationality"
                            onChange={country => handleSelect("nationality", country)}
                        />
                        <DatePicker
                            value={values.dob}
                            className={styles.formField}
                            label="Date of birth*"
                            name="dob"
                            onChange={handleChangeDate}
                            errorMessage={errors.dob}
                            hasError={dobError}
                            dateFormat="dd/MM/yyyy"
                            dropdownMode="select"
                            showMonthDropdown
                            showYearDropdown
                            maxDate={new Date(moment().subtract(18, "years"))}
                        />
                        <CountryDropdown
                            className={styles.formField}
                            errorMessage={errors.placeOfBirth}
                            title="Country of birth*"
                            hasError={Boolean(errors.placeOfBirth) && touched.placeOfBirth}
                            value={values.placeOfBirth}
                            name="placeOfBirth"
                            onChange={country => handleSelect("placeOfBirth", country)}
                        />
                    </>
                )}
                {isAddressFormShown && (
                    <>
                        <CountryDropdown
                            title="Country of residence*"
                            className={styles.fullWidthField}
                            value={values.countryOfResidence}
                            errorMessage={errors.countryOfResidence}
                            hasError={
                                Boolean(errors.countryOfResidence) && touched.countryOfResidence
                            }
                            name="countryOfResidence"
                            onChange={country => handleSelect("countryOfResidence", country)}
                        />
                        {values.countryOfResidence && isUKSelected && (
                            <div className={styles.postCodeWrapper} >
                                <ClickAwayListener onClickAway={closeAddressDropdown}>
                                    <Box className={styles.postcodeContainer}>
                                        <FormInput
                                            label="Search your postcode*"
                                            className={styles.searchPostcode}
                                            hasError={Boolean(errors.postCode) && touched.postCode}
                                            value={values.postCode}
                                            onKeyDown={(e) => findAddress(false, e)}
                                            onKeyPress={onKeyDown}
                                            errorMessage={errors.postCode}
                                            onFocus={handleFocusPostcode}
                                            name="postCode"
                                            onChange={handleChangePostcode}
                                        />
                                        {isPostcodeDropdownShown && (
                                            <div
                                                ref={dropdownRef}
                                                className={styles.postcodeDropdown}
                                            >
                                                <Box className={styles.postcodeAddressWrapper}>
                                                    {Boolean(postcodeAddresses.length) &&
                                                        postcodeAddresses.map(item => {
                                                            const address = item.formatted_address
                                                                .filter(Boolean)
                                                                .join(", ");
                                                            return (
                                                                <Box
                                                                    tabIndex={0}
                                                                    key={address}
                                                                    className={styles.address}
                                                                    onClick={(e) =>
                                                                        handleAddress(item, e)
                                                                    }
                                                                    onKeyDown={(e) =>
                                                                        handleAddress(item, e)
                                                                    }
                                                                >
                                                                    {address}
                                                                </Box>
                                                            );
                                                        })}
                                                </Box>
                                            </div>
                                        )}
                                    </Box>
                                </ClickAwayListener>
                                <Button
                                    className={styles.findAddressBtn}
                                    variant="outlined"
                                    color="default"
                                    onClick={(e) => findAddress(false, e)}
                                    onKeyDown={(e) => findAddress(false, e)}
                                >
                                    Search
                                </Button>
                            </div>
                        )}
                    </>
                )}
                {isShouldShowManuallyText && (
                    <Typography className={styles.manually} tabIndex={0} onClick={toggleMenuallyForm} onKeyDown={toggleMenuallyForm}>
                        Enter address manually
                    </Typography>
                )}
                {isShouldRenderMenuallyForm && (
                    <>
                        {isShouldShowSearchForm && (
                            <FormInput
                                label="Postcode*"
                                value={values.postCode}
                                hasError={Boolean(errors.postCode) && touched.postCode}
                                errorMessage={errors.postCode}
                                name="postCode"
                                onChange={handleChange}
                                className={styles.fullWidthField}
                            />
                        )}
                        <FormInput
                            label="1st line of address*"
                            value={values.address1}
                            hasError={Boolean(errors.address1) && touched.address1}
                            errorMessage={errors.address1}
                            name="address1"
                            disabled={isSelectedManually}
                            onChange={handleChange}
                            className={styles.fullWidthField}
                        />
                        <FormInput
                            label="2nd line of address"
                            value={values.address2}
                            name="address2"
                            disabled={isSelectedManually}
                            onChange={handleChange}
                            className={styles.fullWidthField}
                        />
                        <FormInput
                            label="City*"
                            onChange={handleChange}
                            hasError={Boolean(errors.town) && touched.town}
                            errorMessage={errors.town}
                            name="town"
                            disabled={isSelectedManually}
                            value={values.town}
                            className={styles.formField}
                        />
                    </>
                )}
                {forbidden && (
                    <form className="form-wrapper">
                        <div className="errorMessage">
                            <ErrorIcon />
                            Sorry but we do not yet support your nationality and you cannot continue
                            the registration process. We will contact you as soon as you are
                            eligible to join Incard!
                        </div>
                    </form>
                )}
                {!isAddressFormShown && (
                    <CustomButton
                        className={styles.continueBtn}
                        onClick={handleStep}
                        isLoading={isLoading}
                        variant="contained"
                    >
                        Continue
                    </CustomButton>
                )}
                {isAddressFormShown && (
                    <CustomButton
                        type={isAddressFormShown ? "submit" : "button"}
                        className={styles.continueBtn}
                        isLoading={isLoading}
                        variant="contained"
                    >
                        Continue
                    </CustomButton>
                )}
            </form>
        </div>
    );
};

export default PersonalDemographicsForm;

PersonalDemographicsForm.defaultProps = {};

PersonalDemographicsForm.propTypes = {
    forbidden: bool.isRequired,
    setIsLoading: func.isRequired,
    onSubmit: func.isRequired,
    isLoading: bool.isRequired
};
