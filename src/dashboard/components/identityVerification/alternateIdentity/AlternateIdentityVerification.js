import React, { Component } from 'react';
import ReactRouterPropTypes from 'react-router-prop-types';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import './AlternateIdentityVerification.scss';
import { TextField, Button } from '@material-ui/core';
import CloudUploadOutlinedIcon from '@material-ui/icons/CloudUploadOutlined';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import logo from '../../../../assets/images/logo.png';
import 'react-datepicker/dist/react-datepicker.css';
import CountrySelect from '../../../../shared/components/CountrySelect';
import { alternateVerification, alternateUserVerification } from '../../../services/IdentityVerificationService';

class AlternateIdentityVerification extends Component {
    constructor(props) {
        super(props);
        this.state = {
            foreName: '',
            surname: '',
            postcode: '',
            houseNameNumber: '',
            country: '',
            file: '',
            dob: '',
            fileName: '',
            mandatoryFields: false
        };
    }

    handleChangeDate = date => {
        this.setState(
            {
                dob: date
            },
            this.checkMendateComplete
        );
    };

    // Handling the form inputs
    handleChange = (field, value) => {
        this.setState(
            {
                [field]: value
            },
            this.checkMendateComplete
        );
    };

    checkMendateComplete = () => {
        const { surname, foreName, postcode, houseNameNumber, country, file, dob } = this.state;
        if (surname !== '' && foreName !== '' && postcode !== '' && houseNameNumber !== '' && country !== '' && file !== '' && dob !== '') {
            this.setState({ mandatoryFields: true });
        } else {
            this.setState({ mandatoryFields: false });
        }
    };

    fileReader = e => {
        this.setState(
            {
                file: e.target.files[0],
                fileName: e.target.files[0].name
            },
            this.checkMendateComplete
        );
    };

    reUpload = () => {
        this.setState(
            {
                file: '',
                fileName: ''
            },
            this.checkMendateComplete
        );
    };

    submit = async () => {
        const { surname, foreName, postcode, houseNameNumber, country, file, dob } = this.state;
        const { history } = this.props;
        const email = sessionStorage.getItem('email');
        const year = moment(dob).format('YYYY');
        const month = moment(dob).format('M');
        const day = moment(dob).format('D');
        let resp;
        if (email) {
            resp = await alternateUserVerification('alternate/verifyCompanyMembers', {
                surname,
                foreName,
                postcode,
                houseNameNumber,
                country: country.label,
                file,
                email,
                yearOfBirth: year,
                monthOfBirth: month,
                dayOfBirth: day,
                id: sessionStorage.getItem('userId')
            });
        } else {
            resp = await alternateVerification('verify/alternativeIdentity', {
                surname,
                foreName,
                postcode,
                houseNameNumber,
                country: country.label,
                file,
                yearOfBirth: year,
                monthOfBirth: month,
                dayOfBirth: day,
                id: sessionStorage.getItem('userId')
            });
        }

        if (resp.status) {
            history.push('/auth/alternate-identity-success');
        }
    };

    render() {
        const { surname, foreName, postcode, houseNameNumber, dob, country, mandatoryFields, fileName } = this.state;
        return (
            <div className="content">
                <div className="wrapper-content">
                    <div className="image-content">
                        <img src={logo} alt="logo" />
                    </div>
                    <form className="form-wrapper">
                        <TextField
                            autoComplete="off"
                            className="form-field-input"
                            placeholder="First name*"
                            variant="outlined"
                            value={foreName}
                            name="foreName"
                            onChange={e => this.handleChange('foreName', e.target.value)}
                        />
                        <TextField
                            autoComplete="off"
                            className="form-field-input"
                            placeholder="Surname*"
                            variant="outlined"
                            value={surname}
                            name="surname"
                            onChange={e => this.handleChange('surname', e.target.value)}
                        />
                        <DatePicker
                            autoComplete="off"
                            selected={dob}
                            className="form-field-input"
                            name="dob"
                            onChange={this.handleChangeDate}
                            placeholderText="Date of birth*"
                            dateFormat="dd-MM-yyyy"
                            dropdownMode="select"
                            showMonthDropdown
                            showYearDropdown
                            maxDate={new Date(moment().subtract(18, 'years'))}
                        />
                        <TextField
                            autoComplete="off"
                            className="form-field-input"
                            placeholder="House name/number*"
                            variant="outlined"
                            value={houseNameNumber}
                            name="houseNameNumber"
                            onChange={e => this.handleChange('houseNameNumber', e.target.value)}
                        />
                        <TextField
                            autoComplete="off"
                            className="form-field-input"
                            placeholder="Postcode*"
                            variant="outlined"
                            value={postcode}
                            name="postcode"
                            onChange={e => this.handleChange('postcode', e.target.value)}
                        />
                        <CountrySelect title="Country*" value={country} onChangeCountry={(e, value) => this.handleChange('country', value)} />
                        {!fileName && (
                            <div className="file-uploader">
                                <label htmlFor="file-input" className="">
                                    <CloudUploadOutlinedIcon fontSize="large" />
                                    <br />
                                    Upload a file{' '}
                                </label>
                                <input id="file-input" type="file" accept="image/*" capture="environment" className="" onChange={e => this.fileReader(e)} />
                            </div>
                        )}
                        {fileName && (
                            <div className="file-present">
                                <div className="file-name">{fileName}</div>
                                <HighlightOffIcon
                                    onClick={this.reUpload}
                                    role="button"
                                    tabIndex={0}
                                    onKeyDown={ev => {
                                        ev.preventDefault();
                                    }}
                                />
                            </div>
                        )}
                        <Button type="button" className="form-button" variant="contained" disabled={!mandatoryFields} onClick={this.submit}>
                            Submit for verification
                        </Button>
                    </form>
                </div>
            </div>
        );
    }
}
export default AlternateIdentityVerification;
AlternateIdentityVerification.propTypes = {
    history: ReactRouterPropTypes.history.isRequired
};
