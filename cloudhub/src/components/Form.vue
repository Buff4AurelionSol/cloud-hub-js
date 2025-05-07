<script setup >
   import ExchangeIMG from '@/pics/exchangeIMG.png'
   const emit = defineEmits(['numberToFilter','sendData', 'transactions', 'orderBy', 
    'isChangeDirectionOrderBy', 'isChangeDirectionTransaction', 'sendSearch', 'sendPayTypeState','sendColumnsToFilter'])
   const selectedValues = ref([])
   const payTypeState = ref('BOLIVARES')
   const selectedColumns = ref([])
   
  const props = defineProps({
    haveIChangeDirectionOrderBy:{
      type: Boolean
    },
    columnsItems: {
            type: Array
        }
  })



  const handleSubmit = (e) => {
    e.preventDefault()
    const dataArray = []
    const data = Object.fromEntries(new FormData(e.target)) 
    let showPaysSelect = data["showPaysSelect"] 
    data.transaction = selectedValues.value
    data.selectedColumns = selectedColumns.value

    console.log(data)

    emit('numberToFilter', showPaysSelect)
    emit('sendData', dataArray)
    emit('transactions', data.transaction)
    emit('orderBy', data.orderBy)
    emit('sendSearch', data.search)
    emit('sendPayTypeState', payTypeState.value)
    emit('sendColumnsToFilter', data.selectedColumns)

  }

  const getTransactions = (values) =>{
     selectedValues.value =  values
  }

  const getColumnsToFilter = (values) =>{
    selectedColumns.value = values
  }

  const isChangeDirectionOrderBy = () => {
    emit('isChangeDirectionOrderBy')
  }

  const isChangeDirectionTransaction = () => {
    emit('isChangeDirectionTransaction')
  }

  function getPayType(data){
    payTypeState.value = data
  }


</script>

<template>
  <header class="header-Form"><h1>Reportes de Pagos</h1></header>
  <form @submit="handleSubmit">
    <v-container>    
      <v-row .justify-center>
        <v-col cols="6">
          <SearchInput/> 
        </v-col>
        <v-col cols="6">
          <PayType @sendPayTypeState="getPayType"/>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="12" md="3">
          <DateInput name="fecha-1" label="Fecha de inicio"/>
        </v-col>
        <v-col cols="12" md="3">
          <DateInput name="fecha-2" label="Fecha final"/>
        </v-col>
        <v-col cols="12" md="6" class="order-by-col">
          <OrderByInput/>
          <button class="buttonExchange" name="changeDirectionOrderByButton" @click="isChangeDirectionOrderBy" type="button">
            <span>
              <img :src="ExchangeIMG" alt="Cambiar orden">
            </span>
          </button>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="6">
          <ShowPaysInput/>
        </v-col>
        <v-col cols="6">
          <TransactionInput @sendSelectedValues="getTransactions"/>
        </v-col>
      </v-row>

      <v-row>
        <v-col>
          <ColumnsFilter @sendValuesColumns="getColumnsToFilter" :columnsItems="props.columnsItems"/>
        </v-col>
      </v-row>

      <v-row justify="center">
        <v-btn variant="outlined" type="submit"> Enviar </v-btn>
      </v-row>
    </v-container>
    
  </form>
</template>

<style scoped>
  .header-Form  {
    display: flex;
    justify-content: center;
    margin: 10px 0px;
  }

  .order-by-col{
    position: relative;
  }

  .buttonExchange{
    height: 25px;
    width: 25px;
    position: absolute;
    right: 20px;
    bottom: 50px;
  }

  
  .buttonExchange img {
    width: 100%;
    height: auto;
  }

  
</style>

