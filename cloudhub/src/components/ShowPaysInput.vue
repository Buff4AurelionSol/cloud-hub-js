<script setup>
    const options = [10, 25, 50, 100];
    const VALUES_INPUT_SHOW = defineModel('valuesInputShow')
</script>

<template>
    <v-select
        style="margin-left: 10px;"
        name="showPaysSelect"
        label="Cantidad de registros a mostrar"
        :items="options"
        variant="outlined"
        v-model="VALUES_INPUT_SHOW"
    />
</template>
    
<style scoped>

</style>