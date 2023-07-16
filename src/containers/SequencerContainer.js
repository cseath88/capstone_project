import React, { useState, useEffect } from 'react';
import * as Tone from 'tone';
import SamplePlayer from '../components/SamplePlayer';
import Grid from '../components/Grid';

function SequencerContainer() {
  const [bpm, setBpm] = useState(120)
  const [pingPongDelayFeedback, setPingPongDelayFeedback] = useState(0)
  const [reverbDecay, setReverbDecay] = useState(2)
  const [stepCount, setStepCount] = useState(0)
    
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
      }

      initialGrid.push(gridRow)
    }
    return initialGrid
    
  }

  const [grid, setGrid] = useState(createInitialGrid())

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
    )
  }

  useEffect(() => {
    const startAudioContext = () => {
      Tone.start()
    }
    document.addEventListener('mousedown', startAudioContext)
    return () => {
      document.removeEventListener('mousedown', startAudioContext)
    }
  }, [])

  useEffect(() => {
    Tone.Transport.bpm.value = bpm
  }, [bpm])

  const handlePlay = () => {
    const loop = new Tone.Sequence(
      (time, step) => {
        grid.forEach((row, rowIndex) => {
          const square = row[step]
          console.log("step", step)
          console.log(square)
          if (square.isActive && square.sound) {
            SamplePlayer.triggerAttackRelease(square.sound, '8n', time)
          }
        })
        setStepCount(step)
      },
      Array.from({ length: 16 }, (_, i) => i), 
      '8n' 
    )
  
    Tone.Transport.start()
    loop.start()
  }


  const handleStop = () => {
    Tone.Transport.stop()
  }

  const pingPongDelay = new Tone.PingPongDelay({
    feedback: pingPongDelayFeedback,
    wet: 0.3, 
  }).toDestination()

  const reverb = new Tone.Reverb({
    decay: reverbDecay,
    wet: 0.2, 
  }).toDestination()

  SamplePlayer.connect(pingPongDelay)
  SamplePlayer.connect(reverb)

  const handlePingPongDelayFeedbackChange = (event) => {
    const newFeedback = parseFloat(event.target.value)
    setPingPongDelayFeedback(newFeedback)
    pingPongDelay.feedback.value = newFeedback
  }

  const handleReverbDecayChange = (event) => {
    const newDecay = parseFloat(event.target.value)
    setReverbDecay(newDecay)
    reverb.decay = newDecay
  }

  const handleBpmChange = (event) => {
    const newBpm = parseInt(event.target.value)
    setBpm(newBpm)
    console.log(newBpm)
  }

  return (
    <div>
      <Grid grid={grid} onToggleSquare={handleToggleSquare} stepCount={stepCount} />
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
      <div>
        <label>
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
        </label>
      </div>
      <div>
        <label>
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
      </div>
    </div>
  )
}

export default SequencerContainer;