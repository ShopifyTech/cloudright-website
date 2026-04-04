/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  experimental: {
    // Enables critters — automatically inlines critical CSS
    optimizeCss: true,
  },
};

module.exports = nextConfig;
