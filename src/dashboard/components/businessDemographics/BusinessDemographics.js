import { Button, TextField, Typography, Box } from "@material-ui/core";
import moment from "moment";
import * as _ from "underscore";
import React, { Component } from "react";
import ErrorIcon from "@material-ui/icons/Error";
import DatePicker from "react-datepicker";
import ReactRouterPropTypes from "react-router-prop-types";
import CountrySelect from "shared/components/CountrySelect";
// import SearchableDropdown from 'shared/components/SearchableDropdown';
// import getList from '../../services/getBusinessTypeList';
import { postBusinessApi, searchCompany } from "dashboard/services/businessDemographicsService";
import { warning } from "shared/helpers/alerts/Toast";
import countries from "shared/constants/country";
import { getUser } from "shared/services/CommonService";
import "react-datepicker/dist/react-datepicker.css";

export default class BusinessDemographics extends Component {
    constructor(props) {
        super(props);
        this.state = {
            legalName: "",
            countryOfIncorporation: null,
            registrationNumber: "",
            dateOfIncorporation: null,
            errorMessage: false
        };
    }

    componentDidMount = async () => {
        const type = sessionStorage.getItem("type");
        const userObj = getUser();
        const demographics = userObj.businessDemographics;
        // Getting Option data through API
        // const resp = await getList('businessOptions');
        if (type && demographics && demographics.legalName) {
            this.setState(
                {
                    legalName: demographics.legalName,
                    countryOfIncorporation: _.findWhere(countries, {
                        label: demographics.countryOfIncorporation
                    }),
                    registrationNumber: demographics.registrationNumber,
                    dateOfIncorporation: new Date(demographics.dateOfIncorporation)
                },
                () => {
                    this.checkMendateComplete();
                }
            );
        }
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

    handleChangeDate = date => {
        this.setState(
            {
                dateOfIncorporation: date
            },
            this.checkMendateComplete
        );
    };

    // calling API for company details
    handleChangeForApi = (field, value) => {
        this.setState(
            {
                [field]: value
            },
            this.checkForApi
        );
    };

    checkForApi = () => {
        const { countryOfIncorporation } = this.state;
        if (countryOfIncorporation !== null) {
            this.autoFillCompanyRegistration();
        }
    };

    // Cheking if mendate fields are filled or not
    checkMendateComplete = () => {
        const {
            legalName,
            registrationNumber,
            countryOfIncorporation,
            dateOfIncorporation,
            mendateComplete
        } = this.state;
        // let { dateOfIncorporation } = this.state;
        // dateOfIncorporation = moment(dateOfIncorporation).format('DD/MM/YYYY');
        if (
            legalName !== "" &&
            registrationNumber !== "" &&
            countryOfIncorporation &&
            dateOfIncorporation
        ) {
            this.setState({
                mendateComplete: true
            });
        } else if (mendateComplete !== false) {
            this.setState({
                mendateComplete: false
            });
        }
    };

    // Submitting the data and calling API
    handleSubmit = async () => {
        const {
            legalName,
            registrationNumber,
            countryOfIncorporation,
            dateOfIncorporation,
            mendateComplete
        } = this.state;
        if (mendateComplete) {
            const resp = await postBusinessApi("demographics/business", {
                legalName,
                registrationNumber,
                countryOfIncorporation: countryOfIncorporation.label,
                countryCode: countryOfIncorporation.code,
                dateOfIncorporation
            });
            if (resp.status === 200) {
                this.setState({ errorMessage: false });

                const { history } = this.props;
                history.push("/admin/business-address");
            } else if (resp.code === 403) this.setState({ errorMessage: true });
        } else {
            this.setState({ errorMessage: true });
            warning("Please fill registered company details");
        }
    };

    autoFillCompanyRegistration = async () => {
        const { countryOfIncorporation, registrationNumber } = this.state;
        if (registrationNumber !== "" && countryOfIncorporation !== null) {
            const resp = await searchCompany({
                country: countryOfIncorporation.code,
                companyRegNumber: registrationNumber
            });
            if (resp.status) {
                const company = resp.data.data;
                this.setState({
                    legalName: company.name,
                    dateOfIncorporation: new Date(company.dateOfIncorporation),
                    mendateComplete: true
                });
            } else {
                this.setState({
                    legalName: "",
                    dateOfIncorporation: null,
                    mendateComplete: false
                });
            }
        }
    };

    render() {
        const {
            legalName,
            countryOfIncorporation,
            registrationNumber,
            dateOfIncorporation,
            mendateComplete,
            errorMessage
        } = this.state;
        return (
            <form className="form-wrapper">
                <Typography variant="h3" gutterBottom>
                    About your company.
                </Typography>
                <Box width="400px" py="30px">
                    <Typography variant="h5" gutterBottom>
                        Please add the information below, they need to be the same as on your
                        certificate of incorporation.
                    </Typography>
                </Box>
                <CountrySelect
                    title="Country of incorporation"
                    value={countryOfIncorporation}
                    onChangeCountry={(e, value) =>
                        this.handleChangeForApi("countryOfIncorporation", value)
                    }
                    onBlur={() => this.autoFillCompanyRegistration()}
                />
                <TextField
                    className="form-field-input"
                    placeholder="Registration number*"
                    variant="outlined"
                    value={registrationNumber}
                    name="registrationNumber"
                    onChange={e => this.handleChange("registrationNumber", e.target.value)}
                    onBlur={() => this.autoFillCompanyRegistration()}
                />
                <TextField
                    className="form-field-input"
                    placeholder="Company Legal name*"
                    variant="outlined"
                    value={legalName}
                    name="legalName"
                    onChange={e => this.handleChange("legalName", e.target.value)}
                />
                <DatePicker
                    selected={dateOfIncorporation}
                    className="form-field-input"
                    name="dateOfIncorporation"
                    onChange={this.handleChangeDate}
                    placeholderText="Date of incorporation*"
                    dateFormat="dd-MM-yyyy"
                    dropdownMode="select"
                    showMonthDropdown
                    showYearDropdown
                    maxDate={new Date(moment())}
                />
                {errorMessage && (
                    <div className="errorMessage">
                        <ErrorIcon />
                        Sorry but we do not yet support your business and you cannot continue the
                        registration process. We will contact you as soon as you are eligible to
                        join incard!
                    </div>
                )}
                <Button
                    className="form-button"
                    variant="contained"
                    color="default"
                    disabled={!mendateComplete}
                    onClick={this.handleSubmit}
                >
                    Continue
                </Button>
            </form>
        );
    }
}
BusinessDemographics.propTypes = {
    history: ReactRouterPropTypes.history.isRequired
};
