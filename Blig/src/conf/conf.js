const conf = {
    appWriteUrl : String(import.meta.env.VITE_APPWRITE_URL),
    dataBaseId : String(import.meta.env.VITE_DATABASE_ID),
    projectId : String(import.meta.env.VITE_PROJECT_ID),
    collectionId : String(import.meta.env.VITE_COLLECTION_ID),
    bucketId : String(import.meta.env.VITE_BUCKET_ID),

}

export default conf;