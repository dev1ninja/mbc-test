import { TextField } from '@material-ui/core';
import React from 'react';
import PropTypes from 'prop-types';
import CountrySelect from '../../../shared/components/CountrySelect';

const PostCodeAddress = ({ address1, address2, houseNameNumber, town, postCode, country, handleChange }) => {
    return (
        <div>
            <div className="twoColumnInput">
                <TextField className="form-field-input" placeholder="Postcode*" variant="outlined" value={postCode} name="postCode" onChange={e => handleChange('postCode', e.target.value)} />
                <TextField
                    className="form-field-input"
                    placeholder="House Name / Number*"
                    variant="outlined"
                    value={houseNameNumber}
                    name="houseNameNumber"
                    onChange={e => handleChange('houseNameNumber', e.target.value)}
                />
            </div>
            <div className="twoColumnInput">
                <TextField className="form-field-input" placeholder="Address line 1*" variant="outlined" value={address1} name="address1" onChange={e => handleChange('address1', e.target.value)} />
                <TextField className="form-field-input" placeholder="Address line 2" variant="outlined" value={address2} name="address2" onChange={e => handleChange('address2', e.target.value)} />
            </div>
            <div className="twoColumnInput">
                <TextField className="form-field-input" placeholder="Town*" variant="outlined" value={town} name="town" onChange={e => handleChange('town', e.target.value)} />
                <CountrySelect title="Country*" value={country} onChangeCountry={(e, value) => handleChange('country', value)} />
            </div>
        </div>
    );
};
PostCodeAddress.defaultProps = {
    country: null
};
PostCodeAddress.propTypes = {
    address1: PropTypes.string.isRequired,
    address2: PropTypes.string.isRequired,
    postCode: PropTypes.string.isRequired,
    town: PropTypes.string.isRequired,
    houseNameNumber: PropTypes.string.isRequired,
    country: PropTypes.objectOf(PropTypes.any),
    handleChange: PropTypes.func.isRequired
};
export default PostCodeAddress;
