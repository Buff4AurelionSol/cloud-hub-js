/**
 * plugins/vuetify.js
 */
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'

// Importaciones esenciales de Vuetify
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

// Importa el componente de Labs (prueba ambas formas si una falla)
import { VDateInput } from 'vuetify/labs/VDateInput'
// O alternativamente:
// import { VDateInput } from 'vuetify/labs/components'

export default createVuetify({
  components: {
    ...components, // Componentes base de Vuetify
    VDateInput,    // Componente de Labs
  },
  directives,      // Directivas de Vuetify (obligatorias)
  theme: {
    defaultTheme: 'dark',
  },
})