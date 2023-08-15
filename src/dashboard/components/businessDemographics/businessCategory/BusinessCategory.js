import React, { useEffect, useState } from "react";
import Navigations from "dashboard/components/navigations/Navigations";
import { useHistory } from "react-router-dom";
import { useFormik } from "formik";

import BackButtonLayout from "shared/components/BackButtonLayout";
import CustomButton from "shared/components/CustomButton";
import { postBusinessApi } from "dashboard/services/businessDemographicsService";
import Dropdown from "shared/components/Dropdown";
import { getUser } from "auth/services/AuthService";
import { ErrorComponent, parseErrorResponse } from "shared/components/Error";
import FormInput from "shared/components/FormInput";
import CurrencyAutocomplete from "shared/components/CurrencyAutocomplete";
import getList from "dashboard/services/getBusinessTypeList";

import { useStyles } from "./styles";

const validate = values => {
    const errors = {};
    const checkCategory = values.natureOfBusiness.name === "Other";

    if (checkCategory && !values.categorySpecify) {
        errors.categorySpecify = "Please enter a business category";
    }

    if (!values.natureOfBusiness) {
        errors.natureOfBusiness = "Please select a business category";
    }

    if (!values.currency || !values.maxSinglePayment) {
        errors.currency = "Required";
    }

    return errors;
};

const BusinessCategory = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [natureOfBusinessData, setNatureOfBusinessData] = useState([]);
    const [error, setError] = useState('')
    const history = useHistory();
    const styles = useStyles();

    const initUser = async () => {
        const res = await getUser();
        return res?.data?.user;
    };

    const initData = async () => {
        setIsLoading(true);
        try {
            const user = await initUser();
            const resp = await getList("businessOptions");
            const { data } = resp;
            if (resp.status) {
                setNatureOfBusinessData(data.businessNatures);
            }
    
            if (user) {
                const isUK = user.registeredAddress && user.registeredAddress?.countryCode === "GB";
                setFieldValue("currency", isUK ? "GBP" : "EUR");
            }
    
            if (user && user?.businessDemographics) {
                const natureOfBusiness = data.businessNatures.find(
                    ({ name }) => name === user.businessDemographics?.natureOfBusiness
                );
    
                const checkCategory = user.businessDemographics?.natureOfBusiness && !natureOfBusiness
    
                setFieldValue("maxSinglePayment", user.businessDemographics?.maxSinglePayment || "");
                if (checkCategory) {
                    const otherCategory = data.businessNatures.find(({ name }) => name === "Other")
                    setFieldValue("natureOfBusiness", otherCategory);
                    setFieldValue('categorySpecify', user.businessDemographics?.natureOfBusiness)
                    setIsLoading(false);
                    return;
                }
                setFieldValue("natureOfBusiness", natureOfBusiness || "");
            }
        } catch (error) {
            const message = parseErrorResponse(error);
            setError(message);
        }
        
        setIsLoading(false);
    };

    useEffect(() => {
        initData();
    }, []);

    const onSubmit = async values => {
        const isString = typeof values.maxSinglePayment === "string";
        const currentInNumberPayment = isString
            ? +values.maxSinglePayment.replaceAll(",", "")
            : values.maxSinglePayment;

        setIsLoading(false);
        const resp = await postBusinessApi("demographics/business/category", {
            natureOfBusiness: values.categorySpecify || values.natureOfBusiness?.name,
            maxSinglePayment: currentInNumberPayment,
            currency: values.currency
        });
        if (resp.status === 200) {
            history.push("/admin/role-in-company");
        }
    };

    const goBack = () => {
        history.goBack();
    };

    const formik = useFormik({
        initialValues: {
            natureOfBusiness: "",
            categorySpecify: "",
            currency: "GBP",
            maxSinglePayment: ""
        },
        onSubmit,
        validate
    });

    const { handleSubmit, handleChange, values, errors, setFieldValue, touched } = formik;
    const onSelectBusiness = business => {
        setFieldValue("categorySpecify", "");
        setFieldValue("natureOfBusiness", business);
    };

    const isOtherCategory = values.natureOfBusiness.name === "Other";

    const handleChangeCurrency = async (e, currency) => {
        await handleChange(e);
        setFieldValue("currency", currency?.currencyCode || null);
    };

    return (
        <Navigations>
            <div className={styles.container}>
                <form onSubmit={handleSubmit} className={styles.formWrapper}>
                    <BackButtonLayout titleText="Business category" onClick={goBack} />
                    <Dropdown
                        label="Business category"
                        className={styles.formField}
                        onChange={onSelectBusiness}
                        options={natureOfBusinessData}
                        hasError={Boolean(errors.natureOfBusiness) && touched.natureOfBusiness}
                        errorMessage={errors.natureOfBusiness}
                        value={values.natureOfBusiness}
                    />
                    {isOtherCategory && (
                        <FormInput
                            label="Specify category*"
                            onChange={handleChange}
                            hasError={Boolean(errors.categorySpecify) && touched.categorySpecify}
                            errorMessage={errors.categorySpecify}
                            name="categorySpecify"
                            value={values.categorySpecify}
                        />
                    )}
                    <CurrencyAutocomplete
                        label="Maximum expected single payment"
                        defaultCurrency={values.currency}
                        onChange={handleChangeCurrency}
                        name="maxSinglePayment"
                        hasError={
                            Boolean(errors.currency || errors.maxSinglePayment) &&
                            touched.maxSinglePayment
                        }
                        value={values.maxSinglePayment}
                    />
                    <ErrorComponent message={error} />
                    <CustomButton type="submit" variant="contained" isLoading={isLoading}>
                        Continue
                    </CustomButton>
                </form>
            </div>
        </Navigations>
    );
};

export default BusinessCategory;
