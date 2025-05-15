import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  redirects: async () => {
    return [
      {
        source: '/',
        destination: '/sign-in',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
