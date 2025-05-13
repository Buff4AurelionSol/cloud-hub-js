<script setup>
    const payTypeValue = ref('BOLIVARES')
    const payTypeState = ref('')
    const emit = defineEmits(['sendPayTypeState'])
    const OPTIONS_TYPE_PAY = ['BOLIVARES', 'DIVISAS']

    watch(payTypeValue, (newValue)=>{
     OPTIONS_TYPE_PAY.includes(newValue) 
      ? emit('sendPayTypeState', newValue)
      : console.warn("Valor no permitido", newValue)
    })

</script>

<template>
  <v-row class="text-center">
    <v-col>
      <v-btn-toggle
        v-model="payTypeValue"
        color="deep-purple-accent-3"
        rounded="0"
        group
      >
        <div>
          <v-btn value="BOLIVARES" class="h-100">
            BOLIVARES
          </v-btn>

          <v-btn value="DIVISAS" class="h-100">
            DIVISAS
          </v-btn>
        </div>
      </v-btn-toggle>
    </v-col>
  </v-row>
</template>

