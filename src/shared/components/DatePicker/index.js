import React, { useRef } from "react";
import ReactDatePicker from "react-datepicker";
import KeyboardArrowDown from "@material-ui/icons/KeyboardArrowDown";
import classNames from "classnames";
import FieldTemplate from "shared/templates/FieldTemplate";
import Portal from "shared/components/Portal";
import { Box } from "@material-ui/core";
import { bool, instanceOf, string, func, oneOfType } from "prop-types";

import { useStyles } from "./styles";

const DATE_FORMAT = "MM/dd/yyyy";

const DatePicker = ({
    label,
    onChange,
    value,
    disabled,
    errorMessage,
    className,
    readOnly,
    hasError,
    placeholder,
    dateFormat,
    ...rest
}) => {
    const calendarRef = useRef();
    const styles = useStyles();
    const dateMS = value ? Date.parse(value) : null;

    const handleIconClick = () => {
        calendarRef.current.deferFocusInput();
    };

    const error = hasError ? errorMessage : "";

    return (
        <Box className={classNames([styles.container, className])}>
            <FieldTemplate label={label} errorMessage={error}>
                <Box className={styles.anchor}>
                    <ReactDatePicker
                        ref={calendarRef}
                        disabled={disabled}
                        selected={dateMS}
                        autoComplete="off"
                        className={classNames([
                            styles.datePicker,
                            { [styles.inputError]: hasError }
                        ])}
                        readOnly={readOnly}
                        onChange={onChange}
                        dateFormat={dateFormat}
                        popperContainer={Portal}
                        placeholderText={placeholder}
                        {...rest}
                    />
                    <KeyboardArrowDown onClick={handleIconClick} className={styles.caret} />
                </Box>
            </FieldTemplate>
        </Box>
    );
};

export default DatePicker;

DatePicker.defaultProps = {
    label: "",
    dateFormat: DATE_FORMAT,
    readOnly: false,
    disabled: false,
    hasError: false,
    errorMessage: "",
    className: "",
    placeholder: "DD/MM/YYYY"
};

DatePicker.propTypes = {
    label: string,
    disabled: bool,
    readOnly: bool,
    dateFormat: string,
    className: string,
    placeholder: string,
    errorMessage: string,
    hasError: bool,
    onChange: func.isRequired,
    value: oneOfType([instanceOf(Date), string]).isRequired
};
