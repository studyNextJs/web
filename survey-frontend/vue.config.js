const { defineConfig } = require('@vue/cli-service')

module.exports = defineConfig({
  transpileDependencies: ['vuetify'],
  publicPath: './', // 추가: 상대경로 설정
  assetsDir: './', // 추가: 어셋 경로 설정
  devServer: {
    proxy: {
      '/polls': {
        target: process.env.VUE_APP_API_BASE_URL,  
        changeOrigin: true,
      }
    }
  }
});
