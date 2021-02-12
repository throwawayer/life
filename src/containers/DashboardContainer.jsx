import React from 'react';
import { observer } from 'mobx-react-lite';

import { GameStoreContext } from 'stores/GameStore';
import Dashboard from 'components/Dashboard';
import { gridSpeeds, gridPatternsEnum } from 'consts/enums';

const DashboardContainer = observer(() => {
  const intervalLoop = React.useRef(0);

  const [isStarted, setIsStarted] = React.useState(false);
  const [generationCount, setGenerationCount] = React.useState(0);

  const gameStore = React.useContext(GameStoreContext);
  const { isGridEmpty, gridSize, gridSpeed, gridPattern } = gameStore;
  const clearGrid = gameStore.clearGrid.bind(gameStore);
  const resetGrid = gameStore.resetGrid.bind(gameStore);
  const updateGrid = gameStore.updateGrid.bind(gameStore);
  const setGridSpeed = gameStore.setGridSpeed.bind(gameStore);
  const setGridSize = gameStore.setGridSize.bind(gameStore);
  const setFirstGenerationGrid = gameStore.setFirstGenerationGrid.bind(gameStore);
  const setPatternGrid = gameStore.setPatternGrid.bind(gameStore);

  const calculateNextStep = React.useCallback(() => {
    if (generationCount > 0 && isGridEmpty) {
      setIsStarted(false);
      setGenerationCount(0);
      return;
    }

    if (generationCount === 0) {
      setFirstGenerationGrid();
    }

    setGenerationCount(generationCount + 1);
    updateGrid();
  }, [generationCount, updateGrid, setFirstGenerationGrid, isGridEmpty]);

  const handleResetOrClear = () => {
    if (generationCount > 0) {
      setGenerationCount(0);
      resetGrid();
    } else if (!isGridEmpty) {
      clearGrid();
    }
  };

  const handleStartOrStop = () => {
    setIsStarted(!isStarted);
  };

  const handleNext = () => {
    calculateNextStep();
  };

  const handleSpeedChange = (value) => {
    setGridSpeed(value);
  };

  const handleGridSizeChange = (value) => {
    setGridSize(value);
  };

  const handlePatternChange = (value) => {
    if (!isGridEmpty && generationCount > 0) {
      setGenerationCount(0);
    }

    const size = Object.keys(gridPatternsEnum)[value];
    const letter = size.slice(size.length - 1);

    setPatternGrid(value, letter);
  };

  React.useEffect(() => {
    if (isStarted) {
      intervalLoop.current = setInterval(() => {
        calculateNextStep();
      }, gridSpeeds[gridSpeed]);
    } else {
      clearInterval(intervalLoop.current);
    }

    return () => clearInterval(intervalLoop.current);
  }, [isStarted, gridSpeed, updateGrid, calculateNextStep]);

  React.useEffect(() => {
    if (isGridEmpty && generationCount > 0) {
      setGenerationCount(0);
    }
  }, [generationCount, isGridEmpty]);

  return (
    <Dashboard
      generationCount={generationCount}
      gridSize={gridSize}
      gridSpeed={gridSpeed}
      gridPattern={gridPattern}
      isGridEmpty={isGridEmpty}
      isStarted={isStarted}
      handleResetOrClear={handleResetOrClear}
      handleStartOrStop={handleStartOrStop}
      handleNext={handleNext}
      handleSpeedChange={handleSpeedChange}
      handleGridSizeChange={handleGridSizeChange}
      handlePatternChange={handlePatternChange}
    />
  );
});

export default DashboardContainer;
