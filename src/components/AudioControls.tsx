import { useState, useRef } from "react";
import { AudioPlayer } from "./AudioPlayer";
import { FaStepBackward, FaPlayCircle, FaStepForward, FaPauseCircle } from 'react-icons/fa'
import { MdShuffleOn, MdShuffle  } from "react-icons/md";
import { StyledAudioControls } from "../styles/StyledAudioControls";


interface props{
    stations: {
        title: string
        id: string
    }[]
    currentStationIndex: number,
    setCurrentStationIndex: React.Dispatch<React.SetStateAction<number>>
}

export const AudioControls = ({stations, currentStationIndex, setCurrentStationIndex: setCurrentTrackIndex} : props) => {

  //Keeps track if audio is playing
  const [playing, setPlaying] = useState<boolean>(false);

  //Keep track of shuffle
  const [shuffle, setShuffle] = useState<boolean>(false);

  //Station URL
  const stationURL = useRef("");
  //Generate a link from the stations
  stationURL.current = generateLink(stations[currentStationIndex].id);

  //Gets a random station that isn't the current station
  function getRandomStation(){
    //Set the default index
    let newIndex = Math.floor(Math.random() * stations.length);
    //Loop until new station found
    while (newIndex === currentStationIndex){
        newIndex = Math.floor(Math.random() * stations.length);
    }
    return newIndex;
}

  //Function to skip to the previous track
  function prevTrack(){
    //Check if we need to shuffle
    if (shuffle){
        setCurrentTrackIndex(getRandomStation());
    }
    else{
        //If at the beginning, wrap around
        if (currentStationIndex -1 < 0){
            setCurrentTrackIndex(stations.length - 1);
        }
        else{
            //Set the track index to the previous track
            setCurrentTrackIndex((value) => value - 1);
        }
    }

    //Change the station URL
    stationURL.current = generateLink(stations[currentStationIndex].id);
    //Make the playing match the state of the audio
    setPlaying(false)
  }

  //Toggle playing
  function playPause(){
      setPlaying(!playing);
  }
  function nextTrack(){
      //Check if we need to shuffle
      if (shuffle){
        setCurrentTrackIndex(getRandomStation());
      }
      else{
        //If at the end, wrap around
        if (currentStationIndex +1 === stations.length){
            setCurrentTrackIndex(0);
        }
        else{
            //Set the track index to the next track
            setCurrentTrackIndex((value) => value + 1);
        } 
      }

      //Change the station URL
      stationURL.current = generateLink(stations[currentStationIndex].id);
      //Make the playing match the state of the audio
      setPlaying(false)
  }

  function generateLink(id: String){
    return "http://listen.181fm.com/181-" + id + "_128k.mp3";
  }
  return (
    <StyledAudioControls>
        <AudioPlayer stationURL={stationURL.current} playing = {playing}/>
        <div className="main-panel">
        <FaStepBackward onClick={prevTrack} tabIndex={1}/>
            {playing ? <FaPauseCircle tabIndex={2} onClick={playPause}/> : <FaPlayCircle tabIndex={2} onClick= {playPause}/>}
        <FaStepForward tabIndex={3} onClick={nextTrack}/>
        </div> 
        {shuffle ? <MdShuffleOn tabIndex={4} onClick={() => setShuffle(false)}/> : <MdShuffle tabIndex={4} onClick={() => setShuffle(true)}/>}
    </StyledAudioControls>
  )
}
