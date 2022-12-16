import './App.css';
import { AudioPlayer } from './components/AudioPlayer';
import { useRef, useState } from 'react';
import { AudioControls } from './components/AudioControls';

function App() {
  //Create a list of stations with their titles and ID's
  const stations = [
    {title : 'Vibe of Vegas', id : 'vibe'},
    {title : 'The Heart (Love Songs)', id : 'heart'},
    {title : 'UK top 40', id : 'uktop40'},
    {title : 'Smooth AC', id : 'smoothac'}
  ];
  //Keeps track of current track
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  //Station URL
  const stationURL = useRef("");
  //Generate a link from the stations
  stationURL.current = generateLink(stations[currentTrackIndex].id);

  function generateLink(id: String){
    return "http://listen.181fm.com/181-" + id + "_128k.mp3";
  }


  return (
    <div className="App">
      <AudioPlayer stationURL={stationURL.current}/>
      <AudioControls/>
    </div>
  );
}

export default App;
