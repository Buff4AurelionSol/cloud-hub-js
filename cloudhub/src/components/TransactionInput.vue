<script setup>
  import {OPTIONS_TRANSACTION} from '@/stores/const.js'
    const selectedValues = ref([])
    const emit = defineEmits(['sendSelectedValues'])
    const sendValuesSelect = (value) => {
        emit('sendSelectedValues', value)
    }
  
</script>

<template>
    <v-combobox
      multiple
      label="Transacción"
      v-model="selectedValues"
      :items="OPTIONS_TRANSACTION"
      class="transactions"
      density="compact"
       @update:modelValue="sendValuesSelect"
    />
  </template>
  
  <style scoped>
  .transactions {
    width: 100%;
    height: 78px;  
  }
  
  </style>