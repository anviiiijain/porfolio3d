import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  
  output: 'export',
  basePath: process.env.NODE_ENV === 'production' ? '/porfolio3d' : '',
  trailingSlash: true,

};

export default nextConfig;
