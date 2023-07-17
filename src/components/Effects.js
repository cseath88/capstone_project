  // const [pingPongDelayFeedback, setPingPongDelayFeedback] = useState(0)
  // const [reverbDecay, setReverbDecay] = useState(2)
  // const [isPingPongDelayActive, setIsPingPongDelayActive] = useState(false)
  // const [isReverbActive, setIsReverbActive] = useState(false)

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

  // const togglePingPongDelay = () => {
  //   setIsPingPongDelayActive((prevValue) => !prevValue)
  // }

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

  // <h2>Effects</h2>
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
