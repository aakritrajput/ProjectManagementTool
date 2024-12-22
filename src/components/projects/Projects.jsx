import {useState, useEffect} from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import service from '../../appwrite/config'
import Input from '../Input'
import { customAlphabet } from 'nanoid'
import authService from '../../appwrite/auth'


function Projects() {
    const { register, handleSubmit } = useForm()
    const [users, setUsers] = useState([]);
    const [currentUser, setCurrentUser] = useState({});
    const navigate = useNavigate();

    const submitHandeler = async(data) => {
      const alphabet = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'; 
      const nanoid = customAlphabet(alphabet, 36);
      const projectid = nanoid();
      const createdby = currentUser.name;
      console.log('current user name :',currentUser.name)
      console.log(projectid)
      const projectData = {...data, projectId:projectid, createdBy:createdby}
      console.log(projectData);
      await service.createProject(projectData);
      console.log('Project created');
      navigate("/home")
    }
    
    const getUser = async() => {
      const userData =  await service.getAllUsersDocuments();
      setUsers(userData)
    }

    const getCurrentUser = async() => { 
      const user = await authService.getCurrentUser();
      setCurrentUser(user); 
    }
  

    useEffect(() => {
      getUser(),
      getCurrentUser()
    }, [])

  return (
   <div className='h-[88vh] mt-2 border-t-2 border-yellow-300 overflow-auto w-full flex justify-center '>
    <div className=' bg-[#36223991] border-[#6B21A8] border-[3px] px-4 py-3 w-[70%] h-[100vh] rounded-2xl '>
      <h1 className='w-full text-center mt-2 text-4xl font-serif font-bold text-[#FFD700] mb-5'>Create Project</h1>
      <form onSubmit={handleSubmit(submitHandeler)} className='w-auto'>
        <Input
        label='Project Name'
        type='text'
        placeholder='Enter Project Name'
        id='name'
        {...register('name',{
            required: true, 
        })}
        /> 
        <div className='w-full bg-gray-500 rounded-lg p-2 py-3 mb-4 shadow-md shadow-gray-900'>
          <label htmlFor="description" className='inline-block mb-1 pl-1 text-[#FFD700] font-bold '>Description</label>
          <textarea
          label='Description'
          type='text'
          id='description'
          className='px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-50 focus:outline-[#FFD700] duration-200 border border-gray-200 w-full'
          placeholder='Enter Description'
          {...register('description',{
              required: true,
          })}
           />
        </div>
        <div className='w-full bg-gray-500 rounded-lg p-2 py-3 mb-4 flex gap-7 shadow-md shadow-gray-900'> 
          <label className='text-[#FFD700] font-bold'>Status:</label> 
          <div > 
            <label htmlFor="completed" className='flex items-center'> 
            <input type="radio" id="completed" {...register('status')} value="Completed" className='mx-2'/> 
              Completed 
            </label> 
          </div> 
          <div> 
            <label htmlFor="uncompleted" className='flex items-center'> 
              <input type="radio" id="uncompleted" {...register('status')} value="Uncompleted" className='mx-2' /> 
              Uncompleted 
            </label> 
          </div> 
        </div>
        <Input
        label='Start Date'
        type='date'
        id='startDate'
        {...register('startDate',{
            required: true,
        })}
        />
        <Input
        label='Completion Date'
        type='date'
        id='CompletionDate'
        {...register('endDate',{
            required: true,
        })}
        />
   

        <div className='w-full bg-gray-500 rounded-lg p-2 py-3 mb-4 flex gap-7 shadow-md shadow-gray-900'>
          <label htmlFor="teamMembers" className='text-[#FFD700] font-bold'>Team Members:</label>
           <div className='w-auto  gap-2' id='teamMembers'>
            {users.map((user) => (
              <label key={user.$id} className='ml-3   items-center'>
                <input  {...register('teamMembers')} type='checkbox' className='w-10 mr-1  text-yellow-500' value={user.name}/>
                {user.name}
              </label>
            ))} 
           </div>
        </div>
        <div className='w-full flex justify-center'>
          <button type='submit' className='p-2 bg-[#FFD700] rounded-full font-medium text-purple-900'>Create Project </button>
        </div>
      </form>
    </div>
   </div>
    
  )
}

export default Projects
