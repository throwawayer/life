import React, { useEffect, useState, useCallback, useContext, useRef } from 'react';
import { observer } from 'mobx-react-lite';

import { GameStoreContext } from 'stores/GameStore';
import Dashboard from 'components/Dashboard';
import { gridSpeeds, gridPatternsEnum, keysEnum } from 'consts/enums';

const DashboardContainer = observer(() => {
  const intervalLoop = useRef(0);
  const currentSpeedSet = useRef(0);

  const [isStarted, setIsStarted] = useState(false);
  const [generationCount, setGenerationCount] = useState(0);

  const gameStore = useContext(GameStoreContext);

  const handleStartOrStop = useCallback(() => {
    setIsStarted((started) => !started);
  }, []);

  const handleNext = useCallback(() => {
    if (!gameStore.isGridEmpty) {
      setGenerationCount((gCount) => gCount + 1);
    }
  }, [gameStore]);

  const handleResetOrClear = useCallback(() => {
    setGenerationCount((gCount) => {
      if (gCount > 0) {
        gameStore.resetGrid();
        return 0;
      }

      gameStore.clearGrid();
      return gCount;
    });
  }, [gameStore]);

  const handleSpeedChange = useCallback(
    (value) => {
      gameStore.setGridSpeed(value);
    },
    [gameStore],
  );

  const handleGridSizeChange = useCallback(
    (value) => {
      gameStore.setGridSize(value);
    },
    [gameStore],
  );

  const handlePatternChange = useCallback(
    (value) => {
      setGenerationCount(() => {
        const size = Object.keys(gridPatternsEnum)[value];
        const letter = size.slice(size.length - 1);

        gameStore.setPatternGrid(value, letter);

        return 0;
      });
    },
    [gameStore],
  );

  useEffect(() => {
    if (generationCount > 0) {
      if (generationCount === 1) {
        gameStore.setFirstGenerationGrid();
      }

      gameStore.updateGrid();
    }
  }, [gameStore, generationCount]);

  useEffect(() => {
    if (gameStore.isGridEmpty && generationCount > 0) {
      setIsStarted(false);
      setGenerationCount(0);
    }
  }, [gameStore, generationCount]);

  useEffect(() => {
    const currentSpeed = gridSpeeds[gameStore.gridSpeed];

    if (isStarted && !gameStore.isGridEmpty) {
      currentSpeedSet.current = currentSpeed;
      intervalLoop.current = setInterval(() => {
        handleNext();
      }, currentSpeed);
    } else if (!isStarted && intervalLoop.current > 0) {
      clearInterval(intervalLoop.current);
    }

    return () => clearInterval(intervalLoop.current);
  }, [gameStore, gameStore.gridSpeed, isStarted, handleNext]);

  useEffect(() => {
    document.addEventListener('keypress', (e) => {
      switch (e.code) {
        case keysEnum.Space:
          e.preventDefault();
          handleStartOrStop();
          break;
        case keysEnum.KeyR:
        case keysEnum.KeyC:
          e.preventDefault();
          handleResetOrClear();
          break;
        case keysEnum.KeyD:
          e.preventDefault();
          handleNext();
          break;
        default:
      }
    });

    return () => document.removeEventListener('keypress', () => {});
  }, [handleStartOrStop, handleResetOrClear, handleNext]);

  return (
    <Dashboard
      gridSize={gameStore.gridSize}
      gridSpeed={gameStore.gridSpeed}
      gridPattern={gameStore.gridPattern}
      isGridEmpty={gameStore.isGridEmpty}
      generationCount={generationCount}
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
