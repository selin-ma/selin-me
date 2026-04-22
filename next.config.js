/** @type {import('next').NextConfig} */
const isGitHubPages = process.env.GITHUB_ACTIONS === 'true';

const nextConfig = {
  output: isGitHubPages ? 'export' : undefined,
  basePath: isGitHubPages ? '/selin-me' : '',
  trailingSlash: true,
  images: {
    unoptimized: isGitHubPages,
  },
};

module.exports = nextConfig;
