const envVars = {
    appwriteUrl: String(import.meta.env.VITE_APPWRITE_URL),
    appwriteProjectId: String(import.meta.env.VITE_APPWRITE_PROJECT_ID),
    appwriteDatabaseId: String(import.meta.env.VITE_APPWRITE_DATABASE_ID),
    appwriteUsersCollectionId: String(import.meta.env.VITE_APPWRITE_USERS_COLLECTION_ID),
    appwriteTasksCollectionId: String(import.meta.env.VITE_APPWRITE_TASKS_COLLECTION_ID),
    appwriteProjectsCollectionId: String(import.meta.env.VITE_APPWRITE_PROJECTS_COLLECTION_ID),
    appwriteNotificationsCollectionId: String(import.meta.env.VITE_APPWRITE_NOTIFICATIONS_COLLECTION_ID),
    appwriteFilesCollectionId: String(import.meta.env.VITE_APPWRITE_FILES_COLLECTION_ID),
    appwriteCommentsCollectionId: String(import.meta.env.VITE_APPWRITE_COMMENTS_COLLECTION_ID),
    appwriteBucketId: String(import.meta.env.VITE_APPWRITE_BUCKET_ID)
}

export default envVars