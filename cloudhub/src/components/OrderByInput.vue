<script setup>
    import {OPTIONS_ORDER_BY} from '@/stores/const.js'
</script>

<template>
        <v-combobox
            name="orderBy"
            label="Ordenar por"
            :items="OPTIONS_ORDER_BY"   
        />
</template>

<style scoped>
   
</style>