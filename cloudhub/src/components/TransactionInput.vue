<script setup>
    const TRANSACTIONS_VALUES = defineModel("transactionsValues")
</script>

<template>
    <v-combobox
      multiple
      label="Transacción"
      v-model="TRANSACTIONS_VALUES"
      :items="OPTIONS_TRANSACTION"
      class="transactions"
      density="compact"
    />
  </template>
  
  <style scoped>
  .transactions {
    width: 100%;
    height: 78px;  
  }
  
  </style>