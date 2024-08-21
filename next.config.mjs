/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack(config) {
      // SVG ローダー設定のみ維持
      config.module.rules.push({
          test: /\.svg$/,
          use: [
              {
                  loader: '@svgr/webpack',
                  options: {
                      icon: true,
                  },
              },
          ],
      });

      return config;
  },
};

export default nextConfig;
