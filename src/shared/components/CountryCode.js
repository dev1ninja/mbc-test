import React from "react";
import { TextField } from "@material-ui/core";
import PropTypes from "prop-types";
import Autocomplete, { createFilterOptions } from "@material-ui/lab/Autocomplete";
import Flag from "react-flagkit";
import countries from "../constants/country";

const CountryCodes = ({ title, onChangeCountry, value, name }) => {
    const filterOptions = createFilterOptions({
        stringify: option => option.label + option.phone
    });

    return (
        <Autocomplete
            options={countries}
            autoHighlight
            getOptionLabel={option => `+${option.phone}`}
            filterOptions={filterOptions}
            value={value}
            name={name}
            onChange={onChangeCountry}
            noOptionsText="No Country Found"
            renderOption={option => (
                <>
                    <Flag className="countryFlag" country={option.code} size={20} />+{option.phone}
                </>
            )}
            renderInput={params => (
                <TextField
                    {...params}
                    placeholder={title}
                    variant="outlined"
                    className="form-field-input countryCode"
                    inputProps={{
                        ...params.inputProps
                    }}
                />
            )}
        />
    );
};
CountryCodes.defaultProps = {
    value: null
};
CountryCodes.propTypes = {
    title: PropTypes.string.isRequired,
    onChangeCountry: PropTypes.func.isRequired,
    value: PropTypes.objectOf(PropTypes.any),
    name: PropTypes.string.isRequired
};
export default CountryCodes;
