const config = {
    appwriteUrl: String(import.meta.env.VITE_APPWRITE_URL),
    appwriteProjectId: String(import.meta.env.VITE_APPWRITE_PROJECT_ID),
    appwriteDatabaseId: String(import.meta.env.VITE_APPWRITE_DATABASE_ID),
    appwriteCollectionId: String(import.meta.env.VITE_APPWRITE_COLLECTION_ID),
    appwriteBucketId: String(import.meta.env.VITE_APPWRITE_BUCKET_ID)
};

// Validate configuration
const validateConfig = () => {
    const missing = [];
    if (!config.appwriteUrl || config.appwriteUrl === 'undefined') missing.push('VITE_APPWRITE_URL');
    if (!config.appwriteProjectId || config.appwriteProjectId === 'undefined') missing.push('VITE_APPWRITE_PROJECT_ID');
    if (!config.appwriteDatabaseId || config.appwriteDatabaseId === 'undefined') missing.push('VITE_APPWRITE_DATABASE_ID');
    if (!config.appwriteCollectionId || config.appwriteCollectionId === 'undefined') missing.push('VITE_APPWRITE_COLLECTION_ID');
    if (!config.appwriteBucketId || config.appwriteBucketId === 'undefined') missing.push('VITE_APPWRITE_BUCKET_ID');
    
    if (missing.length > 0) {
        console.error('❌ Missing environment variables:', missing);
        console.error('Please check your .env file and restart the development server.');
    } else {
        console.log('✅ All Appwrite environment variables are configured');
    }
    
    return missing.length === 0;
};

validateConfig();

export default config;