import React from 'react'
import { useParams } from 'react-router-dom'

const CodeEditor = () => {
    const {ChallengeID} = useParams();
  return (
    <div>{ChallengeID}</div>
  )
}

export default CodeEditor