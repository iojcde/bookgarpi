/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => ({
    ...config,
    externals:[...config.externals, 'chrome-aws-lambda'],
    resolve: {
      ...config.resolve,
      alias: {
        ...config.resolve?.alias,
        canvas$: false, 
      },
    },
  }),
}

module.exports = nextConfig
