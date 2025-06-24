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

  //Estados del dashboard
  const DATA_DAY = ref(facturas_realizadas_hoy)
  const DATA_MONTH = ref(facturas_realizadas_mes)
  const DATE_MONTH_INPUT = ref("")
  const HISTORICAL_MONTH = ref(datosConsolidados)

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
      ]},
      {reporType: 'Facturados', values: [
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
      ]},
      {reporType: 'Rechazados', values: [
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
      ]},
      {reporType: 'Por verificar', values: [
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
      ]},
      
      {reporType: 'Divisas/Por facturar', values: [
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
      ]},
      {reporType: 'Divisas/Facturados', values: [
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
        {title: 'Divisas/contratos', children:[
            {title:'nombre', value:'CLIENTE'},
            {title: 'contrato', value:'CONTRATO(S)'},
            {title:'rif', value:'RIF/CEDULA'}
        ]},
        {title:'facturas', children:[
            {title:'factura', value:'FACTURA(S)'},
            {title:'fecha', value:'FECHA FACTURA'}
        ]},
        {title:'created_at', value: 'FECHA REPORTE'}
      ]},
      {reporType: 'Divisas/Rechazados', values: [
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
      ]},
      {reporType: 'Divisas/Por verificar', values: [
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
      ]},
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
        columnsItems.value = COLUMNS_TABLE2[0].values;
        break;
      
      case 'DIVISAS':
        columnsItems.value = COLUMNS_TABLE2[6].values;
        break; 

      default:
        break;
    }
  }

 
  watchEffect(()=>{
    if(payTypeState.value === 'BOLIVARES' && reportTypeState.value === 'POR FACTURAR'){
      tableType.value = 'Por facturar'
      dataTable.value = REPORTS
    }
    if(payTypeState.value === 'BOLIVARES' && reportTypeState.value === 'FACTURADOS'){
      tableType.value = 'Facturados'
      dataTable.value = REPORTS_FACTURADOS
     
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

  
</script>


<template>

<v-app>
    
    <!-- <Form @numberToFilter="getNumberToFilter" 
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
      
    <section>
        <TableFacturados
        :indexState="indexState" 
        :columns="columnsToFilter"
        :type="tableType"
        :dataTable="dataTable"
      />
    </section>
  -->
  <v-container fluid class=" bg-grey-lighten-5 justify-center align-center">
    <v-row dense>
      <v-col cols="12" md="6">
        <DataBillingComponent  
          class-props="d-flex flex-column align-center justify-center
            bg-white rounded-xl 
            border-t-lg border-primary 
            border-opacity-100
            pa-4"
          :title="'Facturas del día'" 
          :data="DATA_DAY"
        />
      </v-col>
      <v-col cols="12" md="6">
        <DataBillingComponent
          class-props="d-flex flex-column align-center  
            bg-white rounded-xl 
            border-t-lg border-primary 
            border-opacity-100 
            pa-4"
          title="Facturas del Mes" 
          :data="DATA_MONTH"
        >
          <section class="w-100 d-flex justify-center mt-2">
            <div class="w-75">
              <DateInput 
                label="Fecha" 
                name="dateMonthInput"
                v-model.formatted="DATE_MONTH_INPUT"
              />
            </div>
          </section>
        </DataBillingComponent>
      </v-col>
      <v-col cols="12">
        <MonthlyHistorical
          class-props="d-flex flex-column align-center  
              bg-white w-100 rounded-xl 
              border-t-lg border-primary 
              border-opacity-100 
              "  
          title="Historico Mensual de Reportes por Método"
          :data="HISTORICAL_MONTH"
          
        /> 
      </v-col>
    </v-row>
  </v-container>
</v-app>
  
</template>

