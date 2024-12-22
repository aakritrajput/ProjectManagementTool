import { Client, Account, ID } from "appwrite";
import envVars from "../envVars/envVars";

export class AuthService {

     client;
     account;
     
     constructor() {
        this.client = new Client()
            .setEndpoint(envVars.appwriteUrl)
            .setProject(envVars.appwriteProjectId);
        this.account = new Account(this.client);
     }

     async createAccount({email, password, name}){
        // eslint-disable-next-line no-useless-catch
        try {
            const userAccount = await this.account.create(ID.unique(), email, password, name);
            return userAccount;
        } catch (error) {
            console.log(error)
        }
     }

     async login({email, password}) {
        try {
            return await this.account.createEmailPasswordSession(email, password);
        } catch (error) {
            console.log("error returning logged in user in auth.js 31", error);
        }
    }

    async getCurrentUser() {
        try {
            return await this.account.get();
        } catch (error) {
            console.log("error getting current user account", error);
            return null;
        }
    }

    async logout() {

        try {
            await this.account.deleteSessions();
        } catch (error) {
            console.log("logout error", error);
        }
    }

    async deleteAccount() { 
        try { 
            await this.account.delete(); 
            console.log('User account deleted successfully'); 
        } catch (error) { 
            console.error('Failed to delete user account', error); 
        } 
    }

}

const authService = new AuthService();

export default authService;