import React, { useRef, useState } from "react";
import PropTypes, { string } from "prop-types";
import { Box, Typography } from "@material-ui/core";
import classNames from "classnames";
import DescriptionOutlinedIcon from "@material-ui/icons/DescriptionOutlined";
import cloudIcon from "assets/images/upload-cloud.svg";
import trashIcon from "assets/images/trash-icon.svg";
import { onPressKeyHandler } from "shared/helpers/utils";
import { ErrorComponent } from "../Error";
import { useStyles } from "./styles";

const MAX_NUMBER_OF_FILES = 10;
const INPUT_FILE_ACCEPT_TYPES = [".pdf"].join(",");
const VALIDATION_TYPES_FILES = ["application/pdf"];
const VALIDATION_MAX_SIZE_FILE = "2048";
const SIZE_MB = "1024";

const validateFile = file => {
    const isTypeAccepted = VALIDATION_TYPES_FILES.indexOf(file.type) !== -1;
    const isSizeAccepted = file.size / SIZE_MB <= VALIDATION_MAX_SIZE_FILE;
    const result = isTypeAccepted && isSizeAccepted;
    return result;
};

const DropZone = ({ disabled, onChange, value, dropMessage, onDeletFile }) => {
    const styles = useStyles();
    const fileInputRef = useRef();
    const [error, setError] = useState('');

    const preventDefault = e => {
        e.preventDefault();
    };

    const fileInputClicked = (e) => {
        const verificationKey = onPressKeyHandler(e);
        if (verificationKey) {
            if (disabled) {
                return;
            }
            fileInputRef.current.click();
        }
    };

    const removeFile = (name, e) => {
        const verificationKey = onPressKeyHandler(e);
        if(verificationKey){
            const file = value.find(({ name: innerName }) => name === innerName);
            fileInputRef.current.closest("form").reset();
            onDeletFile(file?.url);
            setError('');
        }
    };

    const handleFiles = (dataTransferFiles) => {
        const { files: filesObject } = fileInputRef.current;
        const tranferedFiles = Array.from(dataTransferFiles).length ? dataTransferFiles : filesObject;
        const files = Array.from(tranferedFiles);
        const validationNumberFiles = MAX_NUMBER_OF_FILES >= files.length + value.length;
        const isAllFilesValid = files.every(validateFile);

        if (!validationNumberFiles || !isAllFilesValid) {
            setError('Failed to upload file');
            return;
        }

        const newFiles = files.filter(
            ({ name }) => !value.some(({ name: innerName }) => innerName === name)
        );
        onChange(newFiles);
        setError('');
    };

    const fileDrop = e => {
        if (!disabled) {
            e.preventDefault();
            const { files } = e.dataTransfer;
            handleFiles(files);
        }
    };

    return (
        <Box className={styles.container}>
            <Box
                className={classNames([styles.dropContainer, { [styles.disableUpload]: disabled }])}
                aria-hidden="true"
                onClick={fileInputClicked}
                onKeyDown={fileInputClicked}
                tabIndex={0}
                onDragOver={preventDefault}
                onDragEnter={preventDefault}
                onDragLeave={preventDefault}
                onDrop={fileDrop}
            >
                <Box className={styles.dropMessage}>
                    <img className={styles.uploadIcon} src={cloudIcon} alt="cloudIcon" />
                    <Typography className={styles.textDropMessage}>{dropMessage}</Typography>
                </Box>
                <form className="DropzoneForm">
                    <input
                        ref={fileInputRef}
                        className={styles.fileInput}
                        type="file"
                        accept={INPUT_FILE_ACCEPT_TYPES}
                        multiple
                        onChange={handleFiles}
                    />
                </form>
            </Box>
            {[...value].map(({ name, valid }) => {
                return (
                    <Box className={styles.fileStatus} key={name}>
                        <Box
                            className={classNames([
                                styles.fileDescription,
                                {
                                    [styles.validFile]: valid,
                                    [styles.invalidFile]: !valid
                                }
                            ])}
                        >
                            <Box className={styles.selectFile}>
                                <DescriptionOutlinedIcon className={styles.outlinedIcon} />
                                <Box className={styles.fileName}>{name}</Box>
                            </Box>
                            <Box
                                onClick={(e) => removeFile(name, e)}
                                onKeyDown={(e) => removeFile(name, e)}
                                className={styles.removeFileIcon}
                                tabIndex={0}
                            >
                                <img src={trashIcon} alt="trashIcon" />
                            </Box>
                        </Box>
                    </Box>
                );
            })}
            <ErrorComponent message={error} />
        </Box>
    );
};

export default DropZone;

DropZone.defaultProps = {
    dropMessage: "Drag and drop or browse to choose a file"
};

DropZone.propTypes = {
    disabled: PropTypes.bool.isRequired,
    onChange: PropTypes.func.isRequired,
    onDeletFile: PropTypes.func.isRequired,
    value: PropTypes.array.isRequired,
    dropMessage: string
};
