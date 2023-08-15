import React, { Component } from "react";
import ReactRouterPropTypes from "react-router-prop-types";
import { withRouter } from "react-router-dom";
import "react-datepicker/dist/react-datepicker.css";
import SidebarContext from "context/sidebar/sidebarContext";
import { getUser } from "shared/services/CommonService";
import PersonalDemographicsForm from "./PersonalDemographicsForm";
import postPersonalDemographics from "../../services/personalDemographicsService";
import {
    createSession,
    getDecision,
    createVeriffFrame,
    MESSAGES
} from "../../services/veriffService";
import Navigations from "../navigations/Navigations";

import "./personalDemographics.scss";

class PersonalDemographics extends Component {
    requestCount = 0;

    state = {
        forbidden: false,
        isLoading: false
    };

    handleSubmit = async values => {
        const {
            firstName,
            lastName,
            gender,
            dob,
            address1,
            address2,
            placeOfBirth,
            nationality,
            countryOfResidence,
            town,
            postCode
        } = values;
        this.setState({ isLoading: true });
        if (this.requestCount) {
            this.setState({ isLoading: false });
            return;
        }
        const resp = await postPersonalDemographics("demographics/personal", {
            firstName,
            lastName,
            gender,
            dob,
            placeOfBirth: placeOfBirth.code,
            nationality: nationality.code,
            homeAddress: {
                address_1: address1,
                address_2: address2,
                houseNameNumber: values.houseNumber,
                town,
                postCode,
                country: countryOfResidence.label,
                countryCode: countryOfResidence.code,
                countryNumericCode: countryOfResidence.iso
            }
        });
        if (resp.status === 200) {
            this.setState({ forbidden: false });
            this.veriff(values);
            this.requestCount = 1;
        } else if (resp.code === 403) this.setState({ forbidden: true });
        this.setState({ isLoading: false });
    };

    setIsLoading = isLoading => {
        this.setState({ isLoading });
    };

    veriff = async values => {
        const user = getUser();
        let response;
        let status;
        let sessionId = user.verification?.id;
        let sessionUrl = user.verification?.url;
        if (user.verification?.id) {
            response = await getDecision(sessionId);
            status = response?.data?.verification?.status;
        }
        if (!status || status === "expired" || status === "abandoned") {
            response = await createSession();
            if (response.data.status !== "success") return;
            sessionId = response.data.verification.id;
            sessionUrl = response.data.verification.url;
            postPersonalDemographics("verification", {
                id: sessionId,
                url: sessionUrl
            });
        }
        const { placeOfBirth, countryOfResidence, nationality } = values;

        createVeriffFrame({
            url: sessionUrl,
            onEvent: async msg => {
                switch (msg) {
                    case MESSAGES.CANCELED:
                        this.requestCount = 0;
                        this.navigate();
                        postPersonalDemographics("verifyUser", { isIdentityVerified: false });
                        break;
                    case MESSAGES.STARTED:
                        break;
                    case MESSAGES.FINISHED:
                        response = await getDecision(sessionId);
                        if (response?.data?.verification?.code === 9102) {
                            const { person } = response.data.verification;
                            const { history } = this.props;
                            postPersonalDemographics("verification", {
                                firstName: person.firstName,
                                lastName: person.lastName,
                                dateOfBirth: person.dateOfBirth
                                    ? new Date(person.dateOfBirth)
                                    : null,
                                isFraudAccount: true
                            });
                            history.push("/admin/not-verify");
                            return;
                        }

                        if (response?.data?.verification?.status === "approved") {
                            const { person } = response.data.verification;
                            postPersonalDemographics("verifyUser", { isIdentityVerified: true });
                            postPersonalDemographics("verification", {
                                firstName: person.firstName,
                                lastName: person.lastName,
                                dateOfBirth: person.dateOfBirth
                                    ? new Date(person.dateOfBirth)
                                    : null
                            });
                            const arrayOfCountries = [
                                nationality.code,
                                placeOfBirth.code,
                                countryOfResidence.code
                            ].filter(code => code);
                            postPersonalDemographics("complianceCheck", {
                                firstName: person.firstName,
                                lastName: person.lastName,
                                dateOfBirth: person.dateOfBirth
                                    ? new Date(person.dateOfBirth)
                                    : null,
                                clientRef: sessionId,
                                arrayOfCountries
                            });
                        }
                        this.navigate();
                        break;
                    default:
                        break;
                }
            }
        });
    };

    navigate = () => {
        const { hasCompleted } = this.context;
        const { history } = this.props;
        history.push("/admin/businessType");
        sessionStorage.setItem("steps", 3);
        hasCompleted(3);
    };

    render() {
        const { forbidden, isLoading } = this.state;
        return (
            <Navigations>
                <PersonalDemographicsForm
                    isLoading={isLoading}
                    onSubmit={this.handleSubmit}
                    setIsLoading={this.setIsLoading}
                    forbidden={forbidden}
                />
            </Navigations>
        );
    }
}

export default withRouter(PersonalDemographics);

PersonalDemographics.propTypes = {
    history: ReactRouterPropTypes.history.isRequired
};

PersonalDemographics.contextType = SidebarContext;
