import React, { useState } from "react";
import { Box, Input, Typography } from "@material-ui/core";
import DoneIcon from "@material-ui/icons/Done";
import eyeOpen from "assets/images/eye-open.svg";
import eyeClosed from "assets/images/eye-closed.svg";
import classNames from "classnames";
import SvgIcon from "shared/components/SvgIcon";
import { onPressKeyHandler } from "shared/helpers/utils";
import CloseIcon from "@material-ui/icons/Close";
import { bool, func, number, oneOfType, string } from "prop-types";
import { useStyles } from "./styles";

const CHECK_LOWER_CASE_REGEX = /[a-z]/;
const CHECK_UPPER_CASE_REGEX = /[A-Z]/;
const CHECK_NUMBERS_REGEX = /\d/;
const CHECK_SPECIAL_CHARACTERS = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]+/;

const ValidationInput = ({
    value,
    onChange,
    className,
    placeholder,
    hasError,
    label,
    isPristine,
    ...rest
}) => {
    const styles = useStyles();
    const [isShouldShowPassword, setIsShouldShowPassword] = useState(false);

    const checkCase = CHECK_LOWER_CASE_REGEX.test(value) && CHECK_UPPER_CASE_REGEX.test(value);
    const checkSpecialCharacters = CHECK_SPECIAL_CHARACTERS.test(value);
    const checkNumbers = CHECK_NUMBERS_REGEX.test(value);
    const checkLength = value.length >= 8;

    const togglePassword = (e) => {
        const verificationKey = onPressKeyHandler(e);
        if (verificationKey) {
            setIsShouldShowPassword((prev) => !prev);
        }
    };

    const haveError = !checkCase && !checkLength && !checkSpecialCharacters && !checkNumbers;

    const handleChange = e => {
        onChange(e, haveError);
    };

    return (
        <div className={classNames([styles.inputContainer, className])}>
            <Typography className={styles.label}>{label}</Typography>
            <Input
                type={isShouldShowPassword ? "text" : "password"}
                value={value}
                autoComplete="off"
                placeholder={placeholder}
                onChange={handleChange}
                className={classNames([styles.input, { [styles.inputError]: hasError }])}
                {...rest}
                endAdornment={
                    value && (
                        <Box tabIndex="0" className={styles.passwordIcon} onClick={togglePassword} onKeyDown={togglePassword}>
                            {isShouldShowPassword ? (
                                <SvgIcon iconPath={eyeOpen} />
                            ) : (
                                <SvgIcon iconPath={eyeClosed} />
                            )}
                        </Box>
                    )
                }
            />
            <div className={styles.validationContainer}>
                {hasError && (
                    <>
                        <div
                            className={classNames([
                                styles.contentWrapper,
                                { [styles.valid]: checkCase },
                                { [styles.error]: !checkCase }
                            ])}
                        >
                            {checkCase ? (
                                <DoneIcon className={styles.icon} />
                            ) : (
                                <CloseIcon className={styles.icon} />
                            )}
                            <Typography
                                className={classNames([
                                    { [styles.validText]: checkCase },
                                    { [styles.erroText]: !checkCase }
                                ])}
                            >
                                Upper and lowercase
                            </Typography>
                        </div>
                        <div
                            className={classNames([
                                styles.contentWrapper,
                                { [styles.valid]: checkSpecialCharacters },
                                { [styles.error]: !checkSpecialCharacters }
                            ])}
                        >
                            {checkSpecialCharacters ? (
                                <DoneIcon className={styles.icon} />
                            ) : (
                                <CloseIcon className={styles.icon} />
                            )}
                            <Typography
                                className={classNames([
                                    { [styles.validText]: checkSpecialCharacters },
                                    { [styles.erroText]: !checkSpecialCharacters }
                                ])}
                            >
                                Special character
                            </Typography>
                        </div>
                        <div
                            className={classNames([
                                styles.contentWrapper,
                                { [styles.valid]: checkNumbers },
                                { [styles.error]: !checkNumbers }
                            ])}
                        >
                            {checkNumbers ? (
                                <DoneIcon className={styles.icon} />
                            ) : (
                                <CloseIcon className={styles.icon} />
                            )}
                            <Typography
                                className={classNames([
                                    { [styles.validText]: checkNumbers },
                                    { [styles.erroText]: !checkNumbers }
                                ])}
                            >
                                Number
                            </Typography>
                        </div>
                        <div
                            className={classNames([
                                styles.contentWrapper,
                                { [styles.valid]: checkLength },
                                { [styles.error]: !checkLength }
                            ])}
                        >
                            {checkLength ? (
                                <DoneIcon className={styles.icon} />
                            ) : (
                                <CloseIcon className={styles.icon} />
                            )}
                            <Typography
                                className={classNames([
                                    { [styles.validText]: checkLength },
                                    { [styles.erroText]: !checkLength }
                                ])}
                            >
                                8 characters
                            </Typography>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default ValidationInput;

ValidationInput.defaultProps = {
    placeholder: "",
    label: "Test",
    className: "",
    isPristine: false,
    hasError: false
};

ValidationInput.propTypes = {
    placeholder: string,
    label: string,
    hasError: bool,
    className: string,
    value: oneOfType([string, number]).isRequired,
    onChange: func.isRequired,
    isPristine: bool
};
