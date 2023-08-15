import React, { useEffect, useRef, useState } from "react";
import { Box, Input, ClickAwayListener } from "@material-ui/core";
import KeyboardArrowDown from "@material-ui/icons/KeyboardArrowDown";
import { useDebounce } from "shared/helpers/debounce/useDebounce";
import FieldTemplate from "shared/templates/FieldTemplate";
import { array, bool, func, object, oneOfType, string } from "prop-types";
import { canDrop } from "shared/helpers/dropdownHelper/position";
import { onPressKeyHandler } from "shared/helpers/utils";
import classNames from "classnames";

import { useStyles } from "./styles";

const Dropdown = ({
    label,
    className,
    onChange,
    options,
    hasError,
    errorMessage,
    value,
    valueKey,
    labelKey,
    ...rest
}) => {
    const [isPopupShown, setIsPopupShown] = useState(false);
    const [dropClass, setDropClass] = useState(true);
    const styles = useStyles();
    const wrapperRef = useRef();
    const dropdownRef = useRef();

    const setDropDirection = () => {
        const canDropDown = canDrop(dropdownRef, wrapperRef);
        setDropClass(canDropDown);
    };

    const setDirection = useDebounce(() => setDropDirection(), 200);

    useEffect(() => {
        if (dropdownRef.current) {
            setDropDirection();
        }
    }, [dropdownRef.current, isPopupShown]);

    useEffect(() => {
        window.addEventListener("resize", setDirection);
        return () => {
            window.removeEventListener("resize", setDirection);
        };
    }, []);

    const togglePopup = (e) => {
        if (e.type === 'focus' || e.type === 'click') {
        setIsPopupShown(true);
        } else {
        setIsPopupShown(false);
        }
    };

    const handleSelect = (country, e) => {
        const verificationKey = onPressKeyHandler(e);
        if (verificationKey) {
            onChange(country);
            setIsPopupShown(false);
        }
    };

    const error = (hasError && errorMessage) || "";
    const selectedItem = value && typeof value === "object" ? value[labelKey] : value;

    const onClickAway = () => {
        setIsPopupShown(false);
    };

    return (
        <ClickAwayListener onClickAway={onClickAway}>
            <div ref={wrapperRef} className={classNames([className, styles.container])}>
                <FieldTemplate label={label} errorMessage={error}>
                    <Input
                        readOnly
                        placeholder="Select"
                        autoComplete="off"
                        value={selectedItem}
                        className={classNames([styles.input, { [styles.inputError]: hasError }])}
                        onClick={togglePopup}
                        onFocus={togglePopup}
                        endAdornment={<KeyboardArrowDown className={styles.caret} />}
                        {...rest}
                    />
                </FieldTemplate>
                {isPopupShown && (
                    <div
                        ref={dropdownRef}
                        className={classNames([
                            styles.popup,
                            { [styles.popupVisible]: isPopupShown },
                            { [styles.popupTop]: !dropClass }
                        ])}
                    >
                        <Box className={styles.listWrapper}>
                            {Boolean(options.length) ? (
                                options.map(item => {
                                    return (
                                        <Box
                                            key={item[valueKey]}
                                            onClick={(e) => handleSelect(item, e)}
                                            onKeyDown={(e) => handleSelect(item, e)}
                                            className={styles.countryWrapper}
                                            tabIndex={0}
                                        >
                                            <Box>{item[labelKey]}</Box>
                                        </Box>
                                    );
                                })
                            ) : (
                                <Box className={styles.emptyValue}>No items found</Box>
                            )}
                        </Box>
                    </div>
                )}
            </div>
        </ClickAwayListener>
    );
};

export default Dropdown;

Dropdown.defaultProps = {
    label: "",
    value: "",
    className: "",
    valueKey: "id",
    errorMessage: "",
    hasError: false,
    labelKey: "name"
};

Dropdown.propTypes = {
    value: oneOfType([object, string]),
    options: array.isRequired,
    valueKey: string,
    hasError: bool,
    errorMessage: string,
    labelKey: string,
    onChange: func.isRequired,
    label: string,
    className: string
};
