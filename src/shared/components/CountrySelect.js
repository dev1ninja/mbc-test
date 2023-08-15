import React from "react";
import { TextField } from "@material-ui/core";
import PropTypes from "prop-types";
import Autocomplete from "@material-ui/lab/Autocomplete";
import Flag from "react-flagkit";
import countries from "../constants/country";

const CountrySelect = ({ title, onChangeCountry, value }) => {
    return (
        <Autocomplete
            options={countries}
            autoHighlight
            getOptionLabel={option => option.label}
            value={value}
            onChange={onChangeCountry}
            noOptionsText="No Country Found"
            autoComplete="off"
            renderOption={option => (
                <>
                    <Flag className="countryFlag" country={option.code} size={20} />
                    {option.label}
                </>
            )}
            renderInput={params => (
                <TextField
                    {...params}
                    placeholder={title}
                    variant="outlined"
                    className="form-field-input"
                    inputProps={{
                        ...params.inputProps
                    }}
                />
            )}
        />
    );
};
CountrySelect.defaultProps = {
    value: null
};
CountrySelect.propTypes = {
    title: PropTypes.string.isRequired,
    onChangeCountry: PropTypes.func.isRequired,
    value: PropTypes.objectOf(PropTypes.any)
};
export default CountrySelect;
