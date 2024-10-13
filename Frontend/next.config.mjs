import createNextIntlPlugin from 'next-intl/plugin';
 
const withNextIntl = createNextIntlPlugin();
 
/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['127.0.0.1', 'localhost', "link-list-1.onrender.com"], // Add any other domains you want to allow
      },
      typescript: {
        ignoreBuildErrors: true,
    
      },
};
 
export default withNextIntl(nextConfig);