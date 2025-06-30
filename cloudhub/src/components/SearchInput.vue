<script setup>
    const SEARCH_VALUE = defineModel('searchValue')
</script>

<template>
    <v-text-field
        class="search-box"
        width="100%"
        clearable
        name="search"
        label="Buscar"
        prepend-icon="$vuetify"
        variant="outlined"
        v-model="SEARCH_VALUE"
    />
</template>

<style scoped>
    
</style>