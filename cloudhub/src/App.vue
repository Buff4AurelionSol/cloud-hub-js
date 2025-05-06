<script setup>
  const indexState = ref(10)
  const filters = ref([])
  const transactions = ref([])
  const orderBy = ref("")
  const haveIChangeDirectionOrderBy = ref(false)
  const searchValue = ref("")
  const payTypeState = ref('BOLIVARES')
  const columnsToFilter = ref([])

  const COLUMNS_TABLE = ['ID','ESTADO','REFERENCIA','TIPO REPORTE','TIPO TRANSACCIÓN',
    'MONTO TRANSACCIÓN','MONTO USD','TASA','CONTRATOS','CLIENTE','RIF/CEDULA',
    'BANCO ORIGEN','BANCO DESTINO','FECHA TRANSACCIÓN','FECHA REPORTE']

    const COLUMNS_TABLE_DOLAR = ['ID','REFERENCIA BANCARIA', 'TIPO REPORTE', 'TIPO TRANSACCIÓN',
        'MONTO ($)', 'TASA', 'CONTRATO(S)', 'FACTURA(S)', 'FECHA FACTURADO(S)', 'CLIENTE',
        'RIF/CEDULA', 'BANCO ORIGEN', 'BANCO DESTINO', 'FECHA TRANSACCIÓN', 'FECHA REPORTE'
    ]
  const columnsItems = ref(COLUMNS_TABLE)

  function getNumberToFilter(value) {
    indexState.value = Number(value)
  }

  function getData(data){
    filters.value = data
  }

  function getTransactions(data){
    transactions.value = data
  }

  function getOrderBy(data){
    orderBy.value = data
  }

  function getSearch(data){
    searchValue.value = data
    console.log(searchValue.value)
  }

  function isChangeDirectionOrderBy(){
    haveIChangeDirectionOrderBy.value 
    ? 
      haveIChangeDirectionOrderBy.value = false 
    : 
      haveIChangeDirectionOrderBy.value = true

  }

  function getPayType(data){
    payTypeState.value = data
  }

  function getColumnsToFilter(columns){
    columnsToFilter.value = columns
  }

</script>


<template>
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

   
</template>

