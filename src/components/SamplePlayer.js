import { Sampler } from 'tone';

const SamplePlayer = new Sampler({
  urls: {
    A1: 'kick.wav',
    A2: 'snare.wav',
    A3: 'hihat.wav',
    A4: 'shaker.wav',
    A5: 'clap.wav'
  },
  baseUrl: 'http://localhost:3000/samples/',
  release: 1
}).toDestination();




export default SamplePlayer;
