<script setup>
    const options = [10, 25, 50, 100];
    const defaultValue = ref(options[0])
    const emit = defineEmits(['sendValuesToShow'])

    const sendValuesShowInputs = (value) => {
        emit('sendValuesToShow', value)
    }
</script>

<template>
    <v-select
        style="margin-left: 10px;"
        name="showPaysSelect"
        label="Cantidad de registros a mostrar"
        :items="options"
        variant="outlined"
        v-model="defaultValue"
        @update:modelValue="sendValuesShowInputs"
    />
</template>
    
<style scoped>

</style>