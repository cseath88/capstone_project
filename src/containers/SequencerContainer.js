import React, { useState, useEffect } from 'react';
import * as Tone from 'tone';
import SamplePlayer from '../components/SamplePlayer';
import Grid from '../components/Grid';

function SequencerContainer() {

  
  const createInitialGrid = () => {
    const initialGrid = [];
    const numSteps = 16;
    const numRows = 5;
  
    const sounds = Object.values(SamplePlayer.loaded);
    for (let row = 0; row < numRows; row++) {
      const gridRow = [];
  
      for (let step = 0; step < numSteps; step++) {
        gridRow.push({
          sound: sounds[row],
          isActive: false,
        });
      }
  
      initialGrid.push(gridRow);
    }
    console.log(initialGrid)
    return initialGrid;
  };

  const [grid, setGrid] = useState(createInitialGrid());

  const handleToggleSquare = (rowIndex, squareIndex) => {
    setGrid((prevGrid) =>
      prevGrid.map((row, currRowIndex) =>
        currRowIndex === rowIndex
          ? row.map((square, currSquareIndex) =>
              currSquareIndex === squareIndex
                ? { ...square, isActive: !square.isActive }
                : square
            )
          : row
      )
    );
  };

  useEffect(() => {
    const startAudioContext = () => {
      Tone.start();
    };
    document.addEventListener('mousedown', startAudioContext);
    return () => {
      document.removeEventListener('mousedown', startAudioContext);
    };
  }, []);

  const handlePlay = () => {
    const loop = new Tone.Sequence(
      (time, step) => {
        grid.forEach((row, rowIndex) => {
          const square = row[step];
          console.log(square)
          if (square.isActive && square.sound) {
            SamplePlayer.triggerAttackRelease(square.sound, '8n', time);
          }
        });
      },
      Array.from({ length: 16 }, (_, i) => i), 
      '8n' 
    );
  
    Tone.Transport.start();
    loop.start();
  };

  const handleStop = () => {
    Tone.Transport.stop()
  }

  return (
    <div>
      <Grid grid={grid} onToggleSquare={handleToggleSquare} />
      <button onClick={handlePlay}>Play</button>
      <button onClick={handleStop}>Stop</button>
    </div>
  );
}

export default SequencerContainer;