import React, { Component } from 'react';
import ReactRouterPropTypes from 'react-router-prop-types';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Button, Typography } from '@material-ui/core';
import ThumbUpAltOutlinedIcon from '@material-ui/icons/ThumbUpAltOutlined';
import LinkedCameraOutlinedIcon from '../../../../assets/images/identity-card.svg';
import { uploadDocuments, verifyCompanyMembers } from '../../../services/IdentityVerificationService';
import logo from '../../../../assets/images/logo.png';
import './DocumentUpload.scss';
import { success, warning } from '../../../../shared/helpers/alerts/Toast';
import { IDENTITYDOCUMENT } from '../../../../shared/constants/ToasMessages';
import saveFiles from '../../../../shared/redux/identity/Action';

const email = sessionStorage.getItem('email');
class DocumentUpload extends Component {
    constructor(props) {
        super(props);
        this.state = {
            files: '',
            base64: ''
        };
    }

    fileReader = e => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
            this.setState({
                files: file,
                base64: reader.result
            });
        };
    };

    uploadFiles = async () => {
        const { history, type } = this.props;
        const { files } = this.state;
        const { saveFile } = this.props;
        saveFile(files);
        let resp;
        if (email) {
            resp = await verifyCompanyMembers('verifyCompanyMembers', {
                file: files,
                reference: type,
                email,
                id: sessionStorage.getItem('userId')
            });
        } else {
            resp = await uploadDocuments('upload/document', {
                file: files,
                reference: type,
                id: sessionStorage.getItem('userId')
            });
        }

        if (resp.status) {
            success(IDENTITYDOCUMENT);
            if (email) {
                history.push('/auth/alternate-identity-success');
            } else {
                history.push('/auth/slefie-verification', {
                    files,
                    id: sessionStorage.getItem('userId')
                });
            }
        } else {
            warning(resp);
        }
    };

    render() {
        const { type } = this.props;
        const { base64 } = this.state;
        return (
            <div className="content">
                <div className="wrapper-content">
                    <div className="image-content">
                        <img src={logo} alt="logo" />
                    </div>
                    {base64 === '' ? (
                        <form className="form-wrapper">
                            <div className="upload-content">
                                <Typography variant="h4" className="title" gutterBottom>
                                    {type}
                                </Typography>
                                <img src={LinkedCameraOutlinedIcon} alt="logo" className="id-icon" />
                                <div className="steps-content">
                                    <div className="things-to-do">
                                        <ThumbUpAltOutlinedIcon className="thumb-icon" /> <p>Please be ready to take a photo of your {type}.</p>
                                    </div>
                                    <div className="things-to-do">
                                        <ThumbUpAltOutlinedIcon className="thumb-icon" />{' '}
                                        <p>
                                            Ensure all edges of your {type} can be seen and you focus on the page with your Given names and your {type} photo.{' '}
                                        </p>
                                    </div>
                                    <div className="things-to-do">
                                        <ThumbUpAltOutlinedIcon className="thumb-icon" /> <p>For best readibility, make sure there is no glare and there is enough light.</p>
                                    </div>
                                </div>
                                {/* <div>
                                    <img src={LinkedCameraOutlinedIcon} alt="logo" className="camera-icon" />
                                </div> */}
                                {/* <Typography variant="h4" gutterBottom>
                                    Take a photo of the photo page of your {type}.
                                </Typography> */}
                                <label htmlFor="file-upload" className="custom-file-upload">
                                    Take photo{' '}
                                </label>
                                <input id="file-upload" type="file" accept="image/*" capture="environment" className="" onChange={e => this.fileReader(e)} />
                            </div>
                        </form>
                    ) : (
                        <form className="form-wrapper">
                            <div className="upload-content">
                                <Typography variant="h4" gutterBottom>
                                    Check readability
                                </Typography>
                                <div className="image-container">
                                    <img src={base64} alt="loaded" />
                                </div>
                                <Typography variant="h4" gutterBottom>
                                    Make sure your {type} details are clear to read, with no blur or glare.
                                </Typography>
                                <label htmlFor="file-upload" className="custom-redo-upload">
                                    Retry{' '}
                                </label>
                                <input id="file-upload" type="file" accept="image/*" capture="environment" className="" onChange={e => this.fileReader(e)} />
                                <Button type="button" className="form-button inlineButton" variant="contained" onClick={this.uploadFiles}>
                                    Confirm
                                </Button>
                            </div>
                        </form>
                    )}
                </div>
            </div>
        );
    }
}

// it will dispatch the actions
const mapDispatchToProps = action => {
    return {
        saveFile: res => action(saveFiles(res))
    };
};
export default connect(null, mapDispatchToProps)(DocumentUpload);
DocumentUpload.propTypes = {
    type: PropTypes.string.isRequired,
    history: ReactRouterPropTypes.history.isRequired
};
DocumentUpload.propTypes = {
    saveFile: PropTypes.func
};
DocumentUpload.defaultProps = {
    saveFile: null
};
