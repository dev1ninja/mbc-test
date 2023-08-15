import React, { Component } from "react";
import ReactRouterPropTypes from "react-router-prop-types";
import { withRouter } from "react-router-dom";
import { getUser } from "auth/services/AuthService";
import SidebarContext from "context/sidebar/sidebarContext";
import { setUser } from "shared/helpers/auth";
import MobileVerificationForm from "./MobileVerificationForm";
import postMobileNumber from "../../services/mobileVerificationServices";
import Navigations from "../navigations/Navigations";

class MobileVerification extends Component {
    state = {
        showVerification: false,
        seconds: 60,
        showCountdown: false,
        isLoading: false,
        otpError: false,
        phoneError: ""
    };

    async componentDidMount() {
        const { data } = await getUser();
        setUser(data.user);
    }

    sendOtp = async ({ phoneNumber, countryCode }) => {
        this.setIsLoading(true);
        const truncatedPhNumber = phoneNumber.replace(/^0/, "");
        const data = {
            phoneNumber: truncatedPhNumber,
            countryCode
        };
        const id = sessionStorage.getItem("userId");
        try {
            const resp = await postMobileNumber("register/phone", {
                _id: id,
                ...data
            });
            this.setIsLoading(false);
            if (resp.status) {
                this.setState({
                    showVerification: true
                });
            } else {
                this.setState({ phoneError: 'Invalid phone number' });
            }
        } catch (error) {
            this.setState({ phoneError: error.response.data.message });
        }
    };

    setIsLoading = isLoading => {
        this.setState({ isLoading });
    };

    resendOtp = async ({ phoneNumber, countryCode }) => {
        const truncatedPhNumber = phoneNumber.replace(/^0/, "");
        try {
            const resp = await postMobileNumber("otp", {
                phoneNumber: truncatedPhNumber,
                countryCode
            });

            if (resp.status) {
                this.setState({
                    showCountdown: true
                });
                this.timerId = setInterval(this.countdown, 1000);
                this.clearOtpError();
            } else {
                this.setState({ otpError: true });
            }
        } catch (error) {
            this.setState({ otpError: true });
        }
    };

    countdown = () => {
        this.setState(prevState => {
            return {
                seconds: prevState.seconds - 1
            };
        }, this.countdownCheck);
    };

    countdownCheck = () => {
        const { seconds } = this.state;
        if (!seconds) {
            this.setState({
                showCountdown: false,
                seconds: 60
            });
            clearInterval(this.timerId);
        }
    };

    handleSubmit = async ({ phoneNumber, otp, countryCode }) => {
        const email = sessionStorage.getItem('email');
        const data = {
            otp,
            phoneNumber,
            countryCode,
            email
        };
        this.setIsLoading(true);
        const resp = await postMobileNumber("verify/phone", { ...data });
        this.setIsLoading(false);
        if (resp.status) {
            sessionStorage.setItem("token", resp.data.accessToken);
            const { hasCompleted } = this.context;
            sessionStorage.setItem("steps", 2);
            hasCompleted(2);
            this.navigate();
        } else {
            this.setState({
                otpError: true
            });
        }
    };

    clearOtpError = () => {
        this.setState({ otpError: false });
    };

    componentWillUnmount = () => {
        clearInterval(this.timerId);
    };

    navigate = () => {
        const { history } = this.props;
        history.push("/admin/personal-demographics");
    };

    clearPhoneError = () => {
        this.setState({ phoneError: "" });
    };

    changedNumber = () => {
        this.setState({
            showVerification: false,
            otpError: false,
        });
    }

    render() {
        const {
            showVerification,
            seconds,
            showCountdown,
            otpError,
            isLoading,
            phoneError
        } = this.state;

        return (
            <Navigations>
                <MobileVerificationForm
                    showVerification={showVerification}
                    phoneError={phoneError}
                    isLoading={isLoading}
                    seconds={seconds}
                    clearOtpError={this.clearOtpError}
                    clearPhoneError={this.clearPhoneError}
                    showCountdown={showCountdown}
                    otpError={otpError}
                    resendOtp={this.resendOtp}
                    onSubmit={this.handleSubmit}
                    sendOtp={this.sendOtp}
                    changedNumber={this.changedNumber}
                />
            </Navigations>
        );
    }
}

export default withRouter(MobileVerification);

MobileVerification.propTypes = {
    history: ReactRouterPropTypes.history.isRequired
};

MobileVerification.contextType = SidebarContext;
