import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import axios from 'axios';

import { createVuetify } from 'vuetify';
import 'vuetify/styles';
import '@mdi/font/css/materialdesignicons.css';
import { aliases, mdi } from 'vuetify/iconsets/mdi';

// Vuetify 설정
const vuetify = createVuetify({
  icons: {
    defaultSet: 'mdi',
    aliases,
    sets: {
      mdi,
    },
  },
});

// CSRF 토큰 설정
document.addEventListener('DOMContentLoaded', () => {
  const csrfTokenElement = document.querySelector('meta[name="csrf-token"]');
  if (csrfTokenElement) {
    const csrfToken = csrfTokenElement.getAttribute('content');
    axios.defaults.headers.common['X-CSRFToken'] = csrfToken;
  } else {
    console.error('CSRF token not found');
  }

  const app = createApp(App);
  app.use(router);
  app.use(vuetify);
  app.mount('#app');
});
