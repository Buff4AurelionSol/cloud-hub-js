<script setup>
  const OPTIONS_REPORT_TYPE = [
    'POR FACTURAR',
    'FACTURADOS',
    'RECHAZADOS',
    'POR VERIFICAR',
  ]

  const VALUES_TYPE_REPORT = defineModel('typeReportsValue', {
    default: 'POR FACTURAR'
  })
</script>

<template>
   <v-col>
      <v-btn-toggle
        v-model="VALUES_TYPE_REPORT"
        color="deep-purple-accent-3"
        group
        mandatory
      >
        <v-btn
          v-for="option in OPTIONS_REPORT_TYPE"
          :key="option"
          :value="option"
    
        >
          {{ option }}
        </v-btn>
      </v-btn-toggle>
    </v-col>
</template>
