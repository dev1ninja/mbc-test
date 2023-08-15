import { TextField } from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";
import { array, func, object, string } from "prop-types";
import React from "react";

const InputAutoComplete = ({
    options,
    value,
    getOptionLabel,
    onChange,
    renderOption,
    placeholder,
    className,
    name
}) => {
    return (
        <Autocomplete
            autoComplete="off"
            options={options}
            autoHighlight
            getOptionLabel={getOptionLabel}
            value={value}
            onChange={onChange}
            name={name}
            renderOption={renderOption}
            renderInput={params => (
                <TextField
                    {...params}
                    placeholder={placeholder}
                    className={className}
                    inputProps={{
                        ...params.inputProps
                    }}
                />
            )}
        />
    );
};

export default InputAutoComplete;

InputAutoComplete.defaultProps = {
    placeholder: "",
    className: "",
    name: ""
};

InputAutoComplete.propTypes = {
    options: array.isRequired,
    value: object.isRequired,
    onChange: func.isRequired,
    getOptionLabel: func.isRequired,
    renderOption: func.isRequired,
    placeholder: string,
    className: string,
    name: string
};
