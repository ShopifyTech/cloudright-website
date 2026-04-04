/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  experimental: {
    // Inlines critical CSS for faster first paint
    optimizeCss: true,
  },
};

export default nextConfig;
