/** @type {import('next').NextConfig} **/
const nextConfig = {
  images: {
    domains: ["localhost"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.intra.42.fr",
        //port: "",
        // pathname: "",
      },
    ],
  },
};

module.exports = nextConfig;
