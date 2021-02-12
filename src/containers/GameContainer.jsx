import React from 'react';
import { observer } from 'mobx-react-lite';

import { GameStoreContext } from 'stores/GameStore';
import Game from 'components/Game';

const GameContainer = observer(() => {
  const gameStore = React.useContext(GameStoreContext);
  const { gridItems, gridRowSize, gridSize } = gameStore;
  const updateGridItem = gameStore.updateGridItem.bind(gameStore);

  const handleUpdateGridItem = (itemIndex) => {
    updateGridItem(itemIndex);
  };

  return (
    <Game
      gridItems={gridItems}
      gridRowSize={gridRowSize}
      gridSize={gridSize}
      handleUpdateGridItem={handleUpdateGridItem}
    />
  );
});

export default GameContainer;
