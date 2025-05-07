<script setup>
  const indexState = ref(10)
  const filters = ref([])
  const transactions = ref([])
  const orderBy = ref("")
  const haveIChangeDirectionOrderBy = ref(false)
  const searchValue = ref("")
  const payTypeState = ref('BOLIVARES')
  const columnsToFilter = ref([])

  const COLUMNS_TABLE = [
      {reportType: 'BOLIVARES', values: ['ID','ESTADO','REFERENCIA','TIPO REPORTE','TIPO TRANSACCIÓN',
    'MONTO TRANSACCIÓN','MONTO USD','TASA','CONTRATOS','CLIENTE','RIF/CEDULA',
    'BANCO ORIGEN','BANCO DESTINO','FECHA TRANSACCIÓN','FECHA REPORTE']},
      {reportType:'DIVISAS', values: ['ID','REFERENCIA BANCARIA', 'TIPO REPORTE', 'TIPO TRANSACCIÓN',
        'MONTO ($)', 'TASA', 'CONTRATO(S)', 'FACTURA(S)', 'FECHA FACTURADO(S)', 'CLIENTE',
        'RIF/CEDULA', 'BANCO ORIGEN', 'BANCO DESTINO', 'FECHA TRANSACCIÓN', 'FECHA REPORTE'
    ]}]

    
  const columnsItems = ref(COLUMNS_TABLE[0].values)

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
    changeColumnsItems()
  }

  const getColumnsToFilter = (columns) =>{
    columnsToFilter.value = columns
  }


  const changeColumnsItems = () => {
    switch (payTypeState.value) {
      case 'BOLIVARES':
        columnsItems.value = COLUMNS_TABLE[0].values;
        break;
      
      case 'DIVISAS':
        columnsItems.value = COLUMNS_TABLE[1].values;
        break; 

      default:
        break;
    }
  }

</script>


<template>

<v-app>
  <SideNav/>

 
  <Form @numberToFilter="getNumberToFilter" 
        @sendData="getData" 
        @transactions="getTransactions" 
        @orderBy="getOrderBy"
        :haveIChangeDirectionOrderBy="haveIChangeDirectionOrderBy"
        @isChangeDirectionOrderBy="isChangeDirectionOrderBy"
        @sendSearch="getSearch"
        @sendPayTypeState="getPayType"
        @sendColumnsToFilter="getColumnsToFilter"
        :columnsItems="columnsItems"
  />
    
  <div v-if="payTypeState === 'BOLIVARES'">
    <Table :indexState="indexState" :filters="filters" :transactions="transactions" :orderBy="orderBy"
      :haveIChangeDirectionOrderBy="haveIChangeDirectionOrderBy" :searchValue="searchValue" :columns="columnsToFilter"
    />
  </div>
  <div v-else-if="payTypeState === 'DIVISAS'">
    <TableDolar :indexState="indexState" :filters="filters" :transactions="transactions" :orderBy="orderBy"
      :haveIChangeDirectionOrderBy="haveIChangeDirectionOrderBy" :searchValue="searchValue"
      :columns="columnsToFilter" 
    />
  </div>

</v-app>
   
</template>

