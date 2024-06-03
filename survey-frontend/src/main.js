import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import axios from 'axios';

// DOMContentLoaded 이벤트 리스너
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
  app.mount('#app');
});
