import './App.css';
import { AudioPlayer } from './components/AudioPlayer';
import { useRef, useState } from 'react';
import { FaStepBackward, FaPlayCircle, FaStepForward, FaPauseCircle } from 'react-icons/fa'

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
  //Keeps track if audio is playing
  const [playing, setPlaying] = useState<boolean>(false);

  //Station URL
  const stationURL = useRef("");
  //Generate a link from the stations
  stationURL.current = generateLink(stations[currentTrackIndex].id);

  //Function to skip to the previous track
  function prevTrack(){
    //If at the beginning, wrap around
    if (currentTrackIndex -1 < 0){
        setCurrentTrackIndex(stations.length - 1);
    }
    else{
        //Set the track index to the previous track
        setCurrentTrackIndex((value) => value - 1);
    }

    //Change the station URL
    stationURL.current = generateLink(stations[currentTrackIndex].id);
    //Make the playing match the state of the audio
    setPlaying(false)
  }

  //Toggle playing
  function playPause(){
      setPlaying(!playing);
  }
  function nextTrack(){
      //If at the end, wrap around
      if (currentTrackIndex +1 === stations.length){
          setCurrentTrackIndex(0);
      }
      else{
          //Set the track index to the next track
          setCurrentTrackIndex((value) => value + 1);
      }
      
      //Change the station URL
      stationURL.current = generateLink(stations[currentTrackIndex].id);
      //Make the playing match the state of the audio
      setPlaying(false)
  }

  function generateLink(id: String){
    return "http://listen.181fm.com/181-" + id + "_128k.mp3";
  }


  return (
    <div className="App">
      <AudioPlayer stationURL={stationURL.current} playing = {playing}/>
      <div className='audio-controls'>
            <FaStepBackward onClick={prevTrack} tabIndex={1}/>
            {playing ? <FaPauseCircle tabIndex={2} onClick={playPause}/> : <FaPlayCircle tabIndex={2} onClick= {playPause}/>}
            <FaStepForward tabIndex={3} onClick={nextTrack}/> 
        </div>
    </div>
  );
}

export default App;
