<script setup>
    const emits = defineEmits(['sendOrdersBy'])
    const selectedOrder = ref([])
    const sendOrders = (newValue) => {
        emits('sendOrdersBy', newValue)
    }
</script>


<template>
        <v-combobox
            name="orderBy"
            label="Ordenar por"
            v-model="selectedOrder"
            :items="OPTIONS_ORDER_BY"
            @update:model-value="sendOrders"
        />
</template>

<style scoped>
   
</style>