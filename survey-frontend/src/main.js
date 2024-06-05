import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'
import vuetify from './plugins/vuetify'
import 'vuetify/styles'
import '@mdi/font/css/materialdesignicons.css'

const app = createApp(App)

document.addEventListener('DOMContentLoaded', () => {
  const csrfTokenElement = document.querySelector('meta[name="csrf-token"]')
  if (csrfTokenElement) {
    const csrfToken = csrfTokenElement.getAttribute('content')
    axios.defaults.headers.common['X-CSRFToken'] = csrfToken
  } else {
    console.error('CSRF token not found')
  }

  app.use(router)
  app.use(vuetify)
  app.mount('#app')
})
