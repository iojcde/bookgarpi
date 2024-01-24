const million = require('million/compiler');
/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
      serverComponentsExternalPackages: ['puppeteer-core',],
  },
  images:{
    remotePatterns:[
      {
        hostname:'garpi-s3.s3.us-west-000.backblazeb2.com'
      }
    ]
  }
}

module.exports = nextConfig