<script setup>
    const payTypeValue = ref('')
    const payTypeState = ref('')
    const emit = defineEmits(['sendPayTypeState'])
    const OPTIONS_TYPE_PAY = ['BOLIVARES', 'DIVISAS']

    function addTypeState(data){
        if(OPTIONS_TYPE_PAY.includes(data)){
            payTypeState.value = data;
            emit('sendPayTypeState', payTypeState.value);
        }else{
            console.log("Error")
        }
        
    }

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
          <v-btn value="BOLIVARES" @click="addTypeState('BOLIVARES')" class="h-100">
            BOLIVARES
          </v-btn>

          <v-btn value="DIVISAS" @click="addTypeState('DIVISAS')" class="h-100">
            DIVISAS
          </v-btn>
        </div>
      </v-btn-toggle>
    </v-col>
  </v-row>
</template>

