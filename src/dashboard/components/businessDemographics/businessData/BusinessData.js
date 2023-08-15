import React, { useState, useEffect, useCallback } from "react";
import { useHistory } from "react-router-dom";
import { useFormik } from "formik";
import { getCompanyInfo } from "auth/services/businessData";
import CustomButton from "shared/components/CustomButton";
import Navigations from "dashboard/components/navigations/Navigations";
import { initUser } from "shared/helpers/auth";
import CountryDropdown from "shared/components/CountryDropdown";
import { parseErrorResponse, ErrorComponent } from "shared/components/Error";
import DatePicker from "shared/components/DatePicker";
import FormInput from "shared/components/FormInput";
import { postBusinessApi } from "dashboard/services/businessDemographicsService";
import BackButtonLayout from "shared/components/BackButtonLayout";
import { findCountry } from "shared/helpers/utils";
import { useStyles } from "./styles";

const validate = values => {
    const errors = {};
    if (!values.countryOfIncorporation) {
        errors.countryOfIncorporation = "Please select a country of incorporation";
    }
    if (!values.registrationNumber) {
        errors.registrationNumber = "Please enter a company number";
    }

    if (!values.legalName) {
        errors.legalName = "Please enter name of your company";
    }

    if (!values.dateOfIncorporation) {
        errors.dateOfIncorporation = "Please select a date of incorporation";
    }

    return errors;
};

const companyDataToDTO = (values, companyData, isCompanyFetchedFromApi) => {
    const registeredAddress = companyData?.registeredAddress;

    if (!isCompanyFetchedFromApi) {
        const res = {
            registrationNumber: values.registrationNumber,
            countryOfIncorporation: values.countryOfIncorporation.label,
            countryCode: values.countryOfIncorporation.code,
            legalName: values.legalName,
            dateOfIncorporation: values.dateOfIncorporation,
            isCompanyFetchedFromApi: false
        };
        return res;
    }

    const address = {
        address_1: registeredAddress?.street_address || registeredAddress?.address_1,
        town: registeredAddress?.locality || registeredAddress?.town,
        postCode: registeredAddress?.postal_code || registeredAddress?.postCode,
        countryCode: values.code,
        countryOfIncorporation: values.countryOfIncorporation.label || values.countryOfIncorporation,
    };

    const result = {
        registrationNumber: values.registrationNumber,
        countryOfIncorporation: values.countryOfIncorporation.label,
        countryCode: values.countryOfIncorporation.code,
        legalName: values.legalName,
        dateOfIncorporation: values.dateOfIncorporation,
        isCompanyFetchedFromApi,
        companyRegistryUrl: companyData?.companyRegistryUrl,
        registeredAddress: address
    };

    return result;
};

const BusinessData = () => {
    const type = sessionStorage.getItem("type");
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [companyData, setCompanyData] = useState(null);
    const [isCompanyFetchedFromApi, setIsCompanyFetchedFromApi] = useState(false);
    const [isExtraInfoFormShown, setIsExtraInfoFormShown] = useState(false);
    const [error, setError] = useState("");
    const history = useHistory();
    const styles = useStyles();

    const onSubmit = async values => {
        setIsLoading(true);
        const data = companyDataToDTO(values, companyData, isCompanyFetchedFromApi);

        try {
            await postBusinessApi("demographics/business", { ...data });
            history.push("/admin/business-address");
            setError("");
        } catch (error) {
            const message = parseErrorResponse(error);
            setError(message);
        }
        setIsLoading(false);
    };

    const formik = useFormik({
        initialValues: {
            registrationNumber: "",
            countryOfIncorporation: null,
            dateOfIncorporation: "",
            legalName: ""
        },
        onSubmit,
        validate
    });

    const goBack = () => {
        history.goBack();
    };

    const {
        values,
        handleSubmit,
        setFieldValue,
        handleChange,
        setFieldTouched,
        setFieldError,
        errors,
        touched
    } = formik;

    const initCompanyInfo = async (code, number) => {
        setIsLoading(true);
        try {
            const { data } = await getCompanyInfo(code, number);
            const requestData = {
                companyRegistryUrl: data?.companyRegistryUrl,
                registeredAddress: data?.registeredAddress
            };
            setCompanyData(requestData);
            setFieldValue("legalName", data.name);
            setFieldValue("dateOfIncorporation", data.dateOfIncorporation);
            setIsCompanyFetchedFromApi(true);
        } catch (error) {
            setFieldValue("legalName", "");
            setFieldValue("dateOfIncorporation", "");
            setIsCompanyFetchedFromApi(false);
        }
        setIsExtraInfoFormShown(true);
        setIsLoading(false);
    };

    const getUser = async () => {
        const user = await initUser();
        setUser(user);
    };
    useEffect(() => {
        getUser();
    }, []);

    useEffect(() => {
        if (!user) {
            return;
        }
        const demographics = user.businessDemographics;
        if (type !== "login" && demographics) {
            setFieldValue("registrationNumber", demographics?.registrationNumber || "");
            if (demographics?.countryOfIncorporation) {
                setFieldValue(
                    "countryOfIncorporation",
                    findCountry(demographics?.countryOfIncorporation, true)
                );
            }
            setFieldValue("legalName", demographics?.legalName || "");
            setFieldValue("dateOfIncorporation", demographics?.dateOfIncorporation || "");
            if (demographics.registrationNumber) {
                setIsExtraInfoFormShown(true);
            }
        }

        if (type === "login" && demographics) {
            setFieldValue("legalName", demographics?.legalName || "");
            setFieldValue("dateOfIncorporation", demographics?.dateOfIncorporation || "");
            setFieldValue("registrationNumber", demographics.registrationNumber || "");
            if (demographics?.countryOfIncorporation) {
                setFieldValue(
                    "countryOfIncorporation",
                    findCountry(demographics?.countryOfIncorporation, true)
                );
            }
        }
        const companyData = {
            companyRegistryUrl: user?.companyRegistryUrl,
            registeredAddress: user?.registeredAddress
        }
        setCompanyData(companyData);
        setIsCompanyFetchedFromApi(user.isCompanyFetchedFromApi)
    }, [user]);

    const handleChangeNumber = e => {
        const { value } = e.target;
        if (isExtraInfoFormShown) {
            setIsExtraInfoFormShown(false);
        }
        setFieldValue("registrationNumber", value);
    };

    const handleCountry = useCallback(
        country => {
            setFieldValue("countryOfIncorporation", country);
        },
        [values.countryOfIncorporation]
    );

    const handleCompanyInfo = async () => {
        await setFieldTouched('registrationNumber', true);
        if (values.registrationNumber && values.registrationNumber.length <= 4) {
            setFieldError("registrationNumber", "Invalid company number");
            return;
        }

        if (!values.countryOfIncorporation && !values.registrationNumber) {
            await handleSubmit();
        }
        const countryError = errors.countryOfIncorporation;
        const registerNumberError = errors.registrationNumber;

        if (!countryError && !registerNumberError) {
            initCompanyInfo(values.countryOfIncorporation?.code, values.registrationNumber);
        }
    };

    const handleChangeDate = date => {
        setFieldValue("dateOfIncorporation", date);
    };

    return (
        <Navigations>
            <div className={styles.container}>
                <form onSubmit={handleSubmit} className={styles.formWrapper}>
                    <BackButtonLayout
                        titleText="Company information"
                        subtitleText="Please add the information below, they need to be the same as on your certificate of incorporation."
                        onClick={goBack}
                    />
                    <CountryDropdown
                        title="Country of incorporation*"
                        className={styles.formField}
                        name="countryOfIncorporation"
                        errorMessage={errors.countryOfIncorporation}
                        hasError={
                            Boolean(errors.countryOfIncorporation) &&
                            Boolean(touched.countryOfIncorporation)
                        }
                        onChange={handleCountry}
                        value={values.countryOfIncorporation}
                    />
                    <FormInput
                        label="Company number*"
                        className={styles.formField}
                        hasError={Boolean(errors.registrationNumber) && touched.registrationNumber}
                        errorMessage={errors.registrationNumber}
                        name="registrationNumber"
                        value={values.registrationNumber}
                        onChange={handleChangeNumber}
                    />
                    {isExtraInfoFormShown && (
                        <>
                            <FormInput
                                name="legalName"
                                errorMessage={errors.legalName}
                                hasError={errors.legalName && touched.legalName}
                                className={styles.formField}
                                onChange={handleChange}
                                value={values.legalName}
                                label="Company name*"
                            />
                            <DatePicker
                                autoComplete="off"
                                dateFormat="dd-MM-yyyy"
                                errorMessage={errors.dateOfIncorporation}
                                hasError={errors.dateOfIncorporation && touched.dateOfIncorporation}
                                dropdownMode="select"
                                showMonthDropdown
                                showYearDropdown
                                className={styles.formField}
                                maxDate={new Date()}
                                label="Date of incorporation*"
                                value={values.dateOfIncorporation}
                                onChange={handleChangeDate}
                            />
                        </>
                    )}
                    <ErrorComponent message={error} />
                    <CustomButton
                        className={styles.continueBtn}
                        variant="contained"
                        type={isExtraInfoFormShown ? "submit" : "button"}
                        onClick={!isExtraInfoFormShown ? handleCompanyInfo : handleSubmit}
                        isLoading={isLoading}
                    >
                        Continue
                    </CustomButton>
                </form>
            </div>
        </Navigations>
    );
};

export default BusinessData;
