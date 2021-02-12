import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

const propTypes = {
  className: PropTypes.string.isRequired,
  labelText: PropTypes.string.isRequired,
  value: PropTypes.number.isRequired,
  max: PropTypes.number.isRequired,
  handleChange: PropTypes.func.isRequired,
};

const Slider = (props) => {
  const { className, labelText, value, max, handleChange } = props;

  const sliderClassName = cx('slider', {
    [`${className}`]: className,
  });

  const sliderId = `slider-${labelText}`;

  return (
    <label className={sliderClassName} htmlFor={sliderId}>
      {labelText}
      <input
        id={sliderId}
        type="range"
        min="0"
        max={max}
        value={value}
        className="slider__item"
        onChange={(e) => {
          e.preventDefault();
          handleChange(parseInt(e.target.value, 10));
        }}
      />
    </label>
  );
};

Slider.propTypes = propTypes;

export default Slider;
