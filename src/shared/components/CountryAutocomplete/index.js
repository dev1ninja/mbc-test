import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { bool, func, shape, string } from "prop-types";
import { Box, Input, Typography, ClickAwayListener } from "@material-ui/core";
import SvgIcon from "shared/components/SvgIcon";
import Flag from "react-flagkit";
import classNames from "classnames";
import flag from "assets/images/AZ.svg";
import { canDrop } from "shared/helpers/dropdownHelper/position";
import { useDebounce } from "shared/helpers/debounce/useDebounce";
import { onPressKeyHandler } from "shared/helpers/utils";
import KeyboardArrowDown from "@material-ui/icons/KeyboardArrowDown";
import Search from "@material-ui/icons/Search";
import countries from "../../constants/country";
import { useStyles } from "./styles";

const DEFAULT_COUNTRY = {
    code: "GB",
    iso: "826",
    label: "United Kingdom",
    phone: "44"
};

const CountryAutocomplete = ({
    onChange,
    value,
    defaultCountry,
    errorMessage,
    name,
    onBlur,
    hasError,
    ...rest
}) => {
    const styles = useStyles();
    const [inputValue, setInputValue] = useState("");
    const [countryObj, setCountryObj] = useState(DEFAULT_COUNTRY);
    const [defaultValue, setDefaultValue] = useState("+44");
    const [isPopupShown, setIsPopupShown] = useState(false);
    const [dropClass, setDropClass] = useState(true);
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

    const filteredCountries = useMemo(() => {
        if (!inputValue) {
            return countries;
        }
        const result = countries.filter(({ label }) => {
            const lowerCaseLabel = label.toLocaleLowerCase();
            const lowerCaseValue = inputValue.toLocaleLowerCase();
            return lowerCaseLabel.includes(lowerCaseValue);
        });
        return result;
    }, [inputValue, countries]);

    const togglePopup = e => {
        if (e.target.name === "codeCountry" || e.type === "click") {
            setIsPopupShown(true);
        } else {
            setIsPopupShown(false);
        }
    };

    const handleChange = e => {
        onChange(e, countryObj);
    };

    const handleSelectCountry = (country, e) => {
        const verificationKey = onPressKeyHandler(e);
        if (verificationKey) {
            const event = {
                target: {
                    value,
                    name
                }
            };
            setDefaultValue(`+${country?.phone}` || `+${DEFAULT_COUNTRY.phone}`);
            setCountryObj(country);
            onChange(event, country);
            setIsPopupShown(false);
        }
    };

    useEffect(() => {
        if (defaultCountry) {
            handleSelectCountry(defaultCountry);
        }
    }, [defaultCountry]);

    const handleSearchValue = useCallback(
        e => {
            const { value: searchValue } = e.target;
            setInputValue(searchValue);
        },
        [inputValue]
    );

    const onClickAway = () => {
        setIsPopupShown(false);
    };

    const error = (hasError && errorMessage) || "";

    return (
        <ClickAwayListener onClickAway={onClickAway}>
            <div ref={wrapperRef} className={styles.container}>
                <Typography className={styles.label}>Phone Number</Typography>
                <Box className={styles.inputWrapper}>
                    <Input
                        name="codeCountry"
                        readOnly
                        value={defaultValue}
                        className={styles.input}
                        onClick={togglePopup}
                        onFocus={togglePopup}
                        endAdornment={
                            <>
                                <Box onClick={togglePopup}>
                                    <KeyboardArrowDown className={styles.caret} />
                                </Box>
                            </>
                        }
                    />
                    {isPopupShown && (
                        <div
                            ref={dropdownRef}
                            className={classNames([
                                styles.popup,
                                { [styles.popupVisible]: isPopupShown },
                                { [styles.popupTop]: !dropClass }
                            ])}
                        >
                            <Typography className={styles.popupTitle}>Choose country</Typography>
                            <Input
                                className={styles.searchInput}
                                onChange={handleSearchValue}
                                value={inputValue}
                                placeholder="Search country"
                                startAdornment={<Search className={styles.searchIcon} />}
                            />
                            <Box className={styles.listWrapper}>
                                {Boolean(filteredCountries.length) ? (
                                    filteredCountries.map(country => {
                                        return (
                                            <Box
                                                key={`${country.code}${country.label}`}
                                                onClick={e => handleSelectCountry(country, e)}
                                                onKeyDown={e => handleSelectCountry(country, e)}
                                                className={styles.countryWrapper}
                                                tabIndex={0}
                                            >
                                                {country.code !== "AZ" ? (
                                                    <Flag
                                                        className={styles.flag}
                                                        country={country.code}
                                                    />
                                                ) : (
                                                    <SvgIcon
                                                        className={styles.customFlag}
                                                        iconPath={flag}
                                                    />
                                                )}
                                                <Box>{`${country.label} (+${country.phone})`}</Box>
                                            </Box>
                                        );
                                    })
                                ) : (
                                    <Box className={styles.emptyValue}>No countries found</Box>
                                )}
                            </Box>
                        </div>
                    )}
                    <Input
                        value={value}
                        autoComplete="off"
                        name={name}
                        className={classNames({ [styles.inputError]: error })}
                        onChange={handleChange}
                        onFocus={togglePopup}
                        onBlur={onBlur}
                        {...rest}
                    />
                </Box>
                <Typography className={styles.errorMessage}>{error}</Typography>
            </div>
        </ClickAwayListener>
    );
};

export default CountryAutocomplete;

CountryAutocomplete.defaultProps = {
    name: "",
    onBlur: () => {},
    hasError: false,
    defaultCountry: DEFAULT_COUNTRY,
    errorMessage: ""
};

CountryAutocomplete.propTypes = {
    value: string.isRequired,
    onChange: func.isRequired,
    onBlur: func,
    hasError: bool,
    name: string,
    errorMessage: string,
    defaultCountry: shape({
        code: string,
        label: string,
        iso: string,
        phone: string
    })
};
