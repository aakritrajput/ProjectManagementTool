import { useState, useEffect } from 'react';
import service from '../../appwrite/config';
import authService from '../../appwrite/auth';
import { useParams } from 'react-router-dom';
import { customAlphabet } from 'nanoid'

function Comment() {
  const [comments, setComments] = useState([]);
  const { name } = useParams();
  const [currentProject, setCurrentProject] = useState({});
  const [user, setUser] = useState({});
  const [commentText, setCommentText] = useState('');
  

  const getUser = async () => {
    const currentUser = await authService.getCurrentUser();
    const userProfile = await service.getuserProfile(currentUser.$id);
    setUser(userProfile);
    //console.log(userProfile);
  };

  const getProjects = async () => {
    const projects = await service.getAllProjectDocuments();
    projects.forEach(project => {
      if (project.name === name) {
        //console.log(project.name);
        //console.log('project name : ', name);
        //console.log(project);
        setCurrentProject(project);
      }
    });
  };

  const getComments = async () => {
    if (currentProject.projectId) {
      const projectComments = await service.getComments(currentProject.projectId);
      //console.log(projectComments);
      setComments(projectComments);
    }
  };

  useEffect(() => {
    getUser();
    getProjects();
  }, [name]);

  useEffect(() => { 
    const getComments = async () => { 
      if (currentProject.projectId) { 
        try { 
          //console.log(currentProject.projectId)
          const projectComments = await service.getComments(currentProject.projectId); 
          //console.log(projectComments); 
          setComments(projectComments); 
          //console.log(comments);
        } catch (error) { 
          console.error("Failed to fetch comments:", error); 
        } } }; getComments(); 
      }, [currentProject]);

  const commentsHandler = async (e) => {
    e.preventDefault();
    const alphabet = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'; 
    const nanoid = customAlphabet(alphabet, 36);
    const commentid = nanoid();
    await service.addComment({
      commentId: commentid,
      projectId: currentProject.projectId,
      authorId: user.$id,
      content: commentText,
      authorImage: user.profilePicture,
      authorName: user.name,
      createdAt: new Date().toISOString(),
    });
    document.getElementById('commentInput').value = '';
    console.log('comment added');
    getComments();
  };

  return (
    <div className="w-full h-[90vh] px-3 flex flex-col justify-between bg-[#b59abc] bg-opacity-30 shadow-gray-500 rounded-lg shadow-lg">
      <div className="px-2 my-2 flex  flex-col bg-white  h-[90%] "> 
        <div className="w-full h-full flex  flex-col  overflow-auto "> 
          {comments.map((comment) => ( 
            <div key={comment.commentId} className="w-full px-2 py-1 flex"> 
              <img src={`${comment.authorImage}?${Date.now()}`} className="h-[24px] rounded-full mr-2" alt={comment.authorName} />
              <h2 className="text-[#191818] mr-3">{`${comment.authorName}:`}</h2> 
              <div className="flex flex-wrap w-[70%]"> 
                <p className="text-[black]">{comment.content}</p> 
              </div> 
            </div> 
          ))} 
        </div> 
      </div>
      <div className="h-[10%]">
        <form onSubmit={commentsHandler} className="flex px-3 items-center mb-2">
          <input
            type="text"
            id='commentInput'
            placeholder="Enter your comment..."
            onChange={(e) => setCommentText(e.target.value)}
            className="p-2 focus:outline-none bg-[white] w-[80%] text-[black] rounded-l-xl"
          />
          <button className="p-2 text-white bg-purple-950 rounded-r-xl" type="submit">
            Add Comment
          </button>
        </form>
      </div>
    </div>
  );
}

export default Comment; 
