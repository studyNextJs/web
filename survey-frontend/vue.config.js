const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true
})
// vue.config.js
module.exports = {
  devServer: {
    proxy: {
      '/polls': {
        target: 'http://127.0.0.1:8000',  // Django 서버 주소
        changeOrigin: true,
      }
    }
  }
};
