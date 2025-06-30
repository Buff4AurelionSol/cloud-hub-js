<script setup>
  const OPTIONS_REPORT_TYPE = [
    'POR FACTURAR',
    'FACTURADOS',
    'RECHAZADOS',
    'POR VERIFICAR',
    'RECIBOS' 
  ]

  const VALUES_TYPE_REPORT = defineModel('typeReportsValue', {
    default: 'POR FACTURAR' // Valor por defecto
  })
</script>

<template>
  <v-row class="text-center">
    <v-col>
      <v-btn-toggle
        v-model="VALUES_TYPE_REPORT"
        color="deep-purple-accent-3"
        group
        mandatory
        class="responsive-toggle"
      >
        <v-btn
          v-for="option in OPTIONS_REPORT_TYPE"
          :key="option"
          :value="option"
          class="responsive-btn"
          min-width="auto"
          :height="$vuetify.display.smAndDown ? '36px' : '48px'"
          :class="{
            'text-caption': $vuetify.display.xsOnly,
            'text-body-2': $vuetify.display.smOnly,
            'py-2': $vuetify.display.smAndDown
          }"
        >
          {{ option }}
        </v-btn>
      </v-btn-toggle>
    </v-col>
  </v-row>
</template>

<style scoped>
.responsive-toggle {
  flex-wrap: wrap;
  gap: 4px;
}

.responsive-btn {
  flex: 1 1 auto;
  min-width: 0;
}
</style>