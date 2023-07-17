import React, { useState, useEffect } from 'react';
import * as Tone from 'tone';
import SamplePlayer from '../components/SamplePlayer';
import Grid from '../components/Grid';
import './SequencerContainer.css';

function SequencerContainer() {

  const [bpm, setBpm] = useState(120)
  const [pingPongDelayFeedback, setPingPongDelayFeedback] = useState(0)
  const [reverbDecay, setReverbDecay] = useState(2)
  const [stepCount, setStepCount] = useState(0)
  const [isPingPongDelayActive, setIsPingPongDelayActive] = useState(false)
  const [isReverbActive, setIsReverbActive] = useState(false)
  

  const createInitialGrid = () => {
    const initialGrid = []
    const numSteps = 16
    const numRows = 5

    const sounds = Object.keys(SamplePlayer?.urls || {})
    for (let row = 0; row < numRows; row++) {
      const gridRow = []
      for (let step = 0; step < numSteps; step++) {
        gridRow.push({
          sound: sounds[row],
          isActive: false,
        })
        console.log("Sounds", sounds)
      }

      initialGrid.push(gridRow)
    }
    return initialGrid
    
  }
  // console.log(SamplePlayer)

  const [grid, setGrid] = useState(createInitialGrid())


  const handleToggleSquare = (rowIndex, squareIndex) => {
    setGrid((prevGrid) =>
      prevGrid.map((row, currRowIndex) =>
        currRowIndex === rowIndex
          ? row.map((square, currSquareIndex) =>
              currSquareIndex === squareIndex
                ? { sound: "A1", isActive: !square.isActive }
                : square
            )
          : row
      )
    )
  }


  const startAudioContext = () => {
    Tone.start().then(() => {
    }).catch((error) => {
    });
  };


  useEffect(() => {
    document.addEventListener('mousedown', startAudioContext);
    return () => {
      document.removeEventListener('mousedown', startAudioContext);
    };
  }, []);

  useEffect(() => {
    Tone.Transport.bpm.value = bpm
  }, [bpm])


  const handlePlay = () => {
    const loop = new Tone.Sequence(
      (time, step) => {
        // grid.forEach((row, rowIndex) => {
        //   const square = row[step]
        //   console.log("step", step)
        //   console.log(square)
        //   // if (square.isActive && square.sound) {
        //     console.log(time)
            SamplePlayer.triggerAttackRelease(step, '8n', time)
          // }
        // })
        setStepCount(step)
      },
      Array.from({ length: 16 }, (_, i) => grid[0][i].sound || null), 
      '8n' 
    )
    loop.start(0)
    Tone.Transport.start()
  }


  const handleStop = () => {
    Tone.Transport.stop()
  }


  // const pingPongDelay = new Tone.PingPongDelay({
  //   feedback: pingPongDelayFeedback,
  //   wet: isPingPongDelayActive ? 0.3 : 0, 
  // }).toDestination()

  // const reverb = new Tone.Reverb({
  //   decay: reverbDecay,
  //   wet: isReverbActive ? 0.2 : 0, 
  // }).toDestination()

  // SamplePlayer.connect(pingPongDelay);
  // SamplePlayer.connect(reverb);

  const togglePingPongDelay = () => {
    setIsPingPongDelayActive((prevValue) => !prevValue)
  }

  // const toggleReverb = () => {
  //   setIsReverbActive((prevValue) => !prevValue)
  // }

  // const handlePingPongDelayFeedbackChange = (event) => {
  //   const newFeedback = parseFloat(event.target.value)
  //   setPingPongDelayFeedback(newFeedback)
  //   pingPongDelay.feedback.value = newFeedback
  // }

  // const handleReverbDecayChange = (event) => {
  //   const newDecay = parseFloat(event.target.value)
  //   setReverbDecay(newDecay)
  //   reverb.decay = newDecay
  // }

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
      <h2>Effects</h2>
        {/* <label>
          PingPong Delay Feedback:
          <input
            type="range"
            min="0"
            max="0.9"
            step="0.01"
            value={pingPongDelayFeedback}
            onChange={handlePingPongDelayFeedbackChange}
          />
          {pingPongDelayFeedback}
        </label> */}
        {/* <button onClick={togglePingPongDelay}>
          {isPingPongDelayActive ? <i className="fas fa-toggle-off"></i> : <i className="fas fa-toggle-on"></i>}
        </button> */}
        {/* <label>
          Reverb Decay:
          <input
            type="range"
            min="0.1"
            max="10"
            step="0.1"
            value={reverbDecay}
            onChange={handleReverbDecayChange}
          />
          {reverbDecay}
        </label>
        <button onClick={toggleReverb}>
          {isReverbActive ? <i className="fas fa-toggle-off"></i> : <i className="fas fa-toggle-on"></i>}
        </button> */}
      </div>
    </div>
  );
}

export default SequencerContainer;