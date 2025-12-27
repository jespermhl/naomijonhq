import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  compress: true,
  
  async redirects() {
    return [
      {
        source: '/tour',
        destination: 'https://www.ticketmaster.de/artist/naomi-jon-tickets/1272323?language=en-us',
        permanent: true,
      },
      {
        source: '/strawberry',
        destination: 'https://releeze.com/en/collections/naomi-jon',
        permanent: true,
      },
      {
        source: '/((?!tour|strawberry).*)',
        destination: 'https://linktr.ee/naomijonhq',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
