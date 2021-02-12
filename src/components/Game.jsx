import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import { gridSizeEnum } from 'consts/enums';

const propTypes = {
  gridItems: PropTypes.arrayOf(PropTypes.bool).isRequired,
  gridSize: PropTypes.number.isRequired,
  handleUpdateGridItem: PropTypes.func.isRequired,
  gridRowSize: PropTypes.number,
};

const defaultProps = {
  gridRowSize: 0,
};

const Game = ({ gridItems, gridSize, gridRowSize, handleUpdateGridItem }) => (
  <form className="game" name="game" noValidate>
    {[...Array(gridRowSize).keys()].map((rowIndex) => {
      const currentRow = rowIndex * gridRowSize;
      const startArrayIndex = currentRow;
      const endArrayIndex = currentRow + gridRowSize;
      const gameRowClassName = cx('game-row', {
        'game-row--medium': gridSize === gridSizeEnum.Medium,
        'game-row--large': gridSize === gridSizeEnum.Large,
        'game-row--huge': gridSize === gridSizeEnum.Huge,
      });

      return (
        <div className={gameRowClassName} key={Math.random()}>
          {gridItems.slice(startArrayIndex, endArrayIndex).map((gridItem, itemIndex) => {
            const className = cx('game-row__cell', {
              'game-row__cell--alive': gridItem,
            });
            const actualIndex = currentRow + itemIndex;

            return (
              // eslint-disable-next-line jsx-a11y/control-has-associated-label
              <span
                role="checkbox"
                className={className}
                key={`${Math.random()}-${gridItem}`}
                onClick={() => handleUpdateGridItem(actualIndex)}
                onKeyPress={() => handleUpdateGridItem(actualIndex)}
                tabIndex={actualIndex}
                aria-checked={gridItem}
              />
            );
          })}
        </div>
      );
    })}
  </form>
);

Game.propTypes = propTypes;

Game.defaultProps = defaultProps;

export default Game;
