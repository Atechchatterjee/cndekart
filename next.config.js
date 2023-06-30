/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => {
    // this will override the experiments
    config.experiments = { ...config.experiments, topLevelAwait: true };
    // this will just update topLevelAwait property of config.experiments
    // config.experiments.topLevelAwait = true
    return config;
  },
  async headers() {
    return [
      {
        source: "/api/imagekit-auth",
        headers: [
          {
            key: "Access-Control-Allow-Origin",
            value: "*",
          },
          {
            key: "Access-Control-Allow-Headers",
            value: "Origin, X-Requested-With, Content-Type, Accept",
          },
        ],
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "ik.imagekit.io",
        port: "",
        pathname: "/*",
      },
    ],
  },
};

module.exports = nextConfig;
