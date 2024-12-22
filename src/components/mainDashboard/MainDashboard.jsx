import { Outlet } from "react-router-dom"
import Header from "../header/Header"
import SidePanel from "../sidePanel/SidePanel"

function MainDashboard() {
  return (
    <div className="w-[100vw] flex bg-black h-[100vh]  mb-2 ">
       <SidePanel/>
       <div className="bg-gradient-to-r from-[#1d0d20cb] to-[#0f050f] w-[77%] pr-4"> 
        <Header/>  
        <Outlet/>   
      </div>
    </div>
  )
}

export default MainDashboard
