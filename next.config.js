/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  env: {
    mongodbURL: "mongodb+srv://Macuco:Rapha147896325@cluster0.oktjqjq.mongodb.net/?retryWrites=true&w=majority",
  }
}

module.exports = nextConfig
