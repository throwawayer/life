import React from 'react';
import PropTypes from 'prop-types';

import App from 'components/App';

const propTypes = {
  children: PropTypes.node.isRequired,
};

const AppContainer = ({ children }) => <App>{children}</App>;

AppContainer.propTypes = propTypes;

export default AppContainer;
