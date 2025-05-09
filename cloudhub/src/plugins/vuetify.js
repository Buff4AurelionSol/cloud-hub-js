/**
 * plugins/vuetify.js
 */
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'

// Importaciones esenciales de Vuetify
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'


import { VDateInput } from 'vuetify/labs/VDateInput'
import { VNavigationDrawer } from 'vuetify/components'


export default createVuetify({
  components: {
    ...components, // Componentes base de Vuetify
    VDateInput,    // Componente de Labs
    VNavigationDrawer
  },
  directives,      // Directivas de Vuetify (obligatorias)
  theme: {
    defaultTheme: 'dark',
  },
})