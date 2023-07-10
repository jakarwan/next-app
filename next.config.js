/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    // loader: 'custom',
    // loaderFile: './my/image/loader.js',
    domains: ["i.dummyjson.com"]
  },

}

module.exports = nextConfig
