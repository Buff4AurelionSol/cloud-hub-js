<script setup>


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
  const CURRENT_PAGE = ref(1)
  const DATE_REF = ref({
    fecha_ini: "",
    fecha_fin: ""
  })
  const LOADING = ref(false)

  const {
      getReportesPaginados, 
      getReportPaginadosTipoReporteMoneda, 
      getReportOrderBy,
      getReportByType,
      getReportByDate

    } = useReportesServices()


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
    LOADING.value = true
    try {
      const response = await getReportPaginadosTipoReporteMoneda(page, perPage, moneda, estado)
      const {data, total_pages} = response
      return {data, total_pages}

    } catch (error) {
      console.error("Error al obtener reportes:", error)
    }finally{
      LOADING.value = false
    }
  }

  const getBaseDataTable = async(page, perPage) => {
     try {
      const response = await getReportesPaginados(page, perPage)
      const {data, total_pages} = response
      
   
      return {data, total_pages}

    } catch (error) {
      console.error("Error al obtener reportes:", error)
    }
    

  }
   
watchEffect(async () => {
  const currentConfig = configMap[payTypeState.value]?.[reportTypeState.value]

  if (!currentConfig) return

  LOADING.value = true

  try {
    tableType.value = currentConfig.tableType
    dataTable.value = currentConfig.report
    columnsItems.value = currentConfig.columns

    const { data, total_pages } = await handleDataTable(
      1,
      RECORDS_TO_SHOW.value,
      OPTIONS_MONEDA[payTypeState.value],
      currentConfig.estado
    )

    DATA_TABLE.value = data
    TOTAL_PAGES.value = total_pages

    changeUrl()
  } catch (err) {
    console.error(err)
  } finally {
    LOADING.value = false
  }
})


  onMounted(async () => {
    LOADING.value = true
    try{
      const {data, total_pages} = await getBaseDataTable(1, RECORDS_TO_SHOW.value)
      DATA_TABLE.value = data
      TOTAL_PAGES.value= total_pages
    }finally{
      LOADING.value = false

    }
  })

  watch(CURRENT_PAGE, async () => {
    LOADING.value = true
    try{
      const {data, total_pages} = await getBaseDataTable(CURRENT_PAGE.value, RECORDS_TO_SHOW.value)
      DATA_TABLE.value = data;
      TOTAL_PAGES.value = total_pages
    }finally{
      LOADING.value = true
    }
  })

  watch(orderBy, async()=>{
    LOADING.value = true
    try{
      const {data, total_pages} = await getReportOrderBy(CURRENT_PAGE.value, RECORDS_TO_SHOW.value, VALUES_ORDER_VALUES[orderBy.value])
      DATA_TABLE.value = data;
      TOTAL_PAGES.value = total_pages;
    }finally{
      LOADING.value = false
    }
  })

  watch(typeReport, async() => {
    if(typeReport.value.length > 1 || typeReport.value.length <= 0){
      return
    }
    
    let valueReport = typeReport.value[0]
    LOADING.value = true
    try{  
      const {data, total_pages} = await getReportByType(CURRENT_PAGE.value, RECORDS_TO_SHOW.value, valueReport)
      DATA_TABLE.value = data;
      TOTAL_PAGES.value = total_pages;
    }finally{
      LOADING.value = false
    }
  })

  watch(DATE_REF.value, async()=>{
    LOADING.value = true
    try{
      const {data, total_pages} = await getReportByDate(CURRENT_PAGE.value, RECORDS_TO_SHOW.value, DATE_REF.value.fecha_ini, DATE_REF.value.fecha_fin)
      DATA_TABLE.value = data;
      TOTAL_PAGES.value = total_pages;
    }finally{
      LOADING.value = false
    }
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
        v-model:dateValue="DATE_REF"
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
          v-model:valueCurrentPage="CURRENT_PAGE"
          :loading="LOADING"
        />
      </section> 
</template>