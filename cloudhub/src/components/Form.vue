<script setup >
   import ExchangeIMG from '@/pics/exchangeIMG.png'
   const emit = defineEmits(['numberToFilter','sendData', 'transactions', 'orderBy', 
    'isChangeDirectionOrderBy', 'isChangeDirectionTransaction', 'sendSearch', 'sendPayTypeState',
    'sendTypeReport','sendColumnsToFilter'])
   const selectedValues = ref([])
   const payTypeState = ref('BOLIVARES')
   const reportTypeState = ref('POR FACTURAR')
   const selectedColumns = ref([])
   const recordsToShow = ref(10)
   const formRef = ref(null)
   const ordersState = ref(null)
   const showFormState = ref(false)
   
  const props = defineProps({
    haveIChangeDirectionOrderBy:{
      type: Boolean
    },
    columnsItems: {
            type: Array
        }
  })

  const handleSubmit = (e) => {
    
    if(!formRef.value) return;
    
    const formData = new FormData(formRef.value)
    
    const dataArray = []
    const data = Object.fromEntries(formData.entries()) 
    data.showPaysSelect = recordsToShow.value
    data.transaction = selectedValues.value
    data.selectedColumns = selectedColumns.value

    console.log(data)

    emit('numberToFilter', recordsToShow.value)
    emit('sendData', dataArray)
    emit('transactions', data.transaction)
    emit('orderBy', ordersState.value)
    emit('sendSearch', data.search)
    emit('sendPayTypeState', payTypeState.value)
    emit('sendColumnsToFilter', data.selectedColumns)
    emit('sendTypeReport', reportTypeState.value)
    

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

  const getPayType = (data) =>{
    payTypeState.value = data
  }

  const getReportType = (data) => {
    reportTypeState.value = data
  }

  const getRecordsToShow = (data) => {
    recordsToShow.value = data
  }

  const getOrders = (data) => {
    ordersState.value = data; 
  }

  watchEffect(()=>{
    handleSubmit()
  })

  const changeStateShowForm = () => {
    showFormState.value
      ? showFormState.value = false 
      : showFormState.value = true
  }


</script>

<template>
  <header class="header-Form"><h1>Reportes de Pagos</h1></header>
  <form ref="formRef" @input="handleSubmit" @change="handleSubmit">
    <v-container>
      <v-row cols="12" class="flex d-flex justify-center mb-2">
        <v-btn size="large" @click="changeStateShowForm" rounded="xl">
          {{showFormState ? "Cerrar filtros" : "Abrir filtros"}}
        </v-btn>
      </v-row>    
      <v-row :class="{ 'justify-center': !showFormState }">
        <v-col cols="12" md="6" v-if="showFormState":class="{'box-filters-fade': showFormState}">
          <SearchInput/> 
        </v-col>
        <v-col cols="12" md="6" :class="showFormState ? 'box-filters-fade': 'box-filters-move'">
          <PayType @sendPayTypeState="getPayType"/>
          <TypeReport @sendTypeReportState="getReportType"/>
        </v-col>
      </v-row>

      <v-row v-if="showFormState">
        <v-col cols="12" md="3" :class="{'box-filters-fade': showFormState}">
          <DateInput name="fecha-1" label="Fecha de inicio"/>
        </v-col>
        <v-col cols="12" md="3" :class="{'box-filters-fade': showFormState}">
          <DateInput name="fecha-2" label="Fecha final"/>
        </v-col>
        <v-col cols="12" md="6" class="order-by-col" :class="{'box-filters-fade': showFormState}">
          <OrderByInput @sendOrdersBy="getOrders"/>
          <button class="buttonExchange" name="changeDirectionOrderByButton" @click="isChangeDirectionOrderBy" type="button">
            <span>
              <img :src="ExchangeIMG" alt="Cambiar orden">
            </span>
          </button>
        </v-col>
      </v-row>

      <v-row v-if="showFormState">
        <v-col cols="6" :class="{'box-filters-fade': showFormState}">
          <ShowPaysInput @sendValuesToShow="getRecordsToShow"/>
        </v-col>
        <v-col cols="6" :class="{'box-filters-fade': showFormState}">
          <TransactionInput @sendSelectedValues="getTransactions"/>
        </v-col>
      </v-row>

      <v-row v-if="showFormState" >
        <v-col :class="{'box-filters-fade': showFormState}">
          <ColumnsFilter @sendValuesColumns="getColumnsToFilter" :columnsItems="props.columnsItems"/>
        </v-col>
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

  .box-filters-move{
    animation: move-right 2s normal;
  }

  .box-filters-fade{
    animation: fade-down 2s normal;
  }


  @keyframes move-right {

    from{
      transform: translateX(-100px);
    }

    to {
      transform: translateX(0px);
    }
    
  }

  
  @keyframes fade-down{
    from{
      opacity: 0;
      transform: translateY(30px) scale(0.9);
    }
    to{
      opacity: 1;
      transform: translateY(0px) scale(1);
    }
  }

  

  
</style>

