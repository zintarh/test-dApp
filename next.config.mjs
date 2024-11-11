/** @type {import('next').NextConfig} */
const TerserPlugin = require("terser-webpack-plugin");
const nextConfig = {
  swcMinify: false, // Disable SWC minification temporarily
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.optimization.minimizer.push(
        new TerserPlugin({
          terserOptions: {
            mangle: {
              reserved: ['t'], // Avoid mangling `t`
            },
          },
        })
      );
    }
    return config;
  },
};

export default nextConfig;
