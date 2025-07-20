const config = {
    appwriteUrl: String(import.meta.env.VITE_APPWRITE_URL),
    appwriteProjectId: String(import.meta.env.VITE_APPWRITE_PROJECT_ID),
    appwriteDatabaseId: String(import.meta.env.VITE_APPWRITE_DATABASE_ID),
    appwriteCollectionId: String(import.meta.env.VITE_APPWRITE_COLLECTION_ID),
    appwriteBucketId: String(import.meta.env.VITE_APPWRITE_BUCKET_ID)
};

// Log configuration for debugging
console.log('Appwrite Config:', {
    url: config.appwriteUrl,
    projectId: config.appwriteProjectId ? 'Set' : 'Not Set',
    databaseId: config.appwriteDatabaseId ? 'Set' : 'Not Set',
    collectionId: config.appwriteCollectionId ? 'Set' : 'Not Set',
    bucketId: config.appwriteBucketId ? 'Set' : 'Not Set'
});

export default config;