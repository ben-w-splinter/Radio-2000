interface props{
    stationURL : string
}

export const AudioPlayer = ({stationURL} : props) => {   
    return (
        <audio controls src={stationURL}/>
    )
}
