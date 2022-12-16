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

  //Add a reference to the current song
  const song = useRef("");
  //Add a reference to the album artwork image URL
  const imageURL = useRef("");

  function fetchData(){
    //Fetch the track info
    fetch("http://player.181fm.com/streamdata.php?h=listen.181fm.com&p=7080&i=181-" + stations[currentTrackIndex].id +"_128k.mp3")
    .then(response => response.json())
    .then(data => {
          song.current = data.song;
    })
    .then(() => {
          //Fetch the album info
          fetch("http://player.181fm.com/album.php?key=" + song.current, {referrer: "",})
          .then(response => response.json())
          .then(data => {
              imageURL.current = data.Image;
          })
          .catch(error => console.error(error))

    })
    .catch(error => console.error(error));
  }

  fetchData();

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
