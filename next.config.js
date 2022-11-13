/** @type {import('next').NextConfig} */
const path = require("path");

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  sassOptions: {
    includePaths: [path.join(__dirname, "styles")],
  },
  images: {
    domains: ["flagcdn.com", "upload.wikimedia.org"],
    formats: ["image/webp"],
  },
};

module.exports = nextConfig;
