import React from 'react'
import { FaStepBackward, FaPauseCircle, FaPlayCircle, FaStepForward } from 'react-icons/fa'

export const AudioControls = () => {
  return (
    <div>
        <FaStepBackward tabIndex={1}/>
        <FaPlayCircle tabIndex={2}/>
        <FaStepForward tabIndex={3}/> 
    </div>
  )
}
