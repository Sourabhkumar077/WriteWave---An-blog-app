import config from "../config/config";
import { Client, Account, ID } from "appwrite";

export class AuthService {
    client;
    account;

    constructor() {
        // Only initialize if config values are available
        if (config.appwriteUrl && config.appwriteProjectId) {
            this.client = new Client();
            this.client
                .setEndpoint(config.appwriteUrl)
                .setProject(config.appwriteProjectId);

            this.account = new Account(this.client);
        }
    }
    
    async createAccount({ email, password, name }) {
        if (!this.account) {
            throw new Error("AuthService not initialized. Please check your environment variables.");
        }
        try {
            const userAccount = await this.account.create(ID.unique(), email, password, name);
            if (userAccount) {
                // call another function for login also
                return this.login({ email, password });
            } else {
                return userAccount;
            }
        } catch (error) {
            throw error;
        }
    }

    async login({ email, password }) {
        if (!this.account) {
            throw new Error("AuthService not initialized. Please check your environment variables.");
        }
        try {
            return this.account.createEmailPasswordSession(email, password);
        } catch (error) {
            throw error;
        }
    }

    async getCurrentUser(){
        if (!this.account) {
            return null; // Return null instead of throwing error for getCurrentUser
        }
        try {
            await this.account.get()
        } catch (error) {
            console.log("Error at getCurrentUser," , error);
            
        }

        return null;
    }

    async logout(){
        if (!this.account) {
            return; // Just return if not initialized
        }
        try {
            this.account.deleteSessions();
        } catch (error) {
            console.log("Appwrite Service :: Logout error ::",error);
            
        }
    }
}

const authService = new AuthService();

export default authService;