/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['images.unsplash.com', 'via.placeholder.com'],
  },
  env: {
    API_URL: process.env.API_URL || 'http://localhost:5000/api',
  },
};

module.exports = nextConfig;
