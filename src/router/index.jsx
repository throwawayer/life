import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';

import AppContainer from 'containers/AppContainer';
import GameContainer from 'containers/GameContainer';

export default (
  <Router>
    <AppContainer>
      <Switch>
        <Route path="/" component={GameContainer} />
        <Route render={() => <Redirect to="/" />} />
      </Switch>
    </AppContainer>
  </Router>
);
