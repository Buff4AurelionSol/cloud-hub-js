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

    const OPTIONS_COLUMNS_COMBOBOX = props.columnsItems.flatMap((option) => {
        if(option.children){
            return option.children.map((subOption) => subOption.value)
        }

        return option.value

    })
    
</script>

<template>
    <v-combobox
        multiple
        label="Columnas a Ocultar:"
        v-model="selectedColumns"
        :items="OPTIONS_COLUMNS_COMBOBOX"
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