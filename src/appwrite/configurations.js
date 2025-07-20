import config from "../config/config";
import { Client, Databases, Storage, Query, ID } from "appwrite";

class Service {
    client;
    databases;
    bucket;

    constructor() {
        if (config.appwriteUrl && config.appwriteProjectId) {
            this.client = new Client();
            this.client
                .setEndpoint(config.appwriteUrl)
                .setProject(config.appwriteProjectId);

            this.databases = new Databases(this.client);
            this.bucket = new Storage(this.client);
        }
    }

    async createPost({ Title, slug, content, featuredimage, status, userId }) {
        try {
            return await this.databases.createDocument(
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
                slug,
                {
                    Title, 
                    content,
                    featuredimage, 
                    userId,
                    status
                }
            );
        } catch (error) {
            console.log("appwriter service :: CreatePost :: Error ", error);
        }
    }

    async updatePost(slug, { Title, content, featuredimage, status }) {
        try {
            return await this.databases.updateDocument(
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
                slug,
                {
                    Title,
                    content,
                    featuredimage,
                    status
                }
            );
        } catch (error) {
            console.log("appwrite service :: updatePost :: Error ", error);
        }
    }

    async deletePost(slug) {
        try {
            return await this.databases.deleteDocument(
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
                slug
            );
        } catch (error) {
            console.log("appwriter service :: Delete :: error", error);
            return false;
        }
    }

    async getPost(slug) {
        try {
            return await this.databases.getDocument(
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
                slug
            );
        } catch (error) {
            console.log("appwriter service :: GetPost:: Error ", error);
            return false;
        }
    }

    async getPosts(queries = [Query.equal("status", "active")]) {
        try {
            return await this.databases.listDocuments(
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
                queries
            );
        } catch (error) {
            console.log("appwriter service :: GetPosts:: Error ", error);
            return false;
        }
    }

    // file upload service

    async uploadFile(file) {
        try {
            return await this.bucket.createFile(
                config.appwriteBucketId,
                ID.unique(),
                file
            );
        } catch (error) {
            console.log("appwriter service :: uploadFile:: Error ", error);
            return false;
        }
    }

    async deleteFile(fileId) {
        try {
            return this.bucket.deleteFile(config.appwriteBucketId, fileId);
        } catch (err) {
            console.log("appwriter service :: Delete File:: Error ", err);
            return false;
        }
    }

    getFilePreview(fileId) {
        try {
            return this.bucket.getFileView(config.appwriteBucketId, fileId);
        } catch (error) {
            console.log("appwriter service :: GetFilePreview:: Error ", error);
            return false;
        }
    }
}

const service = new Service();
export default service;