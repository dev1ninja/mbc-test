import React, { useCallback } from "react";
import { useFormik } from "formik";
import moment from "moment";
import { array, func, object } from "prop-types";
import CountryDropdown from "shared/components/CountryDropdown";
import { postBusinessApi } from "dashboard/services/businessDemographicsService";
import CustomButton from "shared/components/CustomButton";
import DatePicker from "shared/components/DatePicker";
import countries from "shared/constants/country";
import Dropdown from "shared/components/Dropdown";
import FormInput from "shared/components/FormInput";

import { useStyles } from "./styles";

const validate = values => {
    const errors = {};
    if (!values.firstName) {
        errors.firstName = "Please add first name";
    }
    if (!values.lastName) {
        errors.lastName = "Please add last name";
    }

    if (!values.gender) {
        errors.gender = "Please select gender";
    }
    if (!values.email) {
        errors.email = "Please add email address";
    }
    if (!values.nationality) {
        errors.nationality = "Please select a nationality";
    }
    if (!values.dateOfBirth) {
        errors.dateOfBirth = "Please select date of birth";
    }
    if (!values.countryOfBirth) {
        errors.countryOfBirth = "Please select country of birth";
    }
    return errors;
};

const directorsToDTO = (values, director, directors) => {
    const isEdit = director.hasOwnProperty("_id");
    const formattedDirector = {
        ...director,
        ...values,
        nationality: values.nationality.code,
        countryOfBirth: values.countryOfBirth.code
    };
    if (isEdit) {
        const { _id: id } = director;
        const directorIndex = directors.findIndex(({ _id: innerId }) => id === innerId);
        directors.splice(directorIndex, 1, formattedDirector);
        return directors;
    }

    const result = [...directors, formattedDirector];
    return result;
};

const GENDERS_MOCK = [
    { id: 1, name: "Male" },
    { id: 2, name: "Female" }
];

const EditDirectorForm = ({ director, directors, clearEditableDirector }) => {
    const styles = useStyles();

    const onSubmit = async values => {
        const newDirectors = directorsToDTO(values, director, directors);
        await postBusinessApi("directors", {
            directors: newDirectors
        });
        clearEditableDirector();
    };

    const getCountry = useCallback((code) => {
        const country = code ? countries.find(({code: innerCode}) => innerCode === code) : null;
        return country;
    }, [])

    const formik = useFormik({
        initialErrors: {
            firstName: "Required",
            lastName: "Required",
            gender: "Required",
            dob: "Required"
        },
        initialValues: {
            firstName: director?.firstName || "",
            lastName: director?.lastName || "",
            email: director?.email || "",
            gender: director?.gender || "",
            nationality: getCountry(director.nationality),
            dateOfBirth: director?.dateOfBirth || "",
            countryOfBirth: getCountry(director.countryOfBirth)
        },
        onSubmit,
        validate
    });

    const {
        values,
        errors,
        touched,
        handleChange,
        handleSubmit,
        setFieldValue,
        setErrors
    } = formik;

    const handleChangeDate = date => {
        setFieldValue("dateOfBirth", date);
    };

    const handleChangeGender = value => {
        setFieldValue("gender", value.name);
    };

    const handleSelect = (name, country) => {
        setFieldValue(name, country);
        setErrors({});
    };

    const firstNameError = Boolean(errors.firstName) && touched.firstName;
    const lastNameError = Boolean(errors.lastName) && touched.lastName;
    const genderError = Boolean(errors.gender) && touched.gender;
    const dobError = Boolean(errors.dateOfBirth) && touched.dateOfBirth;

    return (
        <form onSubmit={handleSubmit}>
            <FormInput
                label="First Name*"
                errorMessage={errors.firstName}
                hasError={firstNameError}
                value={values.firstName}
                name="firstName"
                onChange={handleChange}
            />
            <FormInput
                label="Last Name*"
                errorMessage={errors.lastName}
                hasError={lastNameError}
                value={values.lastName}
                name="lastName"
                onChange={handleChange}
            />
            <FormInput
                label="Email Address*"
                errorMessage={errors.email}
                hasError={Boolean(errors.email) && touched.email}
                value={values.email}
                name="email"
                onChange={handleChange}
            />
            <Dropdown
                label="Gender*"
                errorMessage={errors.gender}
                hasError={genderError}
                onChange={handleChangeGender}
                value={values.gender}
                options={GENDERS_MOCK}
            />
            <CountryDropdown
                errorMessage={errors.nationality}
                isNationality
                title="Nationality*"
                hasError={Boolean(errors.nationality) && touched.nationality}
                value={values.nationality}
                name="nationality"
                onChange={country => handleSelect("nationality", country)}
            />
            <DatePicker
                value={values.dateOfBirth}
                label="Date of birth*"
                name="dateOfBirth"
                onChange={handleChangeDate}
                errorMessage={errors.dateOfBirth}
                hasError={dobError}
                dateFormat="dd/MM/yyyy"
                dropdownMode="select"
                showMonthDropdown
                showYearDropdown
                maxDate={new Date(moment().subtract(18, "years"))}
            />
            <CountryDropdown
                errorMessage={errors.countryOfBirth}
                title="Country of birth*"
                hasError={Boolean(errors.countryOfBirth) && touched.countryOfBirth}
                value={values.countryOfBirth}
                name="countryOfBirth"
                onChange={country => handleSelect("countryOfBirth", country)}
            />
            <CustomButton className={styles.submitBtn} type="submit">
                Continue
            </CustomButton>
        </form>
    );
};

export default EditDirectorForm;

EditDirectorForm.propTypes = {
    director: object.isRequired,
    directors: array.isRequired,
    clearEditableDirector: func.isRequired
};
