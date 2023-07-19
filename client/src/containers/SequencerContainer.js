import React, { useState, useEffect, useRef } from 'react';
import * as Tone from 'tone';
import SamplePlayer from '../components/SamplePlayer';
import Grid from '../components/Grid';
import './SequencerContainer.css';
import PresetService from '../services/PresetsService';
import PresetForm from '../components/PresetForm';

function SequencerContainer( {savePresetData} ) {

  const [bpm, setBpm] = useState(120)
  const [stepCount, setStepCount] = useState(0)
  const [selectedPreset, setSelectedPreset] = useState(null);

  const [selectedPresetBpm, setSelectedPresetBpm] = useState(120);

  const createInitialGrid = () => {
    const initialGrid = []
    const numSteps = 16
    const numRows = 12

    for (let row = 0; row < numRows; row++) {
      const gridRow = []
      for (let step = 0; step < numSteps; step++) {
        gridRow.push(null)
      }

      initialGrid.push(gridRow)
    }
    return initialGrid
    
  }


  const [grid, setGrid] = useState(createInitialGrid)
  const [selectedPresetGrid, setSelectedPresetGrid] = useState(createInitialGrid());

  const handlePresetSelect = (presetGrid, presetBpm) => {
    setSelectedPresetGrid(presetGrid);
    setSelectedPresetBpm(presetBpm);

    setGrid(presetGrid);
    setBpm(presetBpm);
  };


  const handleToggleSquare = (rowIndex, squareIndex) => {
    setGrid((prevGrid) => {
      const newGrid = [...prevGrid]; 
      newGrid[rowIndex] = [...prevGrid[rowIndex]]; 
      newGrid[rowIndex][squareIndex] = newGrid[rowIndex][squareIndex] ? null : "A" + (rowIndex + 1);
      return newGrid;
    });
  };


  const startAudioContext = () => {
    Tone.start().then(() => {
    }).catch((error) => {
    })
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
    if (loopRef.current) {
      loopRef.current.dispose();
    }
    const loop = new Tone.Sequence(
      (time, step) => {
        const stepSounds = grid.map((row) => row[step]).filter(Boolean);
        if (stepSounds.length > 0) {
          SamplePlayer.triggerAttackRelease(stepSounds, '4n', time);
        }
        setStepCount(step);
      },
      Array.from({ length: 16 }, (_, i) => i),
      '16n'
    );
    loopRef.current = loop;
    loop.start(0);
    Tone.Transport.start();
  };
  

  const loopRef = useRef(null)
  const handleStop = () => {
    if (loopRef.current) {
      loopRef.current.dispose()
    }
    Tone.Transport.stop()
    setStepCount(0)
  };


  const handleClear = () => {
    const initialGrid = createInitialGrid()
    setGrid(initialGrid)
  };


  const handleBpmChange = (event) => {
    const newBpm = parseInt(event.target.value)
    setBpm(newBpm)
  }

  const [presets, setPresets] = useState([])


  useEffect(() => {
    PresetService.getPresets()
      .then(presets => setPresets(presets))
  }, [])


  
  return (
    <div className='sequencer-container'>
      <div className='grid-container'>
        <Grid grid={grid} onToggleSquare={handleToggleSquare} stepCount={stepCount} />
      </div>
      <div className='controls-container'>
        <div className='playback-controls'>
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
          <button onClick={handleClear}>
            Clear
          </button>
        </div>
        <div className='preset-form'>
          <PresetForm presets={presets} setPresets={setPresets} bpm={bpm} grid={grid} onPresetSelect={handlePresetSelect} />
        </div>
      </div>
    </div>
  );
}

export default SequencerContainer;