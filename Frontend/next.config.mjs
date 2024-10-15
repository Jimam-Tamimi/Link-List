import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "127.0.0.1",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "link-list-kl53.onrender.com",
        port: '',
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "linklist.up.railway.app",
        port: '',
        pathname: "**",
      },
    ],
  },
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default withNextIntl(nextConfig);
