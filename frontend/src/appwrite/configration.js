import { Client, Databases, ID, Query, Storage } from "appwrite";
import conf from "../conf/conf";

export class DatabasesServices {
  client = new Client();
  databases;
  bucket;

  constructor() {
    this.client.setEndpoint(conf.appwriteUrl).setProject(conf.appwriteProjectId);
    this.databases = new Databases(this.client);
    this.bucket = new Storage(this.client);
  }

  async createPost({ title, content, featureimage, status, userid, slug }) {
    try {
      return await this.databases.createDocument(
        conf.appwriteDatabase,
        conf.appwriteCollectionId,
        slug,
        {
          title,
          content,
          featureimage,
          status,
          userid,
        }
      );
    } catch (error) {
      console.error("Appwrite create post error:", error);
      return null;
    }
  }

  async updatePost(slug, { title, content, featureimage, status }) {
    try {
      return await this.databases.updateDocument(
        conf.appwriteDatabase,
        conf.appwriteCollectionId,
        slug,
        {
          title,
          content,
          featureimage,
          status,
        }
      );
    } catch (error) {
      console.error("Appwrite update post error:", error);
      return null;
    }
  }

  async deletePost(slug) {
    try {
      await this.databases.deleteDocument(
        conf.appwriteDatabase,
        conf.appwriteCollectionId,
        slug
      );
      return true;
    } catch (error) {
      console.error("Appwrite delete post error:", error);
      return false;
    }
  }

  async getPost(slug) {
    try {
      return await this.databases.getDocument(
        conf.appwriteDatabase,
        conf.appwriteCollectionId,
        slug
      );
    } catch (error) {
      console.error("Appwrite get post error:", error);
      return null;
    }
  }

  async getPosts(queries = [Query.equal("status", "active")]) {
    try {
      return await this.databases.listDocuments(
        conf.appwriteDatabase,
        conf.appwriteCollectionId,
        queries
      );
    } catch (error) {
      console.error("Appwrite get posts error:", error);
      return null;
    }
  }

  async uploadFile(file) {
    try {
      console.log("Appwrite Project ID:", conf.appwriteprojectId);
      console.log("Appwrite Bucket ID:", conf.appwriteBucketId);
  
      return await this.bucket.createFile(conf.appwriteBucketId, ID.unique(), file);
    } catch (error) {
      console.error("Appwrite upload file error:", error);
      return null;
    }}

    async deleteFile(fileId) {
      try {
        console.log("Deleting file from bucket:", conf.appwriteBucketId, "File ID:", fileId);
        return await this.bucket.deleteFile(conf.appwriteBucketId, fileId);
      } catch (error) {
        console.error("Appwrite delete file error:", error);
        return false;
      }
    }
    getFilesPreview(fileId) {
      try {
        console.log("Fetching file preview for File ID:", fileId);
        return this.bucket.getFilePreview(conf.appwriteBucketId, fileId);
      } catch (error) {
        console.error("Appwrite get file preview error:", error);
        return null;
      }
    }
    

    
}

const databasesServices = new DatabasesServices();

export default databasesServices;
