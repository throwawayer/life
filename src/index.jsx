import React from 'react';
import ReactDOM from 'react-dom';

import Routes from 'router';
import GameStore, { GameStoreContext } from 'stores/GameStore';

import('assets/styles/styles.styl');

ReactDOM.render(
  <React.StrictMode>
    <GameStoreContext.Provider value={new GameStore()}>{Routes}</GameStoreContext.Provider>
  </React.StrictMode>,
  document.getElementById('app'),
);
