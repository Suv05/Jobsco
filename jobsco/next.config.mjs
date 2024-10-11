/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "www.4kgroup.com.au",
        port: "",
        pathname: "/images/content/**",
      },
    ],
  },
};

export default nextConfig;
