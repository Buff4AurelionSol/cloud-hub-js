<script setup>
    const typeReportValue = ref('')
    const typeReportState = ref('')
    const emit = defineEmits(['sendTypeReportState'])
    const OPTIONS_REPORT_TYPE = ['POR FACTURAR', 'FACTURADOS', 'RECHAZADOS', 'POR VERIFICAR', 'RECIBOS']

    function addReportTypeState(data){
        if(OPTIONS_REPORT_TYPE.includes(data)){
            typeReportState.value = data;
            emit('sendTypeReportState', typeReportState.value);
        }else{
            console.log("Error")
        }
        
    }

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
          <v-btn value="POR FACTURAR" @click="addReportTypeState('POR FACTURAR')" class="h-100">
            POR FACTURAR
          </v-btn>

          <v-btn value="FACTURADOS" @click="addReportTypeState('FACTURADOS')" class="h-100">
            FACTURADOS
          </v-btn>

          <v-btn value="RECHAZADOS" @click="addReportTypeState('RECHAZADOS')" class="h-100">
            RECHAZADOS
          </v-btn>

          <v-btn value="POR VERIFICAR" @click="addReportTypeState('POR VERIFICAR')" class="h-100">
            POR VERIFICAR
          </v-btn>
        </div>
      </v-btn-toggle>
    </v-col>
  </v-row>
</template>

