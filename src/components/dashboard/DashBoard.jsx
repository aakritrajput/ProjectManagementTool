import {useEffect, useState} from 'react'
import service from '../../appwrite/config';
import {Link} from 'react-router-dom'

function DashBoard() {
    const [projects, setProjects] = useState([]);
    const [users, setUsers] = useState([]);
    
    const getproject = async(status='false') => {
        if(status !== 'false'){
            const projects = await service.getProject(status);
            setProjects(projects);
        }else{
            const projects = await service.getAllProjectDocuments();
            //console.log(projects);
            setProjects(projects);
        }
    }

    const getusers = async() => {
        
        const users = await service.getAllUsersDocuments();
        setUsers(users);
        //console.log(users);
    } 

    useEffect(() => {
        getusers();
    },[]);

    useEffect(() => {
        getproject();     // Or pass a specific status if needed 
     },[] );

  return (
    <div className='w-[95%] mx-auto bg-transparent'>
        <div className='flex justify-center gap-3 border-2 border-[#FFD700] drop-shadow-md  py-2 rounded-full relative items-center my-4'>
            <h1 className='text-2xl font-sans bg-transparent border-2 border-[white] px-4 py-1 rounded-full absolute left-3 text-[#FFD700]'>Projects</h1>
            <div className='flex gap-8'>
                <button onClick={() => getproject()} className='bg-blue-500 focus:bg-black text-white px-6 py-2 rounded-xl'>All</button>
                <button onClick={() => getproject('completed')} className='bg-green-500 text-white px-3 py-2 rounded-xl'>Completed</button>
                <button onClick={() => getproject('uncompleted')} className='bg-red-500 text-white px-3 py-2 rounded-xl'>Uncompleted</button>
            </div>
        </div>
        <div className=' h-[74vh] overflow-auto'> 
            {projects.length === 0 ? (
            <div className='w-full h-full flex justify-center items-center'> 
              <p className='text-gray-500 text-xl'>No projects available</p> 
            </div>
            ):(
            <div className='grid py-3 overflow-auto grid-cols-3 gap-2'>
            {projects.map(project => {
                const teamMembers = JSON.parse(project.teamMembers);
                //console.log(teamMembers);
                return (
                <div key={project.$id} className='bg-[#e2bcea83] min w-auto shadow-md backdrop-blur-md mt-2 mr-3 shadow-[#800080d5] p-3 rounded-lg'>
                    <Link to={`/projects/${project.name}`}>
                    <>
                      <h1 className='text-xl w-full text-center font-bold font-sans'>{project.name}</h1>
                      <p className='text-base text-[#E0FFFF] mb-5 mt-2'><span className='text-lg font-medium text-[#4b1c1c] '>Desciption: </span>  {project.description}</p>
                      <div className='flex gap-2 flex-wrap'> 
                        <h3 className='text-[#4b1c1c] '>Team Members :</h3>
                          {teamMembers.map(member => {
                              return(
                                <div key={member} className=' text-[#E0FFFF]  py-1 rounded-full'>
                                    {users.map(user => (
                                        user.name === member && <img key={user.$id} className="h-[30px] rounded-full" title={user.name} src={`${user.profilePicture}?${Date.now()}`} alt={user.name} />
                                    ))}
                                </div>
                              ) }
                              )
                          }   
                      </div>
                    </>
                    
                    </Link>
                </div>)
})}
        </div>)}
        </div>
    </div>
  )
}

export default DashBoard
