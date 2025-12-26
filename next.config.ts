import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  async redirects() {
    return [
      {
        source: '/tour',
        destination: 'https://www.ticketmaster.de/artist/naomi-jon-tickets/1272323?language=en-us',
        permanent: true,
      },
      {
        source: '/((?!tour).*)', 
        destination: 'https://linktr.ee/naomijonhq',
        permanent: true,
      },
    ]
  }
};

export default nextConfig;
