import React, { useEffect, useRef, useState } from 'react';
import NumberFormat from 'react-number-format';
import { bool, func, string, number, oneOfType, object } from 'prop-types';
import { Box, Input } from '@material-ui/core';
import Flag from 'react-flagkit';
import classNames from 'classnames';
import FieldTemplate from 'shared/templates/FieldTemplate';
import { useStyles } from './styles';

const CURRENCY = [
    { code: "GB", currencyCode: "GBP" },
    { code: "EU", currencyCode: "EUR" }
];

const CurrencyAutocomplete = ({
    onChange,
    value,
    defaultCurrency,
    className,
    errorMessage,
    label,
    name,
    onBlur,
    hasError,
    ...rest
}) => {
    const styles = useStyles();
    const [currency, setCurrency] = useState(null);
    const wrapperRef = useRef();

  const handleChange = (e) => {
    if (currency) {
      onChange(e, currency);
      return;
    }
    onChange(e, null);
  };

    useEffect(() => {
        if (defaultCurrency) {
            if (typeof defaultCurrency === "string") {
                const result = CURRENCY.find(
                    ({ currencyCode }) => currencyCode === defaultCurrency
                );
                setCurrency(result);
                return;
            }
            setCurrency(defaultCurrency);
        }
    }, [defaultCurrency]);

    const inputError = hasError && !value && "Please enter an amount";
    const currencyError = hasError && !currency && "Please select currency";
    const compareError = hasError && !value && !currency && "Please enter a currency and amount";
    const error = compareError || inputError || currencyError || "";

  return (
      <div
        ref={wrapperRef}
        className={classNames([className, styles.container])}
      >
        <FieldTemplate label={label} errorMessage={error}>
          <Box className={styles.inputWrapper}>
            <Input
              readOnly
              className={classNames([
                styles.input,
                { [styles.inputError]: compareError || currencyError },
              ])}
              
              startAdornment={
                currency && (
                  <>
                    <Flag className={styles.flag} country={currency?.code} />
                    <Box>{currency?.currencyCode}</Box>
                  </>
                )
              }
            />
            <NumberFormat
              thousandSeparator
              allowNegative={false}
              autoComplete="off"
              value={value}
              placeholder="Amount"
              name={name}
              className={classNames([
                styles.currencyInput,
                {
                  [styles.inputError]: compareError || inputError,
                },
              ])}
              onChange={handleChange}
              onBlur={onBlur}
              {...rest}
            />
          </Box>
        </FieldTemplate>
      </div>
  );
};

export default CurrencyAutocomplete;

CurrencyAutocomplete.propTypes = {
    value: oneOfType([string, number]).isRequired,
    onChange: func.isRequired,
    onBlur: func,
    hasError: bool,
    className: string,
    name: string,
    label: string,
    errorMessage: string,
    defaultCurrency: oneOfType([string, object])
};
