//import React from 'react'
import noProjects from '../../../public/noProjects.jpg'
import { Link } from 'react-router-dom'

function Home() {
  return (
    <div className='w-full h-[70%] flex flex-col justify-center bg-transparent items-center'>
      <img src={noProjects} alt="No Projects" className='w-[240px] hover:scale-110 shadow-md shadow-purple-500 duration-150 mb-6 rounded-[70px] border-2 border-purple-700'/>
      <h1 className='mb-3 text-gray-500'>No Projects</h1>
      <p className='text-gray-500'><Link className=" text-purple-600 hover:underline" to="/login" >Login</Link> to Create or Manage Projects</p>
    </div>
  )
}

export default Home
