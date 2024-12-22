//import React from 'react'
import { useParams } from 'react-router-dom';
import service from '../../appwrite/config';
import { useNavigate } from 'react-router-dom';
import {  useState, useEffect } from 'react';
import Comment from './Comment';


function ViewProjects() {
    const {name} = useParams();
    const navigate = useNavigate();
    const [projects, setProjects] = useState([]);
    const [users, setUsers] = useState([]);

    const getProjects = async() => {
        const projects = await service.getAllProjectDocuments();
        setProjects(projects);
    }

    const getusers = async() => {
      const users = await service.getAllUsersDocuments();
      setUsers(users);
      //console.log(users);
  }
  
     
    useEffect(() => {
        getProjects();
        getusers();
     }, []);

    const deleteHandeler = async(id) => {
        await service.deleteProject(id);
        navigate('/home');
    }

    // const editHandeler = () => {
    //   navigate('/editProject')
    // }

  return (
    <div className=' bg-gradient-to-r from-[#3d1c4b] to-[#1c171d83] min-h-[100vh] w-[100vw]'>
      {
        projects.map(project => {
          const teamMembers = JSON.parse(project.teamMembers);
          return(
          <div key={project.$id}>
            {project.name === name && (
              <div className='grid grid-cols-2 w-full p-3'>
            
                <div className='bg-[#303030] bg-opacity-30 shadow-gray-500 w-full min-h-[90vh] p-2 px-4 shadow-lg  rounded-lg'>
                    <div className='flex justify-between w-full '>
                        <h1 className='text-3xl font-sans font-bold mb-3 text-white'>{project.name}</h1> 
                        <div className=' flex gap-2'>
                          <button className='p-2 bg-green-500 text-white rounded-md'  >
                            Edit
                          </button>
                          <button className='p-2 bg-red-500 text-white rounded-md' onClick={()=>{deleteHandeler(project.$id)}}>
                            Delete
                          </button>
                        </div> 
                    </div>
                        <div className='flex flex-col justify-between min-h-[90%]'>
                        <div>
                            <div className='flex gap-2 w-full items-center'>
                              <h3 className='font-bold text-lg text-[yellow]'><u>Description:</u></h3>
                              <p className='text-base text-[#eeddee] w-full mb-1 text-centre mt-2'>{project.description}</p>
                            </div>
                            <div className='flex gap-2 w-full items-center'>
                              <h3 className='font-bold text-lg text-[yellow]'><u>StartDate:</u></h3>
                              <p className='text-base text-[#eeddee] w-full mb-1 text-centre mt-2'>{project.startDate}</p>
                            </div>
                            <div className='flex gap-2 w-full items-center'>
                              <h3 className='font-bold text-lg text-[yellow]'><u>DeadLine:</u></h3>
                              <p className='text-base text-[#eeddee] w-full mb-1 text-centre mt-2'>{project.endDate}</p>
                            </div>
                            <div className='flex gap-2 w-full items-center'>
                              <h3 className='font-bold text-lg text-[yellow]'><u>CreatedBy:</u></h3>
                              <p className='text-base text-[#eeddee] w-full mb-1 text-centre mt-2'>{project.createdBy}</p>
                            </div>
                            <div className='flex gap-2 w-full items-center'>
                                <h3 className='font-bold text-lg text-[yellow]'><u>Status:</u></h3>
                                <p className='text-base text-[#eeddee] w-full mb-1 text-centre mt-2'>{project.status}</p>
                            </div>
                        </div>
                        
                        <div> 
                           <h3 className='text-[yellow] mt-3 text-xl '>Team Members :</h3>
                           <div className='flex gap-2 flex-wrap h-[330px] overflow-y-auto w-full'>
                             {teamMembers.map(member => {
                                 return(
                                   <div key={member} className=' text-[#E0FFFF]  py-1 rounded-full'>
                                       {users.map(user => (
                                           user.name === member && <img key={user.$id} className="h-[150px] rounded-full" title={user.name} src={`${user.profilePicture}?${Date.now()}`} alt={user.name} />
                                       ))}
                                   </div>
                                 ) }
                                 )
                             }   
                           </div>
                            
                        </div> 
                        </div>
                        
                       
                </div>
                <div className='w-full  ' >
                 <Comment/>
                </div>
              </div>
            )}
          </div>
          )
})
      }  
    </div> 
  )
}

export default ViewProjects
