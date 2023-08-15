/* eslint-disable no-console */
import React, { Component } from "react";
import Typography from "@material-ui/core/Typography";
import SocketIOClient from "socket.io-client";
import logo from "assets/images/logo.png";
import "./AlternateSuccess.scss";

const { REACT_APP_API } = process.env;

class AlternateSuccess extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        const uid = sessionStorage.getItem("userId");
        let socketIO = "";
        socketIO = SocketIOClient(REACT_APP_API, {
            query: `userId=${uid}&source=mobile`
        });
        socketIO.on("connect", data => console.log(`Connected to ${REACT_APP_API}`, data));
        const obj = {
            message: "I have verified my Face",
            _id: uid,
            source: "mobile"
        };
        socketIO.emit("verifyDone", obj);
    }

    render() {
        return (
            <div className="content">
                <div className="wrapper-content">
                    <div className="image-content">
                        <img src={logo} alt="logo" />
                    </div>
                    <form className="form-wrapper">
                        <div className="icon-content">
                            <Typography
                                variant="h4"
                                style={{
                                    lineHeight: "2.5rem"
                                }}
                            >
                                Please continue with the onboarding while we verify your identity.
                                This could take 2 - 3 days.
                            </Typography>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

export default AlternateSuccess;
