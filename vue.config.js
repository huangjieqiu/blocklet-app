const path = require('path');

module.exports = {
  publicPath: process.env.PUBLIC_PATH || '/',
  devServer: {
    disableHostCheck: true,
    proxy: {
      '/api': {
        target: 'https://blockchain.info/',
      },
    },
  },
  configureWebpack: {
    resolve: {
      alias: {
        assets: path.join(__dirname, 'src/assets'),
        common: path.join(__dirname, 'src/common'),
        components: path.join(__dirname, 'src/components'),
        '@': path.join(__dirname, 'src'),
      },
    },
  },
};
