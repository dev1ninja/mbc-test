import React, { Component } from 'react';
import ReactRouterPropTypes from 'react-router-prop-types';
import { Button, Typography } from '@material-ui/core';
import ThumbUpAltOutlinedIcon from '@material-ui/icons/ThumbUpAltOutlined';
import logo from '../../../../../assets/images/logo.png';
import './Selfie.scss';

export default class SelfieSteps extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    navigateToCamera = () => {
        const { history } = this.props;
        history.push('/auth/camera-enable', history.location.state);
    };

    render() {
        return (
            <div className="content">
                <div className="wrapper-content">
                    <div className="image-content">
                        <img src={logo} alt="logo" />
                    </div>
                    <form className="form-wrapper selfie-screen">
                        <div className="upload-content">
                            <Typography variant="h4" gutterBottom>
                                Take a selfie
                            </Typography>
                            <p>We’ll compare it with your document.</p>
                            <div className="steps-content">
                                <div className="things-to-do">
                                    <ThumbUpAltOutlinedIcon className="thumb-icon" /> <p>Remove your glasses if necessary.</p>
                                </div>
                                <div className="things-to-do">
                                    <ThumbUpAltOutlinedIcon className="thumb-icon" /> <p>Face forward and make sure your eyes are visible.</p>
                                </div>
                            </div>
                            <Button type="button" className="form-button inlineButton capture-selfie-button" variant="contained" onClick={this.navigateToCamera}>
                                Continue
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}
SelfieSteps.propTypes = {
    history: ReactRouterPropTypes.history.isRequired
};
