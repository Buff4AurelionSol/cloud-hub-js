<script setup>
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
    />
</template>

<style scoped>
    .search-box{
        place-self: start; 
        margin-left: 5px;
    }
</style>