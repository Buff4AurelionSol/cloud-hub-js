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
    <v-col class="box-pay-type">
      <v-btn-toggle
        v-model="payTypeValue"
        color="deep-purple-accent-3"
        rounded="0"
        group
      >
        <v-btn value="BOLIVARES" @click="addTypeState('BOLIVARES')" >
          BOLIVARES
        </v-btn>

        <v-btn value="DIVISAS" @click="addTypeState('DIVISAS')">
          DIVISAS
        </v-btn>
      </v-btn-toggle>
    </v-col>
  </v-row>
</template>

<style scoped>
    .box-pay-type{
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 30px;
    }

    .box{
      height: 200px;
      width: 200px;
    }


</style>