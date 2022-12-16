import {useState } from "react";
import { StyledSongInfo } from "../styles/StyledSongInfo";
import noalbum  from '../noalbum-black.png'

interface props{
    stations: {
        title: string
        id: string
    }[]
    currentTrackIndex: number
}

export const SongInfo = ({stations, currentTrackIndex} : props) => {
  //Add a reference to the current song
  const [song, setSong] = useState("");
  //Add a reference to the album artwork image URL
  const [imageURL, setImageURL] = useState("");

  function fetchData(){
    //Fetch the track info
    fetch("http://player.181fm.com/streamdata.php?h=listen.181fm.com&p=7080&i=181-" + stations[currentTrackIndex].id +"_128k.mp3")
    .then(response => response.json())
    .then(data => {
          setSong(data.song);
    })
    .then(() => {
          //Fetch the album info
          fetch("http://player.181fm.com/album.php?key=" + song, {referrer: "",})
          .then(response => response.json())
          .then(data => {
              setImageURL(data.Image);
          })
          .catch(error => console.error(error))

    })
    .catch(error => console.error(error));
  }

  fetchData();
  return (
    <StyledSongInfo>
        <img alt='Album Cover' src={imageURL ? imageURL : noalbum}></img>
        <p>Now Playing : <br/>{song}</p>
    </StyledSongInfo>
  )
}
