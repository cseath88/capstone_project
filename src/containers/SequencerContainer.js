import React, { useState, useEffect } from 'react';
import * as Tone from 'tone';
import SamplePlayer from '../components/SamplePlayer';
import Grid from '../components/Grid';

function SequencerContainer() {
  const [bpm, setBpm] = useState(120)
    
  const createInitialGrid = () => {
    const initialGrid = [];
    const numSteps = 16;
    const numRows = 5;

    const sounds = Object.keys(SamplePlayer?.urls || {});
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

  useEffect(() => {
    Tone.Transport.bpm.value = bpm; // Update the BPM value whenever it changes
  }, [bpm]);

  const handlePlay = () => {
    const loop = new Tone.Sequence(
      (time, step) => {
        grid.forEach((row, rowIndex) => {
          const square = row[step];
          console.log("step", step)
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

  const handleBpmChange = (event) => {
    const newBpm = parseInt(event.target.value);
    setBpm(newBpm);
    console.log(newBpm)
  };

  return (
    <div>
      <Grid grid={grid} onToggleSquare={handleToggleSquare} />
      <button onClick={handlePlay}>Play</button>
      <button onClick={handleStop}>Stop</button>
      <div>
        <label>
          BPM:
          <input
            type="range"
            min="60"
            max="200"
            step="1"
            value={bpm}
            onChange={handleBpmChange}
          />
          {bpm} BPM
        </label>
      </div>
    </div>
  );
}

export default SequencerContainer;