import conf from '../conf/conf'

import { Client, ID, Databases, Storage, Query} from 'appwrite';

export class Service{

    client = new Client();
    Databases;        // DB
    bucket;          // Storage

    constructor(){   // iske call hone  pehi bnega database or endpoint wgara inject honge
        this.client
            .setEndpoint(conf.appWriteUrl)
            .setProject(conf.projectId)
        this.databases = new Databases(this.client)   // docs
        this.bucket = new Storage(this.client);       // docs
    }


    // Create Post
    async createPost({title,slug,content,featuredImage,status,userId}){
        try {
            return await this.databases.createDocument(                // using docs
                conf.dataBaseId,     
                conf.collectionId,
                slug,   // document Id or unique id
                {
                    title,
                    content,
                    featuredImage,
                    status,
                    userId,
                }
            )
            
        } catch (error) {
            console.log("Appwrite :: Create Post :: error",error);
            
        }
    }


    // Update Document
    async updatePost(slug,{title,content,featuredImage,status}){
        try {

            await this.databases.updateDocument(
                conf.dataBaseId,
                conf.collectionId,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status,
                }
            )
            
        } catch (error) {
            console.log("Appwrite :: Update Post :: error",error);
        }
    }

    // Delete Document
    async deletePost(slug){
        try {

            await this.databases.deleteDocument(
                conf.dataBaseId,
                conf.collectionId,
                slug,
            )
            return true; // delete hogya hai
            
        } catch (error) {
            console.log("Appwrite :: Delete Post :: error",error);
            return false;         // delete nhi hua hai
        }
    }


    // Get a Document
    async getPost(slug){
        try {
            return await this.databases.getDocument(
                conf.dataBaseId,
                conf.collectionId,
                slug,
            )
        } catch (error) {
            console.log("Appwrite :: Get Post :: error",error);
        }
    }

    // Get all documents
    async getAllPosts(queries = [Query.equal("status","active")]){
        try {
            const posts = await databases.listDocuments(
                conf.dataBaseId,
                conf.collectionId,
                queries,    // queries hum jbhi lga skte hai jb hmne collections mei indexes bnaya ho
            )
            return posts
        } catch (error) {
            console.log("Appwrite :: Get All Post :: error",error);
        }
    }

    // File upload Service
    async uploadFile(file){
        try {
            return await this.bucket.createFile(
                conf.bucketId,
                ID.unique(),
                file,
            )
            
        } catch (error) {
            console.log("Appwrite :: Upload File :: error",error);
        }
    }

    // Delete File
    async deleteFile(fileID){
        try {
        await this.bucket.deleteFile(
            conf.bucketId,
            fileID
        )    
        return true;       // file delete hogyi
        
        } catch (error) {
            console.log("Appwrite :: Delete File :: error",error);
            return false;    // file delete nhi hua
        }
    }

    // Get a File Preview
    async filePreview(fileID){
        try {
            return await this.bucket.getFilePreview(
                conf.bucketId,
                fileID,
            )
            
        } catch (error) {
            console.log("Appwrite :: File Preview :: error",error);
        }
    }
}


const service =  new Service();

export default service;