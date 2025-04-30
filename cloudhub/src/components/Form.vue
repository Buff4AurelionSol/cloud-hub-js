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
    }
  })



  function handleSubmit(e) {
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

  function getTransactions(values){
     selectedValues.value =  values
  }

  function getColumnsToFilter(values){
    selectedColumns.value = values
  }

  function isChangeDirectionOrderBy(){
    emit('isChangeDirectionOrderBy')
  }

  function isChangeDirectionTransaction(){
    emit('isChangeDirectionTransaction')
  }

  function getPayType(data){
    payTypeState.value = data
  }


</script>

<template>
  <header class="header-Form"><h1>Reportes de Pagos</h1></header>
  <form @submit="handleSubmit">
    <div class="box-form">
      <div class="box-search">
        <SearchInput/> 
      </div>
      <div class="box-rols">
        <PayType @sendPayTypeState="getPayType"/>
        
      </div>
  
      <div class="box-date-time">
        <DateInput name="fecha-1" label="Fecha de inicio"/>
        <DateInput name="fecha-2" label="Fecha final"/>
      </div>

      <div class="showRegisters">
        <ShowPaysInput/>
      </div>

      <div class="orderBy">
        <OrderByInput/>
        <div class="box-button-change">
            <button class="buttonExchange" name="changeDirectionOrderByButton" @click="isChangeDirectionOrderBy" type="button">
              <span>
                <img :src="ExchangeIMG" alt="Cambiar orden">
              </span>
            </button>
        </div>
      </div>
      <div class="transaction">
        <TransactionInput @sendSelectedValues="getTransactions"/>
      </div>
    </div>
    <div class="columns">
      <ColumnsFilter @sendValuesColumns="getColumnsToFilter"/>
    </div>
    <div class="box-button">
      <v-btn variant="outlined" type="submit"> Enviar </v-btn>
    </div>
    
  </form>
</template>

<style scoped>

  .box-form{
    display: grid;
    grid-template-columns: 2;
    grid-template-rows: 3;
    gap: 10px; 
  }
  
  .orderBy{
    grid-column: 2;
    grid-row: 2;
    display: flex;
    gap: 5px; 
  }

  .box-button-change{
    display: flex;
    justify-content: center;
    align-items: center;
    height: 56px;
  }

  .transaction{
    grid-column: 2;
    grid-row: 3;
    display: flex;
    gap: 5px; 
  }

  .box-date-time{
    display: flex;
    align-items: center;
    text-align: center;
    gap: 2px;
    margin-left: 10px;
    margin-bottom: 10px;
    grid-column: 1;
    grid-row: 2;
    padding-left: 10px;
  }

  .box-search{
    height: 40px;
    margin-bottom: 15px;
    grid-row: 1; 
  }

  .box-rols{
    grid-row: 1;
    grid-column: 2;
  }

  .showRegisters{
    margin-bottom: 10px;
    grid-column: 1;
    grid-row: 3;
    display: flex;
  }

  .buttonExchange{
    height: 25px;
    width: 25px;
    position: absolute;
    right: 10px;
  }

  .buttonExchange span{
    height: 100%;
    width: 100%;
  }

  .buttonExchange img {
    width: 100%;
    height: auto;
  }

  .header-Form{
    display: flex;
    justify-content: center;
    padding-bottom: 10px;
  }

  .box-button{
    grid-column: 1/2;
    display: flex;
    justify-content: center;
    gap: 10px;
    
  } 
  
  .columns{
    grid-row: 4;
    height: 78px;
  }

  .columns-table-combobox{
    height: 100%;
    margin-right: 5px;
    margin-left: 5px;
  }

</style>

