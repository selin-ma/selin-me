/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath:'selin-me',
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
};

module.exports = nextConfig;
