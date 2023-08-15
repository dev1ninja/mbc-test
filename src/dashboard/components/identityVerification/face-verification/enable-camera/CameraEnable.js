import React, { Component } from 'react';
import ReactRouterPropTypes from 'react-router-prop-types';
import { Button, Typography } from '@material-ui/core';
import LinkedCameraOutlinedIcon from '../../../../../assets/images/Camera tick.svg';
import logo from '../../../../../assets/images/logo.png';
import './CameraEnable.scss';

export default class CameraEnable extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    navigateToVerification = () => {
        const { history } = this.props;
        history.push('/auth/face-verification', history.location.state);
    };

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
                                Allow camera access
                            </Typography>
                            <p>When prompted, please enable camera access to continue.</p>
                            <div>
                                <img src={LinkedCameraOutlinedIcon} alt="logo" className="camera-icon" />
                            </div>
                            <Button type="button" className="form-button inlineButton camera-btn" variant="contained" onClick={this.navigateToVerification}>
                                Enable camera
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}
CameraEnable.propTypes = {
    history: ReactRouterPropTypes.history.isRequired
};
