import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  labelText: PropTypes.string.isRequired,
  value: PropTypes.number.isRequired,
  selectClassName: PropTypes.string.isRequired,
  selectId: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.shape({ label: PropTypes.string, value: PropTypes.number, size: PropTypes.string }),
  ).isRequired,
  handleChange: PropTypes.func.isRequired,
};

const Select = (props) => {
  const { labelText, value, selectClassName, selectId, options, handleChange } = props;

  return (
    <label className={selectClassName} htmlFor={selectId}>
      {labelText}
      <select
        id={selectId}
        name={selectId}
        list={labelText}
        value={value}
        className="select__item"
        onChange={(e) => {
          e.preventDefault();
          handleChange(parseInt(e.target.value, 10));
        }}
      >
        {options.map((option) => (
          <option
            key={option.value}
            value={option.value}
            label={option.label}
            data-size={option.size}
          >
            {option.label}
          </option>
        ))}
      </select>
    </label>
  );
};

Select.propTypes = propTypes;

export default Select;
