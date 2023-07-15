import React from 'react';
import './Grid.css'

const Grid = ({ grid, onToggleSquare }) => {


  return (
    <div className="grid">
      {grid.map((row, rowIndex) => (
        <div className="grid-row" key={rowIndex}>
          {row.map((square, squareIndex) => (
            <button
              key={squareIndex}
              className={`grid-square ${square.isActive ? 'active' : ''}`}
              onClick={() => onToggleSquare(rowIndex, squareIndex)}
            >
              {square.sound}
            </button>
          ))}
        </div>
      ))}
    </div>
  );
}

export default Grid;
