/* eslint-disable no-console */
import React, { Component } from "react";
import Typography from "@material-ui/core/Typography";
import SocketIOClient from "socket.io-client";
import LaptopMacOutlinedIcon from "../../../../assets/images/notebook-computer 1.svg";
import logo from "../../../../assets/images/logo.png";

const { REACT_APP_API } = process.env;

class UploadSuccess extends Component {
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
        socketIO.on("connect", data => console.log(`Connected to: ${REACT_APP_API}`, data));
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
                        <div className="upload-content">
                            <Typography variant="h4" gutterBottom>
                                Uploads successful!
                            </Typography>
                            <p>You can now return to your computer to continue.</p>
                            <div>
                                <img
                                    src={LaptopMacOutlinedIcon}
                                    alt="logo"
                                    className="camera-icon"
                                />
                            </div>
                            <p>
                                Your computer may take a few seconds to update and get the result.
                            </p>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

export default UploadSuccess;
