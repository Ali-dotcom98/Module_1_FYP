import React, { useContext } from 'react'
import { Usecontext } from '../ContextApi/UserContext'
const Dashboard = () => {
    const {status} = useContext(Usecontext);
  return (
    <div>Dashboard {status}</div>
  )
}

export default Dashboard