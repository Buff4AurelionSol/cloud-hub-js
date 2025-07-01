<script setup>
import { ssrLooseEqual } from 'vue/server-renderer'

  //ESTADOS (REFS)
  const RECORDS_TO_SHOW = ref(10)
  const transactions = ref([])
  const orderBy = ref("")
  const haveIChangeDirectionOrderBy = ref(false)
  const searchValue = ref("")
  const payTypeState = ref('BOLIVARES')
  const reportTypeState = ref('POR FACTURAR')
  const columnsToFilter = ref([])
  const tableType = ref('Por facturar')
  const dataTable = ref(REPORTS)
  const typeReport = ref([])
  const columnsItems = ref(COLUMNS_BY_TYPE['Por Facturar'])
  const DATA_TABLE = ref([])
  const TOTAL_PAGES = ref(0)

  const {getReportesPaginados, getReportPaginadosTipoReporteMoneda} = useReportesServices()


  //VARIABLES PARA EL ROUTER
  const route = useRoute();
  const router = useRouter();





  const isChangeDirectionOrderBy = () =>{
    haveIChangeDirectionOrderBy.value 
      ? haveIChangeDirectionOrderBy.value = false 
      : haveIChangeDirectionOrderBy.value = true
  }

  const changeUrl = () => {
      if (tableType.value) {
      const viewParam = tableType.value
        .toLowerCase()
        .replace(/\s+/g, '-')         
        .replace(/\//g, '--');        
      router.replace({
        query: {
          ...route.query,
          view: viewParam
        }
      });
    }
  }


  const handleDataTable = async(page, perPage, moneda, estado) => {
    try {
      const response = await getReportPaginadosTipoReporteMoneda(page, perPage, moneda, estado)
      const {data, total_pages} = response
      return {data, total_pages}

    } catch (error) {
      console.error("Error al obtener reportes:", error)
    }
  }

  const initialDataTable = async(page, perPage) => {
     try {
      const response = await getReportesPaginados(page, perPage)
      const {data, total_pages} = response
      return {data, total_pages}

    } catch (error) {
      console.error("Error al obtener reportes:", error)
    }
    

  }
   
  watchEffect(async ()=>{
    if(payTypeState.value === 'BOLIVARES' && reportTypeState.value === 'POR FACTURAR'){
      tableType.value = 'Por facturar'
      dataTable.value = REPORTS
      columnsItems.value = COLUMNS_BY_TYPE['Por Facturar']
      const {data, total_pages} =  await handleDataTable(1, RECORDS_TO_SHOW.value, OPTIONS_MONEDA.BOLIVARES, OPTIONS_STATES_REPORTS['En facturacion'])
      DATA_TABLE.value = data
      TOTAL_PAGES.value= total_pages
    }
    if(payTypeState.value === 'BOLIVARES' && reportTypeState.value === 'FACTURADOS'){
      tableType.value = 'Facturados'
      dataTable.value = REPORTS_FACTURADOS
      columnsItems.value = COLUMNS_BY_TYPE['Facturados']
      const {data, total_pages} =  await handleDataTable(1, RECORDS_TO_SHOW.value, OPTIONS_MONEDA.BOLIVARES, OPTIONS_STATES_REPORTS.Facturado)
      DATA_TABLE.value = data
      TOTAL_PAGES.value= total_pages
    }
    if(payTypeState.value === 'BOLIVARES' && reportTypeState.value === 'RECHAZADOS'){
      tableType.value = 'Rechazados'
      dataTable.value = REPORTS_RECHAZADOS
      columnsItems.value = COLUMNS_BY_TYPE.Rechazados
      const {data, total_pages} =  await handleDataTable(1, RECORDS_TO_SHOW.value, OPTIONS_MONEDA.BOLIVARES, OPTIONS_STATES_REPORTS.Rechazado)
      DATA_TABLE.value = data
      TOTAL_PAGES.value= total_pages
    }
    if(payTypeState.value === 'BOLIVARES' && reportTypeState.value === 'POR VERIFICAR'){
      tableType.value = 'Por verificar';
      dataTable.value = REPORTS_POR_VERIFICAR;
      columnsItems.value = COLUMNS_BY_TYPE['Por verificar']
      const {data, total_pages} =  await handleDataTable(1, RECORDS_TO_SHOW.value, OPTIONS_MONEDA.BOLIVARES, OPTIONS_STATES_REPORTS['Por verificar'])
      DATA_TABLE.value = data
      TOTAL_PAGES.value= total_pages
    }
    
    if(payTypeState.value === 'DIVISAS' && reportTypeState.value === 'POR FACTURAR'){
      tableType.value = 'Divisas/Por facturar';
      dataTable.value = REPORTS_DIVISAS;
      columnsItems.value = COLUMNS_BY_TYPE['Divisas/Por Facturar']
      const {data, total_pages} =  await handleDataTable(1, RECORDS_TO_SHOW.value, OPTIONS_MONEDA.DOLARES, OPTIONS_STATES_REPORTS['En facturacion'])
      DATA_TABLE.value = data
      TOTAL_PAGES.value= total_pages
    }
    if(payTypeState.value === 'DIVISAS' && reportTypeState.value === 'FACTURADOS'){
      tableType.value = 'Divisas/Facturados';
      dataTable.value = REPORTS_FACTURADOS_DIVISAS;
      columnsItems.value = COLUMNS_BY_TYPE['Divisas/Facturados']
      const {data, total_pages} =  await handleDataTable(1, RECORDS_TO_SHOW.value, OPTIONS_MONEDA.DOLARES, OPTIONS_STATES_REPORTS.Facturado)
      DATA_TABLE.value = data
      TOTAL_PAGES.value= total_pages
      DATA_TABLE.value = data
      TOTAL_PAGES.value= total_pages
    }
    if(payTypeState.value === 'DIVISAS' && reportTypeState.value === 'RECHAZADOS'){
      tableType.value = 'Divisas/Rechazados'
      dataTable.value = REPORTS_DIVISAS_RECHAZADOS
      columnsItems.value = COLUMNS_BY_TYPE['Divisas/Rechazados']
      const {data, total_pages} =  await handleDataTable(1, RECORDS_TO_SHOW.value, OPTIONS_MONEDA.DOLARES, OPTIONS_STATES_REPORTS.Rechazado)
      DATA_TABLE.value = data
      TOTAL_PAGES.value= total_pages
    }
    if(payTypeState.value === 'DIVISAS' && reportTypeState.value === 'POR VERIFICAR'){
      tableType.value = 'Divisas/Por verificar'
      dataTable.value = REPORTS_POR_VERIFICAR
      columnsItems.value = COLUMNS_BY_TYPE['Divisas/Por Verificar']
      const {data, total_pages} =  await handleDataTable(1, RECORDS_TO_SHOW.value, OPTIONS_MONEDA.DOLARES, OPTIONS_STATES_REPORTS.Facturado)
      DATA_TABLE.value = data
      TOTAL_PAGES.value= total_pages 
    }

    changeUrl()

    
  })


 onMounted(async () => {
  const {data, total_pages} = await initialDataTable(1, RECORDS_TO_SHOW.value)
  DATA_TABLE.value = data
  TOTAL_PAGES.value= total_pages
})

</script>

<template>
  <header class="d-flex flex-column align-center pa-2 ga-2">
    <h1 class="text-h3 box-filters-move">Reportes de Pagos</h1>

    <span class="text-h4">{{tableType}}</span>
  </header>
      <Form
        :haveIChangeDirectionOrderBy="haveIChangeDirectionOrderBy"
        :columnsItems="columnsItems"
        @isChangeDirectionOrderBy="isChangeDirectionOrderBy"
        v-model:selectedColumns="columnsToFilter"
        v-model:valueInputShow="RECORDS_TO_SHOW"
        v-model:typeReport="typeReport"
        v-model:transactionsValues="transactions"
        v-model:searchValue="searchValue"
        v-model:selectedOrders="orderBy"
        v-model:payTypeValue="payTypeState"
        v-model:tyeReportsValue="reportTypeState"
      />

      <section>
        <TableFacturados
          :indexState="RECORDS_TO_SHOW"
          :columns="columnsToFilter"
          :typeTable="tableType"
          :dataTable="DATA_TABLE"
          :columnsHeaders="columnsItems"
          :order-by="orderBy"
          :haveIChangeDirectionOrderBy="haveIChangeDirectionOrderBy"
          :transactions="transactions"
          :searchValue="searchValue"
          :typeReport="typeReport"
          :reciveTotalPages="TOTAL_PAGES"
        />
      </section> 
</template>