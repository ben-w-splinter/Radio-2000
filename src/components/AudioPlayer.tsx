import { useRef } from "react";

export const AudioPlayer = () => {
    //Create a new audio element
    const audio = useRef<HTMLAudioElement>(null);
    const currentAudio = audio.current;
    //Ensure the element is not undefined or null before we
    //call play on it
    currentAudio?.play();
        
    return (
        <audio controls src="http://listen.181fm.com/181-vibe_128k.mp3" ref = {audio}/>
    )
}
