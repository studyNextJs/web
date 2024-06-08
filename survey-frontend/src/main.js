import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import axios from 'axios';
import VueAxios from 'vue-axios';
import vuetify from './plugins/vuetify';
import store from './store';
import 'vuetify/styles';
import '@mdi/font/css/materialdesignicons.css';

axios.defaults.baseURL = process.env.VUE_APP_API_BASE_URL || 'https://seulgi97.duckdns.org';

const app = createApp(App)
  .use(router)
  .use(store)
  .use(vuetify)
  .use(VueAxios, axios);

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
