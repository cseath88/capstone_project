import * as Tone from 'tone';

const SamplePlayer = new Tone.Sampler({
  urls: {
    A1: 'kick.wav',
    A2: 'hihat.wav',
    A3: 'hihat2.wav',
    A4: 'snare.wav',
    A5: 'bass2.wav',
    A6: 'bass3.wav',
    A7: 'plink2.wav',
    A8: 'guitar1.wav',
    A9: 'plink.wav',
    A10: 'vocals1.wav',
    A11: 'vox2.wav',
    A12: 'vocals3.wav',
    A13: 'vocals4.wav'
  },
  baseUrl: 'http://localhost:3000/samples/',
  release: 1
}).toDestination()

export default SamplePlayer;
