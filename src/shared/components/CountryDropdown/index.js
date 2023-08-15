import React, { useState, useMemo, useCallback, useRef, useEffect, useLayoutEffect } from "react";
import { Typography, Box, Input, ClickAwayListener } from "@material-ui/core";
import KeyboardArrowDown from "@material-ui/icons/KeyboardArrowDown";
import { useDebounce } from "shared/helpers/debounce/useDebounce";
import classNames from "classnames";
import { bool, func, object, string } from "prop-types";
import FieldTemplate from "shared/templates/FieldTemplate";
import { canDrop } from "shared/helpers/dropdownHelper/position";
import { onPressKeyHandler } from "shared/helpers/utils";
import Search from "@material-ui/icons/Search";
import Flag from "react-flagkit";
import flag from "assets/images/AZ.svg";
import SvgIcon from "../SvgIcon";
import { countriesWithNationalities } from "../../constants/country";

import { useStyles } from "./styles";

const CountryDropdown = ({
    title,
    searchTitle,
    defaultCountry,
    className,
    errorMessage,
    name,
    onChange,
    hasError,
    isNationality,
    value
}) => {
    const [isPopupShown, setIsPopupShown] = useState(false);
    const [inputValue, setInputValue] = useState("");
    const [dropClass, setDropClass] = useState(true);
    const dropdownRef = useRef();
    const wrapperRef = useRef();
    const styles = useStyles();

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

    useLayoutEffect(() => {
        window.addEventListener("resize", setDirection);
        return () => {
            window.removeEventListener("resize", setDirection);
        };
    }, []);

    const filteredCountries = useMemo(() => {
        if (!inputValue) {
            return countriesWithNationalities;
        }
        const result = countriesWithNationalities.filter(({ label = "", semantics = "", nationality }) => {
            const searchString = `${!isNationality ? label : nationality} ${semantics}`;
            const lowerCaseLabel = searchString.toLocaleLowerCase();
            const lowerCaseValue = inputValue.toLocaleLowerCase();
            return lowerCaseLabel.includes(lowerCaseValue);
        });
        return result;
    }, [inputValue, countriesWithNationalities]);

    const togglePopup = e => {
        if (e.type === "focus" || e.type === "click") {
            setIsPopupShown(true);
        } else {
            setIsPopupShown(false);
        }
    };

    const handleSelectCountry = (country, e) => {
        const verificationKey = onPressKeyHandler(e);
        if (verificationKey) {
            onChange(country);
            setIsPopupShown(false);
        }
    };

    const handleSearchValue = useCallback(
        e => {
            const { value: searchValue } = e.target;
            setInputValue(searchValue);
        },
        [inputValue]
    );

    const isValueExist = value || defaultCountry;
    const countryLabel = useMemo(() => {
        if (value && !isNationality) {
            return value.label;
        }
        if (value && isNationality) {
            return value.nationality;
        }
        if (defaultCountry) {
            return defaultCountry.label;
        }
        return "";
    }, [value, defaultCountry]);

    const onClickAway = () => {
        setIsPopupShown(false);
    };

    const error = (hasError && errorMessage) || "";

    return (
        <ClickAwayListener onClickAway={onClickAway}>
            <div ref={wrapperRef} className={classNames([className, styles.container])}>
                <FieldTemplate label={title} errorMessage={error}>
                    <Input
                        readOnly
                        placeholder={!isValueExist ? "Select" : ""}
                        autoComplete="off"
                        startAdornment={
                            <>
                                {isValueExist && (
                                    <Flag
                                        className={styles.flag}
                                        country={value ? value?.code : defaultCountry.code}
                                    />
                                )}
                            </>
                        }
                        value={countryLabel}
                        name={name}
                        className={classNames([styles.input, { [styles.inputError]: hasError }])}
                        onClick={togglePopup}
                        onFocus={togglePopup}
                        endAdornment={<KeyboardArrowDown className={styles.caret} />}
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
                        <Typography className={styles.popupTitle}>{searchTitle}</Typography>
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
                                            <Box>{!isNationality ? country.label : country.nationality}</Box>
                                        </Box>
                                    );
                                })
                            ) : (
                                <Box className={styles.emptyValue}>No countries found</Box>
                            )}
                        </Box>
                    </div>
                )}
            </div>
        </ClickAwayListener>
    );
};

export default CountryDropdown;

CountryDropdown.defaultProps = {
    defaultCountry: null,
    title: "",
    searchTitle: "",
    value: null,
    errorMessage: "",
    hasError: false,
    className: ""
};

CountryDropdown.propTypes = {
    defaultCountry: object,
    value: object,
    hasError: bool,
    name: string,
    errorMessage: string,
    isNationality: bool,
    onChange: func.isRequired,
    title: string,
    searchTitle: string,
    className: string
};
