/** @type {import('next').NextConfig} */
const nextConfig = {  // Aqui estava o erro antes
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "upload.wikimedia.org",
        port: "",
        pathname: "/wikipedia/commons/**",
      },
      {
        protocol: "https",
        hostname: "placehold.co",
      },
      {
        protocol: "https",
        hostname: "flagcdn.com",
      },
    ],
    dangerouslyAllowSVG: true,
  },
};

module.exports = nextConfig;
