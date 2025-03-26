/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      remotePatterns: [
        {
          protocol: 'https',
          hostname: 'placehold.co',
        },
      ],
      dangerouslyAllowSVG: true, // Permite imagens SVG externas
    },
  }
  
  module.exports = nextConfig
  
  