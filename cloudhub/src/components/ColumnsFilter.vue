<script setup>
    const COLUMNS_TABLES = ['ID','ESTADO','REFERENCIA','TIPO REPORTE','TIPO TRANSACCIÓN',
    'MONTO TRANSACCIÓN','MONTO USD','TASA','CONTRATOS','CLIENTE','RIF/CEDULA',
    'BANCO ORIGEN','BANCO DESTINO','FECHA TRANSACCIÓN','FECHA REPORTE']
    const selectedColumns = ref([])

    const emit = defineEmits(['sendValuesColumns'])

    const sendValuesColumns= (value) => {
        emit('sendValuesColumns', value)
    }
</script>

<template>
    <v-combobox
        multiple
        label="Columnas a filtrar:"
        v-model="selectedColumns"
        :items="COLUMNS_TABLES"
        class="columns-table-combobox"
        density="compact"
        @update:modelValue="sendValuesColumns"
      />
</template>

<style scoped>
    .columns-table-combobox {
        width: 100%;
        height: 78px;  
    }

</style>