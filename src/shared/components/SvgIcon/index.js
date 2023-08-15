import React from 'react';
import { string } from 'prop-types';

const SvgIcon = ({ iconPath, className, alt }) => {
  return <img alt={alt} className={className} src={iconPath} />;
};

export default SvgIcon;

SvgIcon.defaultProps = {
  className: '',
  alt: '',
};

SvgIcon.propTypes = {
  iconPath: string.isRequired,
  className: string,
  alt: string,
};
