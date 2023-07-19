import * as Tone from 'tone';

const SamplePlayer = new Tone.Sampler({
  urls: {
    A1: 'kick.wav',
    A2: 'hihat.wav',
    A3: 'hihat2.wav',
    A4: 'snare.wav',
    A5: 'sample1.wav',
    A6: 'sample3.wav',
    A7: 'sample4.wav',
    A8: 'sample5.wav',
    A9: 'sample6.wav',
    A10: 'vox1.wav',
    A11: 'vox2.wav',
    A12: 'vox3.wav'
  },
  baseUrl: 'http://localhost:3000/samples/',
  release: 1
}).toDestination()

export default SamplePlayer;
