import React from 'react'
import { Outlet } from 'react-router-dom'
import NavBar from './Instructor/NavBar'

const DefaultLayout = () => {
   return (
    <div className='flex min-h-screen'>
        <div className='w-[20%] border'></div>
        <div className='w-[80%]'>
          <NavBar/>
          <div className='m-4'><Outlet/></div>
        </div>
    </div>
    
  )
}

export default DefaultLayout