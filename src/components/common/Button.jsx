import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  btnClassNames: PropTypes.string.isRequired,
  children: PropTypes.string.isRequired,
};

const Button = (props) => {
  const { btnClassNames, children, ...rest } = props;

  return (
    <button className={btnClassNames} type="button" {...rest}>
      <span className="btn__text">{children}</span>
    </button>
  );
};

Button.propTypes = propTypes;

export default Button;
