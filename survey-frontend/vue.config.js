const { defineConfig } = require('@vue/cli-service');

module.exports = defineConfig({
  transpileDependencies: ['vuetify'],
  
  // 배포 환경에 따라 publicPath 설정
  publicPath: '/static',
  
  // 빌드 파일이 생성될 디렉토리
  outputDir: 'dist',
  
  // 에셋 파일의 경로 설정
  assetsDir: './',
  
  // 개발 서버 프록시 설정
  devServer: {
    proxy: {
      '/polls': {
        target: process.env.VUE_APP_API_BASE_URL,
        changeOrigin: true,
      }
    }
  },
  
  // 추가 설정을 여기에 추가할 수 있습니다...
});
