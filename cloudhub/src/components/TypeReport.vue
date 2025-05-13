<script setup>
    const typeReportValue = ref('POR FACTURAR')
    const emit = defineEmits(['sendTypeReportState'])
    const OPTIONS_REPORT_TYPE = ['POR FACTURAR', 'FACTURADOS', 'RECHAZADOS', 'POR VERIFICAR', 'RECIBOS']

    watch(typeReportValue, (newValue)=>{
     OPTIONS_REPORT_TYPE.includes(newValue) 
      ? emit('sendTypeReportState', newValue)
      : console.warn("Valor no permitido", newValue)
    })


</script>

<template>
  <v-row class="text-center">
    <v-col>
      <v-btn-toggle
        v-model="typeReportValue"
        color="deep-purple-accent-3"
        rounded="0"
        group
      >
        <div>
          <v-btn value="POR FACTURAR" class="h-100">
            POR FACTURAR
          </v-btn>

          <v-btn value="FACTURADOS" class="h-100">
            FACTURADOS
          </v-btn>

          <v-btn value="RECHAZADOS" class="h-100">
            RECHAZADOS
          </v-btn>

          <v-btn value="POR VERIFICAR" class="h-100">
            POR VERIFICAR
          </v-btn>
        </div>
      </v-btn-toggle>
    </v-col>
  </v-row>
</template>

