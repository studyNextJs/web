const { defineConfig } = require('@vue/cli-service')

module.exports = defineConfig({
  publicPath: '',
  transpileDependencies: ['vuetify'],
  devServer: {
    proxy: {
      '/polls': {
        target: process.env.VUE_APP_API_BASE_URL,  
        changeOrigin: true,
      }
    }
  }
});
