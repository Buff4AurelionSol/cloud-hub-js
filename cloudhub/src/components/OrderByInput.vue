<script setup>
    const SELECTED_ORDER = defineModel('selectedOrders')
</script>


<template>
        <v-combobox
            name="orderBy"
            label="Ordenar por"
            v-model="SELECTED_ORDER"
            :items="OPTIONS_ORDER_BY"
        />
</template>

<style scoped>
   
</style>