/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
},
images: {
  domains: ['avatars.githubusercontent.com','lh3.googleusercontent.com','firebasestorage.googleapis.com','utfs.io'],
},
 
  webpack: (config) => {
    config.externals = [...config.externals, 'bcrypt'];
     return config;
    },
};

export default nextConfig;
