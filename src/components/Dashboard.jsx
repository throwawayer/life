import React from 'react';
import PropTypes from 'prop-types';

import ButtonContainer from 'containers/common/ButtonContainer';
import SliderContainer from 'containers/common/SliderContainer';
import SelectContainer from 'containers/common/SelectContainer';
import { gridSizeEnum, gridSpeedsEnum, gridPatternsEnum } from 'consts/enums';
import { formatWord } from 'utils/helpers';

const propTypes = {
  generationCount: PropTypes.number.isRequired,
  gridSize: PropTypes.number.isRequired,
  gridSpeed: PropTypes.number.isRequired,
  gridPattern: PropTypes.number.isRequired,
  handleResetOrClear: PropTypes.func.isRequired,
  handleStartOrStop: PropTypes.func.isRequired,
  handleNext: PropTypes.func.isRequired,
  handleSpeedChange: PropTypes.func.isRequired,
  handleGridSizeChange: PropTypes.func.isRequired,
  handlePatternChange: PropTypes.func.isRequired,
  isGridEmpty: PropTypes.bool,
  isStarted: PropTypes.bool,
};

const defaultProps = {
  isGridEmpty: false,
  isStarted: false,
};

const Dashboard = (props) => {
  const {
    generationCount,
    gridSize,
    gridSpeed,
    gridPattern,
    handleResetOrClear,
    handleStartOrStop,
    handleNext,
    handleSpeedChange,
    handleGridSizeChange,
    handlePatternChange,
    isGridEmpty,
    isStarted,
  } = props;

  let resetClearButtonText = 'Reset';

  if (generationCount === 0 && !isGridEmpty) {
    resetClearButtonText = 'Clear';
  }

  return (
    <>
      <h1 className="dashboard-title">Conway&apos;s Game of Life</h1>
      <form className="dashboard-dash" noValidate>
        <ButtonContainer btnType="primary" onClick={handleResetOrClear} disabled={isGridEmpty}>
          {resetClearButtonText}
        </ButtonContainer>
        <ButtonContainer btnType="primary" onClick={handleStartOrStop} disabled={isGridEmpty}>
          {isStarted ? 'Stop' : 'Start'}
        </ButtonContainer>
        <ButtonContainer btnType="secondary" onClick={handleNext} disabled={isGridEmpty}>
          Next
        </ButtonContainer>
        <SliderContainer
          className="dashboard-dash__item"
          labelText={`Speed: ${Object.keys(gridSpeedsEnum)[gridSpeed]}`}
          value={gridSpeed}
          max={Object.keys(gridSpeedsEnum).length - 1}
          handleChange={handleSpeedChange}
        />
        <SliderContainer
          className="dashboard-dash__item"
          labelText={`Grid size: ${Object.keys(gridSizeEnum)[gridSize]}`}
          value={gridSize}
          max={Object.keys(gridSizeEnum).length - 1}
          handleChange={handleGridSizeChange}
        />
        <SelectContainer
          className="dashboard-dash__item"
          labelText="Pattern"
          value={gridPattern}
          options={Object.keys(gridPatternsEnum).map((pattern) => ({
            value: gridPatternsEnum[pattern],
            label: formatWord(pattern),
            size: pattern.slice(pattern.length - 1),
          }))}
          handleChange={handlePatternChange}
        />
      </form>
      <div className="dashboard-title dashboard-title--right">
        <h2>{`Generation: ${generationCount}`}</h2>
      </div>
    </>
  );
};

Dashboard.propTypes = propTypes;

Dashboard.defaultProps = defaultProps;

export default Dashboard;
