//import React from 'react'
import { Outlet } from "react-router-dom"
import Header from "../header/Header"
//import Projects from "../projects/Projects"

function Root() {
  return (
    <>
    <div className="w-[100%] h-[100vh] bg-transparent px-2 items-center">
      <Header/>
      <Outlet/>
    </div>
    </>
  )
}

export default Root
