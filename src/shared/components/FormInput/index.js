import React from "react";
import { Input } from "@material-ui/core";
import FieldTemplate from "shared/templates/FieldTemplate";
import { string, func, bool, oneOfType, number } from "prop-types";
import classNames from "classnames";
import { useStyles } from "./styles";

const FormInput = ({
    label,
    onChange,
    placeholder,
    className,
    value,
    name,
    disabled,
    hasError,
    onInfoIconClick,
    errorMessage,
    onBlur,
    isPristine,
    ...rest
}) => {
    const styles = useStyles();
    const error = (hasError && errorMessage) || "";
    return (
        <FieldTemplate
            onInfoIconClick={onInfoIconClick}
            label={label}
            className={className}
            disabled={disabled}
            errorMessage={error}
            tabIndex={0}
        >
            <Input
                className={classNames([
                    { [styles.inputError]: error },
                    { [styles.inputDisabled]: disabled }
                ])}
                placeholder={placeholder}
                onChange={onChange}
                autoComplete="off"
                onBlur={onBlur}
                disabled={disabled}
                value={value}
                name={name}
                {...rest}
            />
        </FieldTemplate>
    );
};

export default FormInput;

FormInput.defaultProps = {
    label: "",
    placeholder: "",
    className: "",
    onBlur: () => {},
    errorMessage: "",
    name: "",
    hasError: false,
    disabled: false,
    isPristine: false
};

FormInput.propTypes = {
    label: string,
    onChange: func.isRequired,
    className: string,
    placeholder: string,
    value: oneOfType([string, number]).isRequired,
    hasError: bool,
    name: string,
    onInfoIconClick: func,
    onBlur: func,
    disabled: bool,
    errorMessage: string,
    isPristine: bool
};
