/* eslint-disable no-console */
import React, { Component } from "react";
import ReactRouterPropTypes from "react-router-prop-types";
import { withRouter } from "react-router-dom";
import Typography from "@material-ui/core/Typography";
import SocketIOClient from "socket.io-client";
import { QRCode } from "react-qrcode-logo";
import "./IdentityVerfication.scss";
import Grid from "@material-ui/core/Grid";
import Navigations from "dashboard/components/navigations/Navigations";
import ThumbUpAltOutlinedIcon from "@material-ui/icons/ThumbUpAltOutlined";
import logo from "../../../assets/images/logo-ico.png";
import phone from "../../../assets/images/phone.svg";

const { REACT_APP_API } = process.env;

class IdentityVerfication extends Component {
    constructor(props) {
        super(props);
        this.state = {
            reload: false
        };
    }

    componentDidMount() {
        const { history } = this.props;
        let socketIO = "";
        socketIO = SocketIOClient(REACT_APP_API, {
            query: `userId=${sessionStorage.getItem("userId")}&source=web`
        });
        socketIO.on("connect", data => console.log(`Connected to: ${REACT_APP_API}`, data));

        socketIO.on("scanningSuccess", data => {
            if (data) {
                this.setState({
                    reload: true
                });
            }
        });
        socketIO.on("success", data => {
            if (data) {
                history.push("/admin/identity-success");
                socketIO.disconnect();
            }
        });
    }

    render() {
        const { reload } = this.state;
        const url = `https://${
            window.location.hostname
        }/#/auth/document-verification?id=${sessionStorage.getItem("userId")}`;
        return (
            <Navigations>
                {!reload ? (
                    <form className="form-wrapper">
                        <Typography variant="h3" gutterBottom>
                            Please continue the identity verification by scanning the QR code below.
                        </Typography>
                        <Typography variant="subtitle2" gutterBottom>
                            Scanning the QR code below with your mobile device will open the browser
                            on your phone to better allow you to upload your identity documents and
                            use the selfie camera to carry out a liveness check.
                        </Typography>
                        <Typography variant="subtitle2" gutterBottom>
                            Once your identity verification has been completed, the onboarding
                            process will automatically continue in this window.{" "}
                        </Typography>
                        <QRCode
                            size="250"
                            logoOpacity="1"
                            qrStyle="dots"
                            value={url}
                            logoImage={logo}
                        />
                    </form>
                ) : (
                    <form className="form-wrapper">
                        <Typography variant="h3" gutterBottom>
                            Continue on your phone.
                        </Typography>
                        <Typography variant="subtitle2" gutterBottom>
                            Once you finish your verification, this page will automatically refresh.
                            We will then continue with your onboarding process.
                        </Typography>
                        <div className="steps-content">
                            <Grid container className="main">
                                <Grid item xs={3}>
                                    <img src={phone} alt="phone" className="mobile-icon" />
                                </Grid>
                                <Grid item xs={9}>
                                    <div className="things-to-do">
                                        <ThumbUpAltOutlinedIcon className="thumb-icon" />{" "}
                                        <p>Keep this window open while using your mobile. </p>
                                    </div>
                                    <div className="things-to-do">
                                        <ThumbUpAltOutlinedIcon className="thumb-icon" />{" "}
                                        <p>Your mobile link will expire in one hour. </p>
                                    </div>
                                </Grid>
                            </Grid>
                        </div>
                    </form>
                )}
            </Navigations>
        );
    }
}

export default withRouter(IdentityVerfication);
IdentityVerfication.propTypes = {
    history: ReactRouterPropTypes.history.isRequired
};
