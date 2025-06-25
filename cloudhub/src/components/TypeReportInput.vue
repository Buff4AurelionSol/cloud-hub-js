<script setup>
    const OPTIONS_TYPE_REPORT = ['MENSUALIDAD', 'INSTALACION']
    const model = defineModel()
</script>

<template>
    <v-combobox
      multiple
      label="Tipo Reporte"
      v-model="model"
      :items="OPTIONS_TYPE_REPORT"
      class="reportTypeInput"
      density="compact"
    />
</template>
  
<style scoped>
    .reportTypeInput {
        width: 100%;
        height: 78px;  
    }
</style>