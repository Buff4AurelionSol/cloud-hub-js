<script setup>
    const options = [10, 25, 50, 100];
    const defaultValue = ref(options[0])
</script>

<template>
    <v-select
        style="margin-left: 10px;"
        name="showPaysSelect"
        label="Cantidad de registros a mostrar"
        :items="options"
        variant="outlined"
        v-model="defaultValue"
    />
</template>
    
<style scoped>

</style>