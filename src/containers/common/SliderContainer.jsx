import React from 'react';
import PropTypes from 'prop-types';

import Slider from 'components/common/Slider';

const propTypes = {
  className: PropTypes.string,
  labelText: PropTypes.string,
  value: PropTypes.number,
  max: PropTypes.number,
  handleChange: PropTypes.func,
};

const defaultProps = {
  className: '',
  labelText: '',
  value: 0,
  max: 0,
  handleChange: () => {},
};

const SliderContainer = ({ className, labelText, value, max, handleChange }) => (
  <Slider
    className={className}
    labelText={labelText}
    value={value}
    max={max}
    handleChange={handleChange}
  />
);

SliderContainer.propTypes = propTypes;

SliderContainer.defaultProps = defaultProps;

export default SliderContainer;
