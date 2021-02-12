import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import Select from 'components/common/Select';
import { gridPatternsEnum } from 'consts/enums';

const propTypes = {
  className: PropTypes.string,
  labelText: PropTypes.string,
  value: PropTypes.number,
  options: PropTypes.arrayOf(
    PropTypes.shape({ label: PropTypes.string, value: PropTypes.number, size: PropTypes.string }),
  ),
  handleChange: PropTypes.func,
};

const defaultProps = {
  className: '',
  labelText: '',
  value: gridPatternsEnum.None,
  options: [],
  handleChange: () => {},
};

const SelectContainer = ({ className, labelText, value, options, handleChange }) => {
  const selectClassName = cx('select', {
    [`${className}`]: className,
  });

  const selectId = `select-${labelText}`;

  return (
    <Select
      className={className}
      labelText={labelText}
      value={value}
      selectClassName={selectClassName}
      selectId={selectId}
      options={options}
      handleChange={handleChange}
    />
  );
};

SelectContainer.propTypes = propTypes;

SelectContainer.defaultProps = defaultProps;

export default SelectContainer;
