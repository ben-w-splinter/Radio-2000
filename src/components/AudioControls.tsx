import { useState, useRef } from "react";
import { AudioPlayer } from "./AudioPlayer";
import { FaStepBackward, FaPlayCircle, FaStepForward, FaPauseCircle } from 'react-icons/fa'
import { StyledAudioControls } from "../styles/StyledAudioControls";


interface props{
    stations: {
        title: string
        id: string
    }[]
    currentTrackIndex: number,
    setCurrentTrackIndex: React.Dispatch<React.SetStateAction<number>>
}

export const AudioControls = ({stations, currentTrackIndex, setCurrentTrackIndex} : props) => {

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
    <StyledAudioControls>
        <AudioPlayer stationURL={stationURL.current} playing = {playing}/>
        <FaStepBackward onClick={prevTrack} tabIndex={1}/>
            {playing ? <FaPauseCircle tabIndex={2} onClick={playPause}/> : <FaPlayCircle tabIndex={2} onClick= {playPause}/>}
        <FaStepForward tabIndex={3} onClick={nextTrack}/> 
    </StyledAudioControls>
  )
}
