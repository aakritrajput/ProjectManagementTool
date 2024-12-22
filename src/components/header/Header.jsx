import {useState, useEffect} from 'react'
import authService from '../../appwrite/auth'

import { Link } from "react-router-dom";

function Header() {
  const [user, setUser] = useState(null); 
  useEffect(() => { 
    async function fetchUser() { 
      const currentUser = await authService.getCurrentUser(); 
      //console.log(currentUser);
      //const userProfile = await service.getuserProfile(currentUser.$id);
      if (currentUser) { 
        setUser(currentUser); 
      } else { 
        console.log("No user is currently logged in."); 
        setUser(null)
      }  
    }
    fetchUser();} , [])

    const logoutHandeler = () => {
      setUser(null)
      authService.logout();
    }

  return (
    <div className="w-[100%] flex flex-row-reverse mt-3 px-5 p-3">
      {
        user == null ? (
            <div className="flex flex-row-reverse w-auto gap-3 items-center">
            <Link to="/login"  className="flex items-center   hover:text-white">
              <button className="min-w-[140px] rounded-md px-2 py-1 bg-purple-800 hover:bg-purple-600 hover:scale-105 duration-100 border-[2px] border-black text-black">Login</button>
            </Link>
            <Link to="/register"  className="flex items-center p-2  hover:text-white">
              <button className="min-w-[140px] rounded-md px-2 py-1 bg-purple-800 hover:bg-purple-600 hover:scale-105 duration-100 border-[2px] border-black text-black">Register</button>
            </Link>
          </div>
        ) : (
          <Link
          to='/'
          className="min-w-[100px] rounded-lg bg-purple-800 text-white p-2 text-center"
          onClick={logoutHandeler}
          >Log Out
          </Link>
        )
      }
    </div>
  )
}

export default Header
