import React from 'react';
import { makeObservable, observable, runInAction, action, computed, toJS } from 'mobx';

import { gridSizes, gridSizeEnum, gridSpeedsEnum, gridPatternsEnum } from 'consts/enums';
import {
  gosperGliderGun,
  simkinGliderGun,
  pulsar,
  edenGarden,
  glider,
  lwss,
  hwss,
  pentadecathlon,
  dieHard,
} from 'consts/patterns';
import { getSize } from 'utils/helpers';

export default class GameStore {
  gridSize;
  gridSpeed;
  gridItems;
  gridPattern;
  gridRowSize;
  firstGenerationGrid;

  constructor() {
    makeObservable(this, {
      gridSize: observable,
      gridSpeed: observable,
      gridItems: observable,
      gridPattern: observable,
      clearGrid: action,
      resetGrid: action,
      updateGrid: action,
      updateGridItem: action,
      setGridSize: action,
      setGridSpeed: action,
      setPatternGrid: action,
      isGridEmpty: computed,
      totalGridSize: computed,
      aliveCellsIndexes: computed,
    });

    this.gridSize = gridSizeEnum.Small;
    this.gridSpeed = gridSpeedsEnum.Normal;
    this.gridPattern = gridPatternsEnum.None;
    this.gridItems = Array(this.totalGridSize).fill(false);
    this.gridRowSize = this.totalGridSize / 10;
    this.firstGenerationGrid = Array(this.totalGridSize).fill(false);

    this.clearGrid = this.clearGrid.bind(this);
    this.resetGrid = this.resetGrid.bind(this);
    this.updateGrid = this.updateGrid.bind(this);
    this.setGridSpeed = this.setGridSpeed.bind(this);
    this.setGridSize = this.setGridSize.bind(this);
    this.setFirstGenerationGrid = this.setFirstGenerationGrid.bind(this);
    this.setPatternGrid = this.setPatternGrid.bind(this);
  }

  clearGrid() {
    runInAction(() => {
      this.gridItems = toJS(Array(this.totalGridSize).fill(false));

      if (this.gridPattern !== gridPatternsEnum.None) {
        this.gridPattern = gridPatternsEnum.None;
      }
    });
    this.setFirstGenerationGrid();
  }

  resetGrid() {
    runInAction(() => {
      this.gridItems = this.firstGenerationGrid.slice();
    });
  }

  updateGrid() {
    const gridItemsDeepClone = toJS(this.gridItems);
    runInAction(() => {
      this.gridItems = gridItemsDeepClone.map((gridItem, cellIndex) => {
        const livingSurroundingCells = [];

        for (let i = -1; i < 2; i += 1) {
          // upper cells check
          let upperCellIndex = cellIndex - this.gridRowSize + i;

          if (upperCellIndex < 0) {
            upperCellIndex += this.totalGridSize;
          }

          if (gridItemsDeepClone[upperCellIndex]) {
            livingSurroundingCells.push(true);
          }

          // lateral cells check (i === 0 ignored, because it's the current cell)
          if (i !== 0) {
            const lateralCellIndex = cellIndex + i;

            if (
              lateralCellIndex > 0
              && lateralCellIndex < this.totalGridSize
              && gridItemsDeepClone[lateralCellIndex]
            ) {
              livingSurroundingCells.push(true);
            }
          }

          // bottom cells check
          let bottomCellIndex = cellIndex + this.gridRowSize + i;

          if (bottomCellIndex > this.totalGridSize) {
            bottomCellIndex -= this.totalGridSize;
          }

          if (gridItemsDeepClone[bottomCellIndex]) {
            livingSurroundingCells.push(true);
          }
        }

        const isInGoldilocksZone = livingSurroundingCells.length === 3;
        const canStayAlive = isInGoldilocksZone || livingSurroundingCells.length === 2;

        if (!gridItem) {
          return isInGoldilocksZone;
        }

        return canStayAlive;
      });
    });
  }

  updateGridItem(itemIndex) {
    runInAction(() => {
      this.gridItems = toJS(
        this.gridItems.map((gridItem, index) => (itemIndex === index ? !gridItem : gridItem)),
      );
    });
  }

  setFirstGenerationGrid() {
    this.firstGenerationGrid = this.gridItems.slice();
  }

  setGridSize(newGridSize) {
    const newTotalSize = gridSizes[newGridSize];
    const newGridRowSize = newTotalSize / (10 + newGridSize * 10);

    runInAction(() => {
      const movableCellIndexes = [];

      this.aliveCellsIndexes.forEach((cellIndex) => {
        let aliveCellToRelocate = cellIndex;

        // relocate cell on grid increase
        if (cellIndex < this.totalGridSize && cellIndex >= this.gridRowSize) {
          const rowIndex = Math.floor(cellIndex / this.gridRowSize);
          const cellIndexInRow = Math.floor(cellIndex - this.gridRowSize * rowIndex);
          aliveCellToRelocate = cellIndexInRow + newGridRowSize * rowIndex;
        }

        movableCellIndexes.push(aliveCellToRelocate);
      });

      this.gridItems = toJS(
        Array(newTotalSize)
          .fill(false)
          .map((_, index) => movableCellIndexes.includes(index)),
      );

      this.setFirstGenerationGrid();
      this.gridSize = newGridSize;
    });

    this.gridRowSize = newGridRowSize;
  }

  setGridSpeed(gridSpeed) {
    runInAction(() => {
      this.gridSpeed = gridSpeed;
    });
  }

  setPatternGrid(value, letter) {
    const newSize = getSize(letter);

    runInAction(() => {
      if (newSize !== -1) {
        this.gridSize = newSize;
        const newTotalSize = gridSizes[this.gridSize];
        const newGridRowSize = newTotalSize / (10 + this.gridSize * 10);

        let patternArray = [];

        switch (value) {
          case gridPatternsEnum.GosperGliderGunM:
            patternArray = gosperGliderGun;
            break;
          case gridPatternsEnum.SimkinGliderGunL:
            patternArray = simkinGliderGun;
            break;
          case gridPatternsEnum.PulsarM:
            patternArray = pulsar;
            break;
          case gridPatternsEnum.EdenGardenL:
            patternArray = edenGarden;
            break;
          case gridPatternsEnum.GliderS:
            patternArray = glider;
            break;
          case gridPatternsEnum.LwssS:
            patternArray = lwss;
            break;
          case gridPatternsEnum.HwssS:
            patternArray = hwss;
            break;
          case gridPatternsEnum.PentadecathlonS:
            patternArray = pentadecathlon;
            break;
          case gridPatternsEnum.DieHardL:
            patternArray = dieHard;
            break;
          default:
            patternArray = [];
        }

        this.gridRowSize = newGridRowSize;
        this.gridItems = toJS(
          Array(this.totalGridSize)
            .fill(false)
            .map((_, index) => patternArray.includes(index)),
        );

        this.setFirstGenerationGrid();
      } else {
        this.clearGrid();
      }

      this.gridPattern = value;
    });
  }

  get isGridEmpty() {
    return this.gridItems.length === 0 || !this.gridItems.some((cell) => cell);
  }

  get totalGridSize() {
    return gridSizes[this.gridSize];
  }

  get aliveCellsIndexes() {
    const result = [];

    this.gridItems.forEach((cell, index) => {
      if (cell) {
        result.push(index);
      }
    });

    return result;
  }
}

const GameStoreContext = React.createContext(GameStore);
export { GameStoreContext };
