import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as _ from 'underscore';
import { connect } from 'react-redux';
import { Button, Dialog, DialogContent, Typography, DialogTitle, IconButton, TextField, InputAdornment } from '@material-ui/core';
import DoneIcon from '@material-ui/icons/Done';
import CloseIcon from '@material-ui/icons/Close';
import './CompanyMemberDilalog.scss';
import { EMAIL, PHONENUMBER } from '../../../../shared/helpers/validations/PatternConstants';
import errors from '../../../../shared/helpers/validations/Validation';
import SearchableDropdown from '../../../../shared/components/SearchableDropdown';
import { saveMembers } from '../../../../shared/redux/addMember/Action';
import CountryCode from '../../../../shared/components/CountryCode';
import countries from '../../../../shared/constants/country';

const roleInCompanyData = [
    {
        id: 1,
        name: 'Director'
    },
    {
        id: 2,
        name: 'Beneficial owner'
    },
    {
        id: 3,
        name: 'Partner'
    }
];

class CompanyMemberDilalog extends Component {
    constructor(props) {
        super(props);
        this.state = {
            countryCodeObj: null,
            countryCode: '',
            open: false,
            firstName: '',
            lastName: '',
            aliasesNames: '',
            email: '',
            phoneNumber: '',
            roleInCompany: null,
            percOfVotingRightsOrShares: '',
            mobileError: false,
            emailError: false,
            isValid: false,
            mandatoryFields: false
        };
    }

    componentDidMount() {
        const { showDialog } = this.props;
        const countryPreselected = _.findWhere(countries, { code: 'GB' });
        this.setState({ countryCodeObj: countryPreselected });
        if (showDialog) {
            this.setState({
                open: true
            });
        } else {
            this.setState({
                open: false
            });
        }
    }

    // Validation of form and returning icons also
    showEmailValidStatus = (field, message) => {
        const { isValid } = this.state;
        return isValid ? <DoneIcon color="primary" /> : errors(message);
    };

    showPhoneValidStatus = (field, message) => {
        const { mobileError } = this.state;
        return !mobileError ? <DoneIcon color="primary" /> : errors(message);
    };

    handleChange = (field, value) => {
        if (field === 'percOfVotingRightsOrShares') {
            if (value <= 100 && value >= 0) {
                this.setState(
                    {
                        [field]: value
                    },
                    () => this.checkMandatory()
                );
            }
        } else {
            this.setState(
                {
                    [field]: value
                },
                () => {
                    if (field === 'email') {
                        this.checkEmail();
                    }
                    if (field === 'phoneNumber' || field === 'countryCodeObj') {
                        this.checkPhone();
                    }
                }
            );
        }
    };

    checkMandatory = () => {
        const { lastName, firstName, email, phoneNumber, roleInCompany, percOfVotingRightsOrShares, countryCode, mobileError, isValid } = this.state;
        if (lastName !== '' && firstName !== '' && email !== '' && phoneNumber !== '' && roleInCompany !== '' && percOfVotingRightsOrShares !== '' && countryCode !== '') {
            if (!mobileError && isValid) {
                this.setState({ mandatoryFields: true });
            } else {
                this.setState({ mandatoryFields: false });
            }
        } else {
            this.setState({ mandatoryFields: false });
        }
    };

    // Checking if country code and mobile number is entered
    checkPhone = () => {
        const { countryCodeObj, phoneNumber } = this.state;
        const matched = PHONENUMBER.test(phoneNumber);
        if (phoneNumber !== '' && matched && countryCodeObj !== null) {
            this.setState({ countryCode: countryCodeObj, mobileError: false }, () => this.checkMandatory());
        } else {
            this.setState(
                {
                    countryCode: '',
                    mobileError: true
                },
                () => this.checkMandatory()
            );
        }
    };

    // Checking if the mendate field is filled or not
    checkEmail = () => {
        const { email } = this.state;
        const matched = EMAIL.test(email); // Cheking if mail format is matching or not
        this.setState(
            {
                isValid: matched,
                emailError: !matched
            },
            () => this.checkMandatory()
        );
    };

    handleClose = () => {
        const { closeMemberDialog } = this.props;
        closeMemberDialog(false);
        this.setState({
            open: false
        });
    };

    submit = () => {
        const { closeMemberDialog, saveMember } = this.props;
        const { lastName, firstName, aliasesNames, email, phoneNumber, roleInCompany, percOfVotingRightsOrShares, countryCode } = this.state;
        closeMemberDialog(false);
        this.setState({
            open: false
        });
        const memberObj = {
            lastName,
            firstName,
            aliasesNames,
            email,
            phoneNumber,
            countryCode,
            role: roleInCompany.name,
            percOfVotingRightsOrShares: +percOfVotingRightsOrShares
        };
        saveMember(memberObj);
    };

    render() {
        const { open, lastName, firstName, aliasesNames, email, phoneNumber, roleInCompany, percOfVotingRightsOrShares, mobileError, emailError, countryCodeObj, mandatoryFields } = this.state;
        return (
            <Dialog open={open} className="dialog">
                <DialogTitle>
                    <Typography>
                        Add a company member
                        <IconButton aria-label="close" className="close" onClick={this.handleClose}>
                            <CloseIcon />
                        </IconButton>
                    </Typography>
                </DialogTitle>
                <DialogContent>
                    <form className="form-wrapper">
                        <div className="twoColumnInput">
                            <TextField
                                autoComplete="off"
                                className="form-field-input"
                                placeholder="Legal first name*"
                                variant="outlined"
                                value={firstName}
                                name="firstName"
                                onChange={e => this.handleChange('firstName', e.target.value)}
                            />
                            <TextField
                                autoComplete="off"
                                className="form-field-input"
                                placeholder="Legal last name*"
                                variant="outlined"
                                value={lastName}
                                name="lastName"
                                onChange={e => this.handleChange('lastName', e.target.value)}
                            />
                        </div>
                        <TextField
                            autoComplete="off"
                            className="form-field-input"
                            placeholder="Alias name"
                            variant="outlined"
                            value={aliasesNames}
                            name="aliasesNames"
                            onChange={e => this.handleChange('aliasesNames', e.target.value)}
                        />
                        <TextField
                            className={`form-field-input ${emailError ? 'error' : 'correct'}`}
                            required
                            variant="outlined"
                            placeholder="Email*"
                            name="email"
                            value={email}
                            onChange={e => this.handleChange('email', e.target.value)}
                            InputProps={{
                                endAdornment: email !== '' && <InputAdornment position="end">{this.showEmailValidStatus('email', 'Please enter a valid email address!')}</InputAdornment>
                            }}
                        />
                        <div className="twoColumnInput">
                            <CountryCode title="+44*" value={countryCodeObj} onChangeCountry={(e, value) => this.handleChange('countryCodeObj', value)} />
                            <TextField
                                className={`form-field-input phoneNumber ${mobileError ? 'error' : ''}`}
                                placeholder="Phone number*"
                                variant="outlined"
                                value={phoneNumber}
                                type="number"
                                name="phoneNumber"
                                onChange={e => this.handleChange('phoneNumber', e.target.value)}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">{phoneNumber.length > 0 && this.showPhoneValidStatus('phoneNumber', 'Please enter a valid phone number')}</InputAdornment>
                                    )
                                }}
                            />
                        </div>
                        <SearchableDropdown title="Role in the company*" value={roleInCompany} onChangeDropdown={(e, value) => this.handleChange('roleInCompany', value)} options={roleInCompanyData} />
                        {/* <div className="shareHolderBind">
                            <Typography variant="subtitle2">Please enter your percentage of voting rights or shares*</Typography>
                            <div className="shareHolderWrapper">
                                <TextField
                                    className="form-field-input"
                                    variant="outlined"
                                    value={percOfVotingRightsOrShares}
                                    type="number"
                                    name="percOfVotingRightsOrShares"
                                    onChange={e => this.handleChange('percOfVotingRightsOrShares', e.target.value)}
                                    InputProps={{
                                        endAdornment: <InputAdornment position="end">%</InputAdornment>
                                    }}
                                />
                            </div>
                        </div> */}
                        <div className="shareHolderBind">
                            <Typography variant="subtitle2">Please enter your percentage of voting rights or shares</Typography>
                            <div className="shareHolderWrapper">
                                <TextField
                                    className="form-field-input"
                                    variant="outlined"
                                    value={percOfVotingRightsOrShares}
                                    type="number"
                                    name="percOfVotingRightsOrShares"
                                    onChange={e => this.handleChange('percOfVotingRightsOrShares', e.target.value)}
                                    InputProps={{
                                        endAdornment: <InputAdornment position="end">%</InputAdornment>
                                    }}
                                />
                            </div>
                        </div>
                        <div className="button-submit">
                            <Button className="form-button" variant="contained" color="default" disabled={!mandatoryFields} onClick={this.submit}>
                                Add member
                            </Button>
                        </div>
                    </form>
                </DialogContent>
            </Dialog>
        );
    }
}
// holds the state stored values
const mapStateToProps = state => {
    return {
        savedMembers: state.members
    };
};

const mapDispatchToProps = action => {
    return {
        saveMember: res => action(saveMembers(res))
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(CompanyMemberDilalog);
CompanyMemberDilalog.propTypes = {
    showDialog: PropTypes.bool.isRequired,
    closeMemberDialog: PropTypes.func.isRequired,
    saveMember: PropTypes.func
};
CompanyMemberDilalog.defaultProps = {
    saveMember: null
};
