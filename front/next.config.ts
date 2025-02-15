import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
	  return [
        {
          source: '/',
          destination: '/forms',
          permanent: true,
        }
      ]
  }
};

export default nextConfig;
