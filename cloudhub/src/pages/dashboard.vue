<script setup>
  const DATA_DAY = ref(facturas_realizadas_hoy)
  const DATA_MONTH = ref(facturas_realizadas_mes)
  const DATE_MONTH_INPUT = ref("")
  const HISTORICAL_MONTH = ref(datosConsolidados)


</script>

<template>
  <v-container fluid class=" bg-grey-lighten-5 justify-center align-center">
    <v-row dense>
      <v-col cols="12" md="6">
        <DataBillingComponent  
          class-props="d-flex flex-column align-center justify-center
            bg-white rounded-xl 
            border-t-lg border-primary 
            border-opacity-100
            pa-4"
          :title="'Facturas del día'" 
          :data="DATA_DAY"
        />
      </v-col>
      <v-col cols="12" md="6">
        <DataBillingComponent
          class-props="d-flex flex-column align-center  
            bg-white rounded-xl 
            border-t-lg border-primary 
            border-opacity-100 
            pa-4"
          title="Facturas del Mes" 
          :data="DATA_MONTH"
        >
          <section class="w-100 d-flex justify-center mt-2">
            <div class="w-75">
              <DateInput 
                label="Fecha" 
                name="dateMonthInput"
                v-model.formatted="DATE_MONTH_INPUT"
              />
            </div>
          </section>
        </DataBillingComponent>
      </v-col>
      <v-col cols="12">
        <MonthlyHistorical
          class-props="d-flex flex-column align-center  
              bg-white w-100 rounded-xl 
              border-t-lg border-primary 
              border-opacity-100 
              "  
          title="Historico Mensual de Reportes por Método"
          :data="HISTORICAL_MONTH"
          
        /> 
      </v-col>
    </v-row>
  </v-container>
</template>