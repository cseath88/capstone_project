import React, { useEffect, useState } from 'react';
import './Grid.css';

const Grid = ({ grid, onToggleSquare, stepCount }) => {
  const [currentStep, setCurrentStep] = useState(-1);

  useEffect(() => {
    setCurrentStep(stepCount);
  }, [stepCount]);

  return (
    <div className="grid">
      {grid.map((row, rowIndex) => (
        <div className="grid-row" key={rowIndex}>
          {row.map((square, squareIndex) => (
            <button
              key={squareIndex}
              className={`grid-square ${square.isActive ? 'active' : ''} ${
                squareIndex === currentStep ? 'current-step' : ''
              }`}
              onClick={() => onToggleSquare(rowIndex, squareIndex)}
            >
              {square.sound}
            </button>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Grid;
