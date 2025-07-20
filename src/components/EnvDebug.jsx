import React from 'react';

function EnvDebug() {
  const envVars = {
    VITE_APPWRITE_URL: import.meta.env.VITE_APPWRITE_URL,
    VITE_APPWRITE_PROJECT_ID: import.meta.env.VITE_APPWRITE_PROJECT_ID,
    VITE_APPWRITE_DATABASE_ID: import.meta.env.VITE_APPWRITE_DATABASE_ID,
    VITE_APPWRITE_COLLECTION_ID: import.meta.env.VITE_APPWRITE_COLLECTION_ID,
    VITE_APPWRITE_BUCKET_ID: import.meta.env.VITE_APPWRITE_BUCKET_ID,
  };

  return (
    <div className="fixed bottom-4 right-4 bg-gray-800 text-white p-4 rounded-lg text-xs max-w-sm">
      <h3 className="font-bold mb-2">Environment Variables Debug:</h3>
      {Object.entries(envVars).map(([key, value]) => (
        <div key={key} className="mb-1">
          <span className="font-mono">{key}:</span>{' '}
          <span className={value ? 'text-green-400' : 'text-red-400'}>
            {value ? '✓ Set' : '✗ Not Set'}
          </span>
        </div>
      ))}
    </div>
  );
}

export default EnvDebug;