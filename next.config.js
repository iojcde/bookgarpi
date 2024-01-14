/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => ({
    ...config, 
    resolve: {
      ...config.resolve,
      alias: {
        ...config.resolve?.alias,
        canvas$: false, 
      },
    },
  }),
  experimental: {
      serverComponentsExternalPackages: ['puppeteer-core',],
  },
  images:{
    remotePatterns:[
      {
        hostname:'f000.backblazeb2.com'
      }
    ]
  }
}

module.exports = nextConfig
