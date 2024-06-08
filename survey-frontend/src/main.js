import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import axios from 'axios';
import vuetify from './plugins/vuetify';
import store from './store';
import 'vuetify/styles';
import '@mdi/font/css/materialdesignicons.css';

axios.defaults.baseURL = 'https://seulgi97.duckdns.org/polls';
axios.defaults.withCredentials = true;

const app = createApp(App)
  .use(router)
  .use(store)
  .use(vuetify);

document.addEventListener('DOMContentLoaded', () => {
  const csrfTokenElement = document.querySelector('meta[name="csrf-token"]');
  if (csrfTokenElement) {
    const csrfToken = csrfTokenElement.getAttribute('content');
    axios.defaults.headers.common['X-CSRFToken'] = csrfToken;
  } else {
    console.error('CSRF token not found');
  }

  app.mount('#app');
});
