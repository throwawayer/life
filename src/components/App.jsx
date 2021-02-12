import React from 'react';
import PropTypes from 'prop-types';

import DashboardContainer from 'containers/DashboardContainer';

const propTypes = {
  children: PropTypes.node.isRequired,
};
const App = ({ children }) => (
  <div className="page-container">
    <header className="page-container-header dashboard">
      <DashboardContainer />
    </header>
    <article className="page-container-body">{children}</article>
  </div>
);

App.propTypes = propTypes;

export default App;
