import { useState, useRef } from 'react';
import './App.css';
import { AudioControls } from './components/AudioControls';
import { SongInfo } from './components/SongInfo';
import {StyledApp} from './styles/StyledApp';

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

  return (
    <div className="App">
      <StyledApp>
        <h4>Radio 2000</h4>
        <h3>
          {stations[currentTrackIndex].title}
        </h3>
        <SongInfo stations={stations} currentTrackIndex={currentTrackIndex}/>
        <AudioControls stations={stations} currentTrackIndex={currentTrackIndex} setCurrentTrackIndex = {setCurrentTrackIndex}/>
      </StyledApp>
    </div>
  );
}

export default App;
