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
  <v-row class="text-center"  >
    <v-col>
      <v-btn-toggle
        v-model="VALUES_TYPE_REPORT"
        color="deep-purple-accent-3"
        group
        mandatory
        class="bg-black"
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
  </v-row>
</template>

<style scoped>
  .box{
    width: auto;
  }

</style>