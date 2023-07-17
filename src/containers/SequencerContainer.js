import React, { useState, useEffect } from 'react';
import * as Tone from 'tone';
import SamplePlayer from '../components/SamplePlayer';
import Grid from '../components/Grid';
import './SequencerContainer.css';

function SequencerContainer() {

  const [bpm, setBpm] = useState(120)
  const [stepCount, setStepCount] = useState(0)

  
  const createInitialGrid = () => {
    const initialGrid = []
    const numSteps = 16
    const numRows = 5

    for (let row = 0; row < numRows; row++) {
      const gridRow = []
      for (let step = 0; step < numSteps; step++) {
        gridRow.push({
          sound: null,
          isActive: false,
        })
      }

      initialGrid.push(gridRow)
    }
    return initialGrid
    
  }

  const [grid, setGrid] = useState(createInitialGrid)


  const handleToggleSquare = (rowIndex, squareIndex) => {
    setGrid((prevGrid) =>
      prevGrid.map((row, currRowIndex) =>
        currRowIndex === rowIndex
          ? row.map((square, currSquareIndex) =>
              currSquareIndex === squareIndex
                ? { ...square, isActive: !square.isActive } // Toggle the isActive property
                : square
            )
          : row
      )
    );
  };


  const startAudioContext = () => {
    Tone.start().then(() => {
    }).catch((error) => {
    });
  };


  useEffect(() => {
    document.addEventListener('mousedown', startAudioContext);
    return () => {
      // document.removeEventListener('mousedown', startAudioContext);
    };


  }, []);

  useEffect(() => {
    Tone.Transport.bpm.value = bpm
  }, [bpm])


  const handlePlay = () => {
    const loop = new Tone.Sequence(
      (time, step) => {
            SamplePlayer.triggerAttackRelease(step, '8n', time)
        setStepCount(step)
      },
      Array.from({ length: 16 }, (_, i) =>
      grid.map((row) => row[i].sound)
      ),
      '8n' 
    )
    loop.start(0)
    Tone.Transport.start()
  }


  const handleStop = () => {
    Tone.Transport.stop()
  }


  const handleBpmChange = (event) => {
    const newBpm = parseInt(event.target.value)
    setBpm(newBpm)
    console.log(newBpm)
  }



  return (
    <div className='sequencer-container'>
      <div className='grid-container'>
        <Grid grid={grid} onToggleSquare={handleToggleSquare} stepCount={stepCount} />
      </div>
      <div className='controls-container'>
        <button onClick={handlePlay}>
          <i className="fas fa-play"></i>
        </button>
        <button onClick={handleStop}>
          <i className="fas fa-stop"></i>
        </button>
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