import React, { Component } from 'react';
import ReactRouterPropTypes from 'react-router-prop-types';
import { Button, Typography } from '@material-ui/core';
import ThumbUpAltOutlinedIcon from '@material-ui/icons/ThumbUpAltOutlined';
import logo from '../../../../../assets/images/logo.png';
import alert from '../../../../../assets/images/alert.svg';
import './RetryUpload.scss';

export default class RetryUpload extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    navigateToDocument = () => {
        const { history } = this.props;
        history.push(`/auth/document-verification?id=${sessionStorage.getItem('userId')}`);
    };

    render() {
        return (
            <>
                <div className="content">
                    <div className="wrapper-content">
                        <div className="image-content">
                            <img src={logo} alt="logo" />
                        </div>
                        <form className="form-wrapper">
                            <div className="upload-content">
                                <Typography variant="h4" gutterBottom>
                                    Something went wrong
                                </Typography>
                                <div>
                                    <img src={alert} alt="logo" className="warning-icon" />
                                </div>
                                <p>Unfortunately, we were unable to verify your uploaded profile image with your documents.</p>
                                <p>Let’s give it another go!</p>
                                <Button type="button" className="form-button inlineButton retry-btn" variant="contained" onClick={this.navigateToDocument}>
                                    Retry
                                </Button>
                                <div className="error-content">
                                    <div className="things-to-do">
                                        <ThumbUpAltOutlinedIcon className="thumb-icon" /> <p>Make sure your images are clear to see with no blur or glare. </p>
                                    </div>
                                    <div className="things-to-do">
                                        <ThumbUpAltOutlinedIcon className="thumb-icon" /> <p>Remove your glasses if necessary. </p>
                                    </div>
                                    <div className="things-to-do">
                                        <ThumbUpAltOutlinedIcon className="thumb-icon" /> <p>Face forward and make sure your eyes are visible. </p>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </>
        );
    }
}
RetryUpload.propTypes = {
    history: ReactRouterPropTypes.history.isRequired
};
