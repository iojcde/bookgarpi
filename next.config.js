const million = require('million/compiler');
/** @type {import('next').NextConfig} */
const nextConfig = {
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