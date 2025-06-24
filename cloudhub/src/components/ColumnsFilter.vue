<script setup>
    

    const props = defineProps({
        columnsItems: {
            type: Array
        }
    })

    const model = defineModel("selected")


    const OPTIONS_COLUMNS_COMBOBOX = computed(()=>{
        return props.columnsItems.flatMap((option) => {
        if(option.children){
            return option.children.map((subOption) => subOption.value)
        }

        return option.value

    })

    })
    
</script>

<template>
    <v-combobox
        multiple
        label="Columnas a Ocultar:"
        v-model="model"
        :items="OPTIONS_COLUMNS_COMBOBOX"
        class="columns-table-combobox"
        density="compact"
      />
</template>

<style scoped>
    .columns-table-combobox {
        width: 100%;
        height: 78px;  
    }

</style>