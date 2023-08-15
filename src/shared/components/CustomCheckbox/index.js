import React, { Fragment } from "react";
import { Checkbox, Box } from "@material-ui/core";
import classNames from "classnames";
import { bool, func, oneOf, string } from "prop-types";
import { useStyles } from "./styles";

const POSITIONS = ["left", "right"];

const CustomChecbox = ({ checked, onChange, labelPosition, name, hasError, label, className }) => {
    const styles = useStyles();

    const CheckboxWrapper = label ? Box : Fragment;
    const boxProps = label && {
        className: classNames([
            className,
            styles.wrapper,
            { [styles.labelReverse]: labelPosition === "right" }
        ])
    };
    return (
        <CheckboxWrapper {...boxProps}>
            {label && (
                <label className={styles.label} htmlFor="checkbox">
                    {label}
                </label>
            )}
            <Checkbox
                id="checkbox"
                tabIndex={0}
                checked={checked}
                onChange={onChange}
                className={classNames([
                    styles.checkbox,
                    { [styles.checked]: checked },
                    { [styles.error]: hasError },
                ])}
                name={name}
            />
        </CheckboxWrapper>
    );
};

export default CustomChecbox;

CustomChecbox.defaultProps = {
    name: "",
    hasError: false,
    labelPosition: "left",
    label: "",
    className: ""
};

CustomChecbox.propTypes = {
    checked: bool.isRequired,
    onChange: func.isRequired,
    labelPosition: oneOf(POSITIONS),
    name: string,
    hasError: bool,
    label: string,
    className: string
};
