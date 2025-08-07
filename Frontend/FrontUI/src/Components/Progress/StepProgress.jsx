import React from 'react'

const StepProgress = ({progress}) => {
  return (
    <div             
    className="h-1 bg-gradient-to-r from-purple-500 to-purple-700 transition-all duration-300"
    style={{width : `${progress}%`}}></div>
  )
}

export default StepProgress