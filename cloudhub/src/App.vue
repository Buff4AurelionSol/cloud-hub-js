<script setup>
import TableFacturados from './components/TableFacturados.vue'

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

  const COLUMNS_TABLE = [
      {reportType: 'BOLIVARES', values: ['ID','ESTADO','REFERENCIA','TIPO REPORTE','TIPO TRANSACCIÓN',
    'MONTO TRANSACCIÓN','MONTO USD','TASA','CONTRATOS','CLIENTE','RIF/CEDULA',
    'BANCO ORIGEN','BANCO DESTINO','FECHA TRANSACCIÓN','FECHA REPORTE']},
      {reportType:'DIVISAS', values: ['ID','REFERENCIA BANCARIA', 'TIPO REPORTE', 'TIPO TRANSACCIÓN',
        'MONTO ($)', 'TASA', 'CONTRATO(S)', 'FACTURA(S)', 'FECHA FACTURADO(S)', 'CLIENTE',
        'RIF/CEDULA', 'BANCO ORIGEN', 'BANCO DESTINO', 'FECHA TRANSACCIÓN', 'FECHA REPORTE'
    ]}]


    const COLUMNS_TABLE2 = [
      {reporType: 'Por facturar', values: [
        {title: 'id', value:'ID'},
        {title: 'transaccions', children: [
            {title:'referencia', value:'REFERENCIA'},
            {title:'banco_origen', value:'BANCO ORIGEN'},
            {title:'banco_destino', value:'BANCO DESTINO'},
            {title:'monto', value: 'MONTO'},
            {title:'monto_usd', value: 'MONTO USD'},
            {title: 'tasa', value: 'TASA'},
            {title:'tipo', value: 'TIPO TRANSACCIÓN'},
            {title:'fecha', value:'FECHA TRANSACCIÓN'}

         ]
        },
        {title: 'contratos', children:[
            {title:'nombre', value:'CLIENTE'},
            {title: 'contrato', value:'CONTRATO(S)'},
            {title:'rif', value:'RIF/CEDULA'}
        ]},
        {title:'facturas', children:[
            {title:'factura', value:'FACTURA(S)'},
            {title:'fecha', value:'FECHA FACTURA'}
        ]},
        {title:'created_at', value: 'FECHA REPORTE'}
      ]}
    ]

    
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

  const getTypeReport = (data) => {
    reportTypeState.value = data
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

 
  watchEffect(()=>{
    if(payTypeState.value === 'BOLIVARES' && reportTypeState.value === 'POR FACTURAR'){
      tableType.value = 'Por facturar'
    }
    if(payTypeState.value === 'BOLIVARES' && reportTypeState.value === 'FACTURADOS'){
      tableType.value = 'Facturados'
    }
    if(payTypeState.value === 'BOLIVARES' && reportTypeState.value === 'RECHAZADOS'){
      tableType.value = 'Rechazados'
    }
    if(payTypeState.value === 'BOLIVARES' && reportTypeState.value === 'POR VERIFICAR'){
      tableType.value = 'Por verificar'
    }
    
    if(payTypeState.value === 'DIVISAS' && reportTypeState.value === 'POR FACTURAR'){
      tableType.value = 'Divisas/Por facturar'
    }
    if(payTypeState.value === 'DIVISAS' && reportTypeState.value === 'FACTURADOS'){
      tableType.value = 'Divisas/Facturados'
    }
    if(payTypeState.value === 'DIVISAS' && reportTypeState.value === 'RECHAZADOS'){
      tableType.value = 'Divisas/Rechazados'
    }
    if(payTypeState.value === 'DIVISAS' && reportTypeState.value === 'POR VERIFICAR'){
      tableType.value = 'Divisas/Por verificar'
    }
    
  })




</script>


<template>

<v-app>
  
 
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
        @sendTypeReport="getTypeReport"
  />
    
  <template v-if="tableType === 'Por facturar'">
    <Table 
      :indexState="indexState" 
      :transactions="transactions" 
      :orderBy="orderBy"
      :haveIChangeDirectionOrderBy="haveIChangeDirectionOrderBy" 
      :searchValue="searchValue" 
      :columns="columnsToFilter"
      :type="tableType"
    />
  </template>
  <template v-if="tableType === 'Facturados'">
    <TableFacturados
       :columns="columnsToFilter"
       :type="tableType"
    />
  </template>
  <template v-if="tableType=== 'Rechazados'">
    Rechazados
  </template>
  <template v-if="tableType === 'Por verificar'">
    Por verificar
  </template>

  <template v-if="tableType === 'Divisas/Por facturar'">
    Divisas/Por facturar
  </template>

  <template v-if="tableType === 'Divisas/Facturados'">
    <TableDolarFacturados
      :indexState="indexState" 
      :filters="filters" 
      :transactions="transactions" 
      :orderBy="orderBy"
      :haveIChangeDirectionOrderBy="haveIChangeDirectionOrderBy" 
      :searchValue="searchValue" 
      :columns="columnsToFilter"
      :type="tableType"
    />
  </template>

  <template v-if="tableType === 'Divisas/Rechazados'">
    Divisas/Rechazados
  </template>

  <template v-if="tableType === 'Divisas/Por verificar'">
    Divisas/Por verificar
  </template>



</v-app>
   
</template>

