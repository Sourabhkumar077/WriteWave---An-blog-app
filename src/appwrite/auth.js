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
                // Always login after account creation to get a fresh session
                return await this.login({ email, password });
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
            // Check if a session is already active
            await this.account.get();
            // If we reach here, session is active → delete it
            await this.account.deleteSession('current');
        } catch (error) {
            // If session not active, continue
            console.log("No active session or error while checking session:", error.message);
        }

        // Now create new session
        try {
            return await this.account.createEmailPasswordSession(email, password);
        } catch (error) {
            throw error;
        }
    }


    async getCurrentUser() {
    if (!this.account) return null;
    try {
        return await this.account.get(); // return the cureent user
    } catch (error) {
        console.log("Error at getCurrentUser,", error);
        return null;
    }
}

    async logout() {
        if (!this.account) {
            return; // Just return if not initialized
        }
        try {
            await this.account.deleteSessions();
        } catch (error) {
            console.log("Appwrite Service :: Logout error ::", error);

        }
    }
}

const authService = new AuthService();

export default authService;