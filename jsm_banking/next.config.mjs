/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
      APPWRITE_DATABASE_ID: process.env.APPWRITE_DATABASE_ID,
      APPWRITE_USER_COLLECTION_ID: process.env.APPWRITE_USER_COLLECTION_ID,
      APPWRITE_BANK_COLLECTION_ID: process.env.APPWRITE_BANK_COLLECTION_ID,
    },
  };
  
export default nextConfig;
