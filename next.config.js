/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
    eslint: {
        // Warning: This allows production builds to successfully complete even if
        // your project has ESLint errors.
        ignoreDuringBuilds: true,
      },
      webpack5: true, 
      webpack: (config, options) => { 
        config.cache = false; 
        return config; 
      },
      env: {
        API_KEY: NEXT_PUBLIC_API_URL,
      },
}



