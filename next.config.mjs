/** @type {import('next').NextConfig} */
import TerserPlugin from "terser-webpack-plugin";

const nextConfig = {
  swcMinify: false, // Temporarily disable SWC minification for debugging
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.optimization.minimizer.push(
        new TerserPlugin({
          terserOptions: {
            mangle: {
              reserved: ["t"], // Prevent mangling of the identifier 't'
            },
          },
        })
      );
    }
    return config;
  },
};

export default nextConfig;
