import React, { useState } from 'react';
import Camera, { FACING_MODES } from 'react-html5-camera-photo';
import 'react-html5-camera-photo/build/css/index.css';
import { useHistory } from 'react-router-dom';
import { Button, Typography } from '@material-ui/core';
import { faceVerification } from '../../../services/IdentityVerificationService';
import './FaceVerfication.scss';
import logo from '../../../../assets/images/logo.png';
import HighlightOffOutlinedIcon from '../../../../assets/images/close.svg';
import store from '../../../../shared/redux/Store';
import { success } from '../../../../shared/helpers/alerts/Toast';
import { SELFIEVERIFICATION } from '../../../../shared/constants/ToasMessages';

const isFullscreen = false;
const FaceVerification = () => {
    const [image, setImage] = useState(null);
    const [blobData, setBlobData] = useState(null);
    const [errorCamera, setCameraError] = useState(false);
    const { push } = useHistory();

    const convertBase64ToBlob = base64Url => {
        fetch(base64Url)
            .then(res => res.blob())
            .then(blob => {
                setBlobData(blob);
            });
    };

    const capture = uri => {
        convertBase64ToBlob(uri);
        setImage(uri);
    };

    const resetImage = () => {
        setImage(null);
    };

    const navigate = async () => {
        const fileStored = store.getState();
        const resp = await faceVerification('verify/face', {
            current: fileStored.files.files,
            comparison: blobData,
            id: sessionStorage.getItem('userId')
        });
        if (resp.status === 200) {
            success(SELFIEVERIFICATION);
            push('/auth/upload-success');
        } else if (resp.status === 400 || resp.status === 500) {
            push('/auth/retry-upload');
        }
    };

    const errorState = () => {
        setCameraError(true);
    };

    const showErrorScreen = () => {
        return (
            <div className="error-msg-content">
                <div>
                    <img src={HighlightOffOutlinedIcon} alt="close" className="close-icon" />
                </div>
                <p>You will need to enable your camera in order for us to continue with the verification process.</p>
                <p> Please go to: </p>
                <p> Settings &nbsp;-&gt;&nbsp; incard &nbsp;-&gt;&nbsp; allow camera access.</p>
            </div>
        );
    };

    const showCamera = () => {
        return <Camera idealFacingMode={FACING_MODES.USER} onTakePhoto={capture} isFullscreen={isFullscreen} onCameraError={errorState} />;
    };

    return (
        <div className="content">
            <div className="content-wrapper">
                <img src={logo} alt="logo" />
                <Typography variant="h4" className="title">
                    {!errorCamera ? 'Take a selfie' : 'Allow camera access'}
                </Typography>
                <form className="form-wrapper">
                    {image ? (
                        <>
                            <div className="captured-image">
                                <img src={image} alt="loaded" />
                            </div>
                            <Button type="button" className="redo-button inlineButton" variant="contained" onClick={resetImage}>
                                Retry
                            </Button>
                            <Button type="button" className="form-button inlineButton" variant="contained" onClick={navigate}>
                                Confirm
                            </Button>
                        </>
                    ) : (
                        <>{errorCamera ? showErrorScreen() : showCamera()}</>
                    )}
                </form>
            </div>
        </div>
    );
};
export default FaceVerification;
