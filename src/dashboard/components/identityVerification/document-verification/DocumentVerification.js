/* eslint-disable no-console */
import React, { Component } from "react";
import queryString from "querystring";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import { Button } from "@material-ui/core";
import ReactRouterPropTypes from "react-router-prop-types";
import SocketIOClient from "socket.io-client";
import logo from "assets/images/logo.png";
import phone from "assets/images/phone.svg";
import "./DocumentVerification.scss";

const { REACT_APP_API } = process.env;

export default class DocumentVerification extends Component {
    constructor(props) {
        super(props);
        this.state = {
            passport: false,
            drivingLicence: false,
            nationalIdCard: false,
            disabled: true
        };
    }

    componentDidMount() {
        const { history } = this.props;
        const userId = queryString.parse(history.location.search)["?id"];
        let socketIO = "";
        socketIO = SocketIOClient(REACT_APP_API, {
            query: `userId=${userId}&source=mobile`
        });
        socketIO.on("connect", data => console.log(`Connected to: ${REACT_APP_API}`, data));
        const obj = {
            message: "I have scanned QR Code",
            _id: userId,
            source: "mobile"
        };
        socketIO.emit("scanningDone", obj);
        sessionStorage.setItem("userId", userId);
        if (queryString.parse(history.location.search).email) {
            sessionStorage.setItem("email", queryString.parse(history.location.search).email);
        }
    }

    handleChange = (pass, dlicence, nIdCard) => {
        this.setState({
            passport: pass,
            drivingLicence: dlicence,
            nationalIdCard: nIdCard,
            disabled: false
        });
    };

    navigateToAlternate = () => {
        const { history } = this.props;
        history.push("/auth/alternate-verification");
    };

    submit = () => {
        const { history } = this.props;
        const { passport, drivingLicence } = this.state;
        let type = "";
        if (passport) {
            type = "Passport";
        } else if (drivingLicence) {
            type = "Driving licence";
        } else {
            type = "National ID card";
        }
        history.push(`/auth/document-upload/${type}`);
    };

    render() {
        const { passport, drivingLicence, nationalIdCard, disabled } = this.state;
        return (
            <>
                <div className="content mobile">
                    <div className="wrapper-content">
                        <div className="image-content">
                            <img src={logo} alt="logo" />
                        </div>
                        <form className="form-wrapper">
                            <Typography variant="h4" gutterBottom>
                                Please select a document for identity verification.
                            </Typography>
                            <div className={`form-field ${passport ? "selected" : ""}`}>
                                <FormControlLabel
                                    label="Passport"
                                    control={
                                        <Checkbox
                                            checked={passport}
                                            onChange={() => this.handleChange(true, false, false)}
                                        />
                                    }
                                    labelPlacement="start"
                                />
                            </div>
                            <div className={`form-field ${drivingLicence ? "selected" : ""}`}>
                                <FormControlLabel
                                    label="Driving licence"
                                    control={
                                        <Checkbox
                                            checked={drivingLicence}
                                            onChange={() => this.handleChange(false, true, false)}
                                        />
                                    }
                                    labelPlacement="start"
                                />
                            </div>
                            <div className={`form-field ${nationalIdCard ? "selected" : ""}`}>
                                <FormControlLabel
                                    label="National ID card"
                                    control={
                                        <Checkbox
                                            checked={nationalIdCard}
                                            onChange={() => this.handleChange(false, false, true)}
                                        />
                                    }
                                    labelPlacement="start"
                                />
                            </div>
                            <Typography variant="h6" gutterBottom>
                                Don’t have one of these?
                                <span
                                    className="link-to"
                                    onClick={this.navigateToAlternate}
                                    role="button"
                                    tabIndex={0}
                                    onKeyDown={ev => {
                                        ev.preventDefault();
                                    }}
                                >
                                    Click here
                                </span>
                            </Typography>
                            <Button
                                className="form-button"
                                variant="contained"
                                color="default"
                                disabled={disabled}
                                onClick={this.submit}
                            >
                                Continue
                            </Button>
                        </form>
                    </div>
                </div>
                <div className="desktop">
                    <div className="desktop-logo">
                        <img src={logo} alt="logo" />
                    </div>
                    <div id="grad" />
                    <div className="steps-content">
                        <Grid container className="main">
                            <Grid item xs={3}>
                                <img src={phone} alt="phone" className="mobile-icon" />
                            </Grid>
                            <Grid item xs={9}>
                                <div className="content-desktop">
                                    <p>
                                        We have detected you may be using your desktop. Please open
                                        this page on a mobile device to continue the verification
                                        process.{" "}
                                    </p>
                                </div>
                            </Grid>
                        </Grid>
                    </div>
                </div>
            </>
        );
    }
}
DocumentVerification.propTypes = {
    history: ReactRouterPropTypes.history.isRequired
};
