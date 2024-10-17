/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: '/',
        destination: '/rezepte',
        permanent: true,
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'rezept-storage.s3.amazonaws.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
  reactStrictMode: true,
};

export default nextConfig;
