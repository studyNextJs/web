const { defineConfig } = require('@vue/cli-service');

module.exports = defineConfig({
  transpileDependencies: ['vuetify'],
  css: {
    extract: process.env.NODE_ENV === 'production' ? {
      filename: 'css/[name].[contenthash:8].css',
      chunkFilename: 'css/[name].[contenthash:8].css',
    } : false,
  },
  devServer: {
    proxy: {
      '/polls': {
        target: 'https://seulgi97.duckdns.org',  
        changeOrigin: true,
      },
    },
  },
});
