import envVars from "../envVars/envVars";
import { Client, Databases, Storage, Query ,ID } from "appwrite";

export class Service {
    client;
    databases;
    bucket;

    constructor(){
        this.client = new Client()
            .setEndpoint(envVars.appwriteUrl)
            .setProject(envVars.appwriteProjectId);
        this.databases = new Databases(this.client);
        this.bucket = new Storage(this.client);
    }

    async UserProfile({$id, name, email, profilePicture='', createdAt='', updatedAt=''}){ //profile picture removed
        try {
            return await this.databases.createDocument(
                envVars.appwriteDatabaseId,
                envVars.appwriteUsersCollectionId, 
                $id,
                {
                    userId: $id,
                    name,
                    email,
                    createdAt,
                    updatedAt,
                    profilePicture
                }
            )
        }
         catch (error) {
            console.log("error displaying :", name," profile" , error)
        }
    }

    async getuserProfile(userId){
        try {
            const gotUser = await this.databases.getDocument(
                envVars.appwriteDatabaseId,
                envVars.appwriteUsersCollectionId,
                userId
            )
            return gotUser;
        } catch (error) {
            console.log("error getting user profile", error)
        }
    }

    async checkUserExist(email){
        try {
            const response = await this.databases.listDocuments(
                envVars.appwriteDatabaseId,
                envVars.appwriteUsersCollectionId,
                [Query.equal('email', email)]
            )
            if(response.documents.length > 0){
                return true;
            }else{
                return false;}
        } catch (error) {
            console.log("error checking user exist", error)
        }
    }
    
    async updateProfile(userId,{name,profilePicture,updatedAt}){
        try {
            return await this.databases.updateDocument(
                envVars.appwriteDatabaseId,
                envVars.appwriteUsersCollectionId,
                userId,
                {
                    name,
                    profilePicture,
                    updatedAt
                }
            )
        } catch (error) {
            console.log("error for updateProfile:", error)
        }
    }

    async createProject({projectId, name, description, status, startDate, createdBy, endDate='', teamMembers=[], createdAt='', updatedAt=''}){
        try {
            return await this.databases.createDocument(
                envVars.appwriteDatabaseId,
                envVars.appwriteProjectsCollectionId,
                projectId,
                {
                    projectId,
                    name,
                    description,
                    status, 
                    startDate, 
                    createdBy,
                    endDate, 
                    teamMembers: JSON.stringify(teamMembers),
                    createdAt, 
                    updatedAt
                }
            )
        } catch (error) {
            console.log("error creating new project", error);
        }
    }

    async getProject(status){
        try {
            const response =  await this.databases.listDocuments(
                envVars.appwriteDatabaseId,
                envVars.appwriteProjectsCollectionId,
                [Query.equal('status', status)]
            )
            return response.documents || [];
        } catch (error) {
            console.log("error getting project", error);
            return [];
        }
    }

    async getAllProjectDocuments() { 
        try { 
            // const limit = 100; 
            // console.log("Database ID:", envVars.appwriteDatabaseId); 
            // console.log("Collection ID:", envVars.appwriteProjectsCollectionId); 
            // console.log("Limit:", limit); 
            const response = await this.databases.listDocuments( 
                envVars.appwriteDatabaseId, 
                envVars.appwriteProjectsCollectionId
            ); 
            if (response.documents.length === 0) { 
                console.log("No documents found in the collection."); 
            } 
            
            return response.documents || []; 
        } catch (error) { 
            console.error('Error getting all project documents:', error); 
            return []; 
        }
    }
    
    async deleteProject(projectId){
        try {
            await this.databases.deleteDocument(
                envVars.appwriteDatabaseId,
                envVars.appwriteProjectsCollectionId,
                projectId
            )
            return true;
        } catch (error) {
            console.log("error deleting project", error)
            return false;
        }
    }

    async updateProject(projectId, {name, description, status, updatedAt}){
        try {
            return await this.databases.updateDocument(
                envVars.appwriteDatabaseId,
                envVars.appwriteProjectsCollectionId,
                projectId,
                {
                    name, 
                    description, 
                    status, 
                    updatedAt
                }
            )
        } catch (error) {
            console.log("error updating the project", error)
        }
    }

    async createTask({taskId, projectId, title, description, priority, status, assignedTo, dueDate,  attachments, createdAt, updatedAt}){
        try {
            return await this.databases.createDocument(
                envVars.appwriteDatabaseId,
                envVars.appwriteTasksCollectionId,
                taskId,
                {
                    taskId, 
                    projectId, 
                    title, 
                    description, 
                    priority, 
                    status, 
                    assignedTo, 
                    dueDate, 
                    attachments, 
                    createdAt, 
                    updatedAt
                }
            )
        } catch (error) {
            console.log("error creating new task", error)
        }
    }

    async updateTask(taskId, {title, description, priority, status, assignedTo, dueDate,  attachments,  updatedAt}){
        try {
            return await this.databases.updateDocument(
                envVars.appwriteDatabaseId,
                envVars.appwriteTasksCollectionId,
                taskId,
                {
                    title, 
                    description, 
                    priority, 
                    status, 
                    assignedTo, 
                    dueDate,  
                    attachments,  
                    updatedAt
                }
            )
        } catch (error) {
            console.log("error updating task", error)
        }
    }

    async deleteTask({taskId}){
        try {
            await this.databases.deleteDocument(
                envVars.appwriteDatabaseId,
                envVars.appwriteTasksCollectionId,
                taskId
            )
            return true;
        } catch (error) {
            console.log("error deleting task", error)
            return false;
        }
    }

    async addComment({commentId, projectId, authorId, content, authorName, authorImage, createdAt}){
        try {
            return await this.databases.createDocument(
                envVars.appwriteDatabaseId,
                envVars.appwriteCommentsCollectionId,
                commentId,
                {
                    commentId, 
                    projectId, 
                    authorId, 
                    authorName, 
                    authorImage,
                    content, 
                    createdAt
                }
            )
        } catch (error) {
            console.log("error adding comment", error)
        }
    }

    async getComments(projectId){
        try {
            const response =  await this.databases.listDocuments(
                envVars.appwriteDatabaseId,
                envVars.appwriteCommentsCollectionId,
                [Query.equal('projectId', projectId)]
            )
            return response.documents ;
        } catch (error) {
            console.log("error getting comments", error)
            return []
        }
    }

    async getCompletedProjects(queries = [Query.equal('status','completed')]){
        try {
            return await this.databases.listDocuments(
                envVars.appwriteDatabaseId,
                envVars.appwriteProjectsCollectionId,
                queries
            )
        } catch (error) {
            console.log("error getting completed projects ", error)
        }
    }

    async getUnCompletedProjects(queries = [Query.equal('status','uncompleted')]){
        try {
            return await this.databases.listDocuments(
                envVars.appwriteDatabaseId,
                envVars.appwriteProjectsCollectionId,
                queries
            )
        } catch (error) {
            console.log("error getting uncompleted projects ", error)
        }
    }

    async uploadFile({file,userId}){
        try {
            const Id = userId + 'profilePicture';
            const response=  await this.bucket.createFile(
                envVars.appwriteBucketId,
                Id,
                file
            )
            const fileId = response.$id;
            const url = `${this.client.config.endpoint}/storage/buckets/${envVars.appwriteBucketId}/files/${fileId}/view?project=${envVars.appwriteProjectId}&project=${envVars.appwriteProjectId}&mode=admin`;
            return url;
        } catch (error) {
            console.log("error uploading file", error);
            return '';
        }
    }

    async deleteFile(fileId){
        try {
            await this.bucket.deleteFile(
                envVars.appwriteBucketId,
                fileId
            )
            return true
        } catch (error) {
            console.log("Appwrite serive :: deleteFile :: error", error);
            return false
        }
    }

    async getFilePreview(fileId){
        return await this.bucket.getFilePreview(
            envVars.appwriteBucketId,
            fileId
        )
    }

    async getAllUsersDocuments(){ 
        try { 
            const response = await this.databases.listDocuments( 
                envVars.appwriteDatabaseId, 
                envVars.appwriteUsersCollectionId, 
             )
            return response.documents || [];
            } catch (error) { 
                console.error(error); 
                return [];
            }
    }

}

const service = new Service()
export default service;