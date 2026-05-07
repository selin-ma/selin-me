import type { MetadataRoute } from 'next';

const isGitHubPages = process.env.GITHUB_ACTIONS === 'true';
const base = isGitHubPages ? '/selin-me' : '';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Selin Ma — Frontend Engineer',
    short_name: 'Selin',
    description: '5年前端工程师的职业故事与技术积累',
    start_url: `${base}/`,
    scope: `${base}/`,
    display: 'standalone',
    orientation: 'portrait-primary',
    theme_color: '#F0EFE9',
    background_color: '#F0EFE9',
    lang: 'zh-CN',
    icons: [
      {
        src: `${base}/icons/icon-192.png`,
        sizes: '192x192',
        type: 'image/png',
        purpose: 'maskable',
      },
      {
        src: `${base}/icons/icon-512.png`,
        sizes: '512x512',
        type: 'image/png',
        purpose: 'any',
      },
    ],
  };
}
