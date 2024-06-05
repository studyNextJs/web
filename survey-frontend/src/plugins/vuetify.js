// src/plugins/vuetify.js
import { createVuetify } from 'vuetify'
import 'vuetify/styles'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import { aliases, mdi } from 'vuetify/iconsets/mdi'

const vuetify = createVuetify({
  components,
  directives,
  theme: {
    defaultTheme: 'light',
    themes: {
      light: {
        colors: {
          primary: '#1E88E5', // Indigo color
          secondary: '#C5CAE9', // Light indigo
          accent: '#FF4081', // Pink accent
          error: '#D32F2F', // Red
          warning: '#FFC107', // Amber
          info: '#2196F3', // Blue
          success: '#4CAF50', // Green
        },
      },
    },
  },
  icons: {
    defaultSet: 'mdi',
    aliases,
    sets: {
      mdi,
    },
  },
})

export default vuetify
