const withAntdLess = require('next-plugin-antd-less');

/**
 * @type {import('next').NextConfig}
 */

 module.exports = {
  headers: async () => {
    return [
      {
        source: '/fonts/(.)',
        headers: [
          {
            key: 'cache-control',
            value: 'public, max-age=691200',
          },
        ],
      },
    ];
  },
  ...withAntdLess({
    // optional: you can modify antd less variables directly here
    modifyVars: {},
    // Or better still you can specify a path to a file
    lessVarsFilePath: './styles/antd-custom.less',
    // optional
    lessVarsFilePathAppendToEndOfContent: false,
    // optional https://github.com/webpack-contrib/css-loader#object
    cssLoaderOptions: {},

    // Other Config Here...
    images: {
      domains: ['openedx.org'],
    },

    webpack (config) {
      // Add svg import instead next image loader
      config.module.rules.push({
        test: /.svg$/i,
        issuer: /.[jt]sx?$/,
        loader: require.resolve('@svgr/webpack'),
      });

      return config;
    },

    // ONLY for Next.js 10, if you use Next.js 11, delete this block
    future: {
      webpack5: false,
    },
  }),
};

