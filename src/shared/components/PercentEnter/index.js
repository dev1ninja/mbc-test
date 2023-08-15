import React from 'react';
import { Typography, Input } from '@material-ui/core';
import FieldTemplate from 'shared/templates/FieldTemplate';
import { string, func, number, bool, oneOfType } from 'prop-types';
import classNames from 'classnames';

import { useStyles } from './styles';

const PercentEnter = ({
  title,
  value,
  onChange,
  maxCount,
  className,
  hasError,
  errorMessage,
}) => {
  const styles = useStyles();

  const handleChange = (e) => {
    const { value } = e.target;
    const isValidValue = maxCount && Number(value) <= maxCount;
    const isPositive = parseFloat(value) >= 0 || value === '';
    const isShouldSetValue = isValidValue && isPositive
    if (isShouldSetValue) {
      onChange(e);
    }
  };

  const error = (hasError && errorMessage) || "";

  return (
    <FieldTemplate
      className={className}
      label={title}
      hasError={hasError}
      errorMessage={error}
    >
      <Input
        className={classNames([
          styles.numberInput,
          { [styles.errorContainer]: hasError },
        ])}
        onChange={handleChange}
        value={value}
        endAdornment={<Typography className={styles.percentText}>%</Typography>}
      />
    </FieldTemplate>
  );
};

export default PercentEnter;

PercentEnter.defaultProps = {
  title: 'Please enter your percentage',
  maxCount: 100,
  hasError: false,
  errorMessage: 'Please enter an amount',
};

PercentEnter.propTypes = {
  title: string,
  value: oneOfType([string, number]).isRequired,
  maxCount: number,
  onChange: func.isRequired,
  className: string,
  hasError: bool,
  errorMessage: string,
};
