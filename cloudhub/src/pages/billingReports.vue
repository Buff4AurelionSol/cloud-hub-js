<script setup>
  const indexState = ref(10)
  const filters = ref([])
  const transactions = ref([])
  const orderBy = ref("")
  const haveIChangeDirectionOrderBy = ref(false)
  const searchValue = ref("")
  const payTypeState = ref('BOLIVARES')
  const reportTypeState = ref('POR FACTURAR')
  const columnsToFilter = ref([])
  const tableType = ref('Por facturar')
  const dataTable = ref(REPORTS)

  



  const columnsItems = ref(COLUMNS_BY_TYPE['Por Facturar'])

  const getNumberToFilter = (value) => {
    indexState.value = Number(value)
  }

  const getData = (data) =>{
    filters.value = data
  }

  const getTransactions = (data) => {
    transactions.value = data
  }

  const getOrderBy = (data) => {
    orderBy.value = data
  }
  
  const getSearch = (data) => {
    searchValue.value = data
  }

  const isChangeDirectionOrderBy = () =>{
    haveIChangeDirectionOrderBy.value 
      ? haveIChangeDirectionOrderBy.value = false 
      : haveIChangeDirectionOrderBy.value = true
  }

  const getPayType = (data) =>{
    payTypeState.value = data
  }

  const getTypeReport = (data) => {
    reportTypeState.value = data
  }

   
  watchEffect(()=>{
    if(payTypeState.value === 'BOLIVARES' && reportTypeState.value === 'POR FACTURAR'){
      tableType.value = 'Por facturar'
      dataTable.value = REPORTS
      columnsItems.value = COLUMNS_BY_TYPE['Por Facturar']
    }
    if(payTypeState.value === 'BOLIVARES' && reportTypeState.value === 'FACTURADOS'){
      tableType.value = 'Facturados'
      dataTable.value = REPORTS_FACTURADOS
      columnsItems.value = COLUMNS_BY_TYPE['Facturados']
     
    }
    if(payTypeState.value === 'BOLIVARES' && reportTypeState.value === 'RECHAZADOS'){
      tableType.value = 'Rechazados'
      dataTable.value = REPORTS_RECHAZADOS
    }
    if(payTypeState.value === 'BOLIVARES' && reportTypeState.value === 'POR VERIFICAR'){
      tableType.value = 'Por verificar'
      dataTable.value = REPORTS_POR_VERIFICAR
    }
    
    if(payTypeState.value === 'DIVISAS' && reportTypeState.value === 'POR FACTURAR'){
      tableType.value = 'Divisas/Por facturar'
      dataTable.value = REPORTS_DIVISAS
    }
    if(payTypeState.value === 'DIVISAS' && reportTypeState.value === 'FACTURADOS'){
      tableType.value = 'Divisas/Facturados'
      dataTable.value = REPORTS_FACTURADOS_DIVISAS
    }
    if(payTypeState.value === 'DIVISAS' && reportTypeState.value === 'RECHAZADOS'){
      tableType.value = 'Divisas/Rechazados'
      dataTable.value = REPORTS_DIVISAS_RECHAZADOS
    }
    if(payTypeState.value === 'DIVISAS' && reportTypeState.value === 'POR VERIFICAR'){
      tableType.value = 'Divisas/Por verificar'
      dataTable.value = REPORTS_POR_VERIFICAR
      
    }
  })

    const submitBill =(e) => {
      e.preventDefault()
      console.log(e.target.value)
    }

    watch(columnsItems, (val) => {
  console.log('columnsItems padre actualizado:', val)
})

</script>

<template>
      <Form
        @numberToFilter="getNumberToFilter"
        @sendData="getData"
        @transactions="getTransactions"
        @orderBy="getOrderBy"
        :haveIChangeDirectionOrderBy="haveIChangeDirectionOrderBy"
        @isChangeDirectionOrderBy="isChangeDirectionOrderBy"
        @sendSearch="getSearch"
        @sendPayTypeState="getPayType"
        v-model:selectedColumns="columnsToFilter"
        :columnsItems="columnsItems"
        @sendTypeReport="getTypeReport"
      />

      <section>
        <TableFacturados
          :indexState="indexState"
          :columns="columnsToFilter"
          :type="tableType"
          :dataTable="dataTable"
          :columnsHeaders="columnsItems"
        />
      </section> 
</template>