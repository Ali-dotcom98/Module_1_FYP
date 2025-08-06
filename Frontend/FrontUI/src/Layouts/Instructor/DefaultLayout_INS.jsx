import React from 'react'
import { Outlet } from 'react-router-dom'
import NavBar from './NavBar'

const DefaultLayout_INS = () => {
  return (
    <div className='flex min-h-screen'>
        <div className='w-[20%] border'></div>
        <div className='w-full'>
          <NavBar/>
          <div className='m-4'><Outlet/></div>
        </div>
    </div>
    
  )
}

export default DefaultLayout_INS