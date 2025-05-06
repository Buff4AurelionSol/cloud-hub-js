<script setup>
    
    const selectedColumns = ref([])

    const emit = defineEmits(['sendValuesColumns'])

    const props = defineProps({
        columnsItems: {
            type: Array
        }
    })

    const sendValuesColumns= (value) => {
        emit('sendValuesColumns', value)
    }
</script>

<template>
    <v-combobox
        multiple
        label="Columnas a filtrar:"
        v-model="selectedColumns"
        :items="props.columnsItems"
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