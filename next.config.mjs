/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['storage.googleapis.com'],
  },

  async headers() {
    return [
      {
        source: '/(.*)', // Apply to all pages
        headers: [
          {
            key: 'Cache-Control',
            value: 'no-store', // Disable caching for all pages
          },
        ],
      },
    ]
  },
};

export default nextConfig;
