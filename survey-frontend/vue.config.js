const { defineConfig } = require('@vue/cli-service');

module.exports = defineConfig({
  transpileDependencies: ['vuetify'],
  devServer: {
    proxy: {
      '/polls': {
        target: '/',  // 상대 경로로 수정
        changeOrigin: true,
      }
    }
  }
});
