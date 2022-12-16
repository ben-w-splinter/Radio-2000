import { useEffect, useRef } from "react"


interface props{
    stationURL : string
    playing: boolean
}

export const AudioPlayer = ({stationURL, playing} : props) => {
    const audio = useRef<HTMLAudioElement>(null);
    
    useEffect(() => {
        const currentAudio = audio.current
        if (playing)
        {  
          currentAudio?.play();
        }
        else
        {
            currentAudio?.pause();
        }
    }, [audio, playing])
    

    return (
        <audio controls src={stationURL} ref = {audio}/>
    )
}
