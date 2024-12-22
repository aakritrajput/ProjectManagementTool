//import React from 'react'
import service from "../../appwrite/config"
import authService from "../../appwrite/auth"
import { useEffect, useState } from "react"
import { NavLink } from "react-router-dom"
//import { set } from "react-hook-form";
//import { set } from "react-hook-form";

function SidePanel() {
  const [user, setUser] = useState({}); 
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [fileUrl, setFileUrl] = useState('');
  //const [prevFileId, setPrevFileId] = useState('');


  useEffect(() => { 
    async function fetchUser() { 
      const currentUser = await authService.getCurrentUser(); 
      //console.log('current user:',currentUser);
      const userProfile = await service.getuserProfile(currentUser.$id);
      if (userProfile) { 
        //console.log('user:',userProfile);
        setUser(userProfile);
        console.log(userProfile.profilePicture);
        setFileUrl(userProfile.profilePicture);
      } else { 
        //console.log("No userprofile found "); 
      }  
    }
      fetchUser();} , [fileUrl, setFileUrl,user.profilePicture]);

  //console.log('user:', user.name);
      //console.log(user.name , user.profilePicture)

    const handleFileChange = (event) => {
      const file = event.target.files[0];
      setSelectedFile(file);
      console.log('file:',file);
      const reader = new FileReader();
      reader.onloadend = () => { 
        setPreview(reader.result);
      }
      reader.readAsDataURL(file);
    }
    const handleUpload = async () => {
      if (selectedFile) {
          try {
              const id = user.$id + 'profilePicture';
  
              // Delete the previous file
              await service.deleteFile(id);
              console.log('Previous file deleted');
  
              // Upload the new file
              const response = await service.uploadFile({ file: selectedFile, userId: user.$id });
              const newFileUrl = response; // Ensure the URL is correctly obtained
              console.log('File uploaded:', newFileUrl);
  
              // Update the user profile
              await service.updateProfile(user.$id, {
                  name: user.name,
                  profilePicture: newFileUrl,
                  updatedAt: JSON.stringify(Date.now())
              });
              console.log('Profile updated');
  
              // Update state with new URL
              setFileUrl(newFileUrl);
              console.log('New profile picture URL:', newFileUrl);
  
              // Clear preview
              setPreview(null);

              window.location.reload();
          } catch (error) {
              console.error('Error during file upload and profile update:', error);
          }
      }
  };

  console.log(fileUrl)

  return (
    <div className="md:w-[23%] sm:[320px] w-[280px] h-[100vh] bg-gradient-to-b from-black to-[#320735] flex flex-col justify-between sm:p-2 p-1 py-4 border-r-[#FFD700] shadow-xl  shadow-[#FFD700] z-40 border-r-2">
      <div className="w-full flex flex-col mt-2 gap-5 relative justify-start items-center">
          <div className="bg-gray-700 w-[120px] h-[120px] mt-3 rounded-full overflow-hidden relative border-[3px] border-[#923792]">
            <img src={`${fileUrl}?${Date.now()}`} className="absolute h-full w-full object-cover  text-white" alt=" Profile Picture" /> 
            <input type="file" id="uploadImage" accept="image/*" onChange={handleFileChange} className="hidden" />
            <button className="w-full z-30 h-[34px] bg-black bg-opacity-55 absolute bottom-0 flex justify-center" onClick={() => document.getElementById('uploadImage').click()}>
            <svg width="35" height="35" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M20 5h-3.2l-1.8-2H9l-1.8 2H4C2.9 5 2 5.9 2 7v12c0 1.1 0.9 2 2 2h16c1.1 0 2-0.9 2-2V7c0-1.1-0.9-2-2-2zM12 17c-2.8 0-5-2.2-5-5s2.2-5 5-5 5 2.2 5 5-2.2 5-5 5zm7-9h-3V6h3v2z" fill="yellow"/>
            </svg>
            </button>
          </div>
          <h2 className="text-[#FFD700] text-2xl font-serif">{user.name}</h2> 
          {preview && 
          <div className=" mt-[50px] h-[400px] w-full bg-black bg-opacity-55 rounded-2xl z-50 absolute p-2 ">
              <div className="h-[80%]">
                <img src={preview} alt="Preview" className="w-full h-full  object-contain" />
              </div>
              
              <div className="w-full flex justify-center mt-3">
                <button className="p-2 border-2 border-[#FFD700] bg-purple-700 text-white rounded-full " onClick={handleUpload}>Upload</button>
              </div>
              
              </div>
          } 
      </div>
      <div className="w-full h-[50%] flex flex-col gap-3 justify-center items-center">
        <NavLink to="/home"  className="flex items-center p-2  hover:text-white">
          <button className="min-w-[140px] rounded-2xl px-2 py-1 bg-[black] border-[2px] border-[#FFD700] hover:scale-110 duration-100 text-white">DASHBOARD</button>
        </NavLink>
        <NavLink to="/home/createProject"  className="flex items-center p-2 hover:text-white">
          <button className="min-w-[140px] rounded-2xl px-2 py-1 bg-[black] border-[2px] border-[#FFD700] hover:scale-110 duration-100 text-white">Create Project</button>
        </NavLink>
      </div>
    </div>
  )
}

export default SidePanel
