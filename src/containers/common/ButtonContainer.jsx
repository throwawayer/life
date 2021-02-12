import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import Button from 'components/common/Button';

const propTypes = {
  className: PropTypes.string,
  btnType: PropTypes.string,
  disabled: PropTypes.bool,
  children: PropTypes.string,
  onClick: PropTypes.func,
};

const defaultProps = {
  className: '',
  btnType: '',
  disabled: false,
  children: '',
  onClick: () => {},
};

const ButtonContainer = (props) => {
  const { className, btnType, children, disabled, onClick, ...rest } = props;

  const btnClassNames = cx('btn', {
    [`btn--${btnType}`]: btnType,
    [`${className}`]: className,
  });

  return (
    <Button btnClassNames={btnClassNames} disabled={disabled} onClick={onClick} {...rest}>
      {children}
    </Button>
  );
};

ButtonContainer.propTypes = propTypes;

ButtonContainer.defaultProps = defaultProps;

export default ButtonContainer;
