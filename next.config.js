/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.intra.42.fr",
        //port: '',
        // pathname: "users/e42ae79e6deb11375d5c4036f8146539/medium_junkpark.jpg",
      },
    ],
  },
};

module.exports = nextConfig;
