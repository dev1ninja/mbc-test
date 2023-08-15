import React from 'react';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { TextField } from '@material-ui/core';
import PropTypes from 'prop-types';

const SearchableDropdown = ({ title, onChangeDropdown, value, options }) => {
    return (
        <Autocomplete
            options={options}
            autoHighlight
            getOptionLabel={option => (option ? option.name : '')}
            value={value}
            onChange={onChangeDropdown}
            autoComplete="off"
            noOptionsText="No Option Found"
            renderOption={option => <>{option.name}</>}
            renderInput={params => <TextField {...params} placeholder={title} variant="outlined" className="form-field-input" />}
        />
    );
};
SearchableDropdown.defaultProps = {
    value: null
};
SearchableDropdown.propTypes = {
    title: PropTypes.string.isRequired,
    onChangeDropdown: PropTypes.func.isRequired,
    value: PropTypes.objectOf(PropTypes.any),
    options: PropTypes.arrayOf(PropTypes.any).isRequired
};
export default SearchableDropdown;
