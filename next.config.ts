import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */

  images: {
    domains: ['image.aladin.co.kr'],
  },

  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: [
        {
          loader: '@svgr/webpack',
          options: {
            icon: true,
            svgProps: { fill: 'currentColor' },
            svgoConfig: {
              plugins: [
                {
                  name: 'removeAttrs',
                  params: { attrs: '(fill)' },
                },
              ],
            },
          },
        },
      ],
    });

    return config;
  },
};

export default nextConfig;
