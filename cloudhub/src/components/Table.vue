<script setup>
  
  import DetailsIcon from '@/pics/visible.png'

    const props = defineProps({
      indexState:{
        type: Number,
      },
      transactions:{
        type: Array,
        default: () => []
      },
      orderBy:{
        type: String
      },
      haveIChangeDirectionOrderBy:{
        type: Boolean
      },
      searchValue:{
        type: String
      },
      columns:{
        type: Array
      },
      type: {
        type: String
      }
    })

    const CONFIG_TRANSACCTION = ['id', 'referencia','pago_proveedor',
      'banco_destino', 'banco_origen', 'tasa_id', 'tasa', 'tipo', 'monto', 'monto_usd',
      'fecha', 'moneda', 'depositante', 'comprobante', 'id_comprobante'
    ]

    const CONFIG_CONTRACTS = ['nombre', 'contrato', 'rif', 'estado']

        const CONFIG_HEADERS = {
          'Por facturar': [
              {key:'id', label:'ID'},
              {key:'reporte_estado', label:'ESTADO'},
              {key:'referencia', label:"REFERENCIA"},
              {key:'tipo_reporte',label:'TIPO REPORTE'},
              {key:'tipo', label:'TIPO TRANSACCIÓN'},
              {key:'monto', label:'MONTO TRANSACCIÓN'},
              {key:'monto_usd', label:'MONTO USD'},
              {key:'tasa', label:'TASA'},
              {key:'contrato', label:'CONTRATOS'},
              {key:'nombre', label:'CLIENTE'},
              {key:'rif', label:'RIF/CEDULA'},
              {key:'banco_origen', label:'BANCO ORIGEN'},
              {key:'banco_destino', label:'BANCO DESTINO'},
              {key:'fecha', label:'FECHA TRANSACCIÓN'},
              {key:'created_at', label:'FECHA REPORTE'}
            ],
          'Divisas/Facturados':[
            {key:'id', label:'ID'},
            {key:'referencia',label:'REFERENCIA'},
            {key:'tipo_reporte',label:'TIPO REPORTE'},
            {key:'monto', label:'MONTO TRANSACCIÓN'},
            {key:'monto_usd',label:'MONTO USD'},
            {key:'tasa',label:'TASA'},
            {key:'contrato',label:'CONTRATO(S)'},
            {key:'facturas',label:'FACTURAS'},
            {key:'fecha', label: 'FECHA FACTURADO(S)'},
            {key:'nombre', label: 'CLIENTE'},
            {key:'rif', label:'RIF/CÉDULA'},
            {key:'banco_destino', label:'BANCO DESTINO'},
            {key:'banco_origen', label:'BANCO ORIGEN'},
            {key:'tipo', label:'TIPO TRANSACCIÓN'},
            {key:'fecha', label:'FECHA TRANSACCIÓN'},
            {key:'created_at', label:'FECHA REPORTE'}
          ]
        }

   const searchInObject = (report, search) => {
      const BASE_FIELDS = ['id', 'reporte_estado', 'tipo_reporte', 'nota', 'total_usd', 'created_at'];
      
      //Se revisa primero los values base
      const baseMatch =  BASE_FIELDS.some(field => 
        String(report[field] || '').toLowerCase().includes(search)
      );

      //Sino, se revisa en el array de transacciones
      const transactionMatch = report?.transaccions.some(transaction => 
        CONFIG_TRANSACCTION.some(field =>
          String(transaction[field] || '').toLowerCase().includes(search)
        )
      )

      //Sino, se revisa en el array de contratos
      const contractMatch = report?.contratos.some( contract =>
        CONFIG_CONTRACTS.some(field =>
          String(contract[field] || '').toLowerCase().includes(search)
        ) 
      )

      return baseMatch || transactionMatch || contractMatch;
    

    }



    const handleExport = () => {
      const fileName = prompt('Introduce el nombre del archivo Excel:', 'Reporte');
      if (!fileName) return; 
      exportTable(sortedAndFilteredData.value, fileName);
    }
 
    const sortedAndFilteredData = computed(() => {
      let data = REPORTS.filter((report, i) => {
        const transactionMatch = props.transactions.length === 0 || props.transactions.includes('TODOS') || 
          props.transactions.includes( report.transaccions.find(e => e.tipo !== undefined)?.tipo);
  
        const searchMatch = !props.searchValue || searchInObject(report, props.searchValue.toLowerCase())

        return transactionMatch && searchMatch; 
      } 
       );
    

      const sortedData = toOrderBy(props.orderBy, data)
      
      return props.haveIChangeDirectionOrderBy ? [...sortedData].reverse(): sortedData;
      
    });


    const CELL_RENDER_TABLE_OPTIONS = {
      'Por facturar': ['id', 'reporte_estado', 'tipo_reporte', 'created_at', 
          {transaccions: ['id', 'referencia','pago_proveedor','banco_destino',
            'banco_origen','tasa', 'tipo','monto',
            'monto_usd','fecha', 'moneda','depositante', 
            'comprobante']},
          {contratos: ['nombre','contrato','rif','estado']}
      ]
    }

    const applyFiltersToRender = (tableType, sortedData) => {
      switch(tableType){
        case 'Bolivares/Por Facturar':
          return sortedData;
        case 'Bolivares/Pagos Rechazados':
          const dataWithoutReference = sortedData.map(item => ({
            ...item,
            transaccions: item.transaccions.map(({referencia, ...rest}) => rest)
          }))

          const dataWithoutReportState = dataWithoutReference.map(({reporte_estado, ...rest}) => rest)

          return dataWithoutReportState;

        case 'Divisas/Facturados':
          const dataWithoutMonto = sortedData.map(item => ({
            ...item,
            transaccions: item.transaccions.map(({monto, ...rest}) => rest)
          }))
          return dataWithoutMonto;
        default: 
          return sortedData; 
      }

    }

    const toOrderBy = (orderBy, data) => {
      let sortedData; 
       switch (orderBy) {
        case 'Por defecto':
          return sortedData = data;
        case 'Referencia':
          return sortedData = [...data].sort((a, b) => parseInt(a.transaccions[0].referencia) - parseInt(b.transaccions[0].referencia) ) 
        case 'Monto Bs':
          return sortedData = [...data].sort((a,b) => parseInt(a.transaccions[0].monto) - parseInt(b.transaccions[0].monto));
        case 'Contrato':
          return sortedData = [...data].sort((a,b)=> parseInt(a.contratos[0].contrato) - parseInt(b.contratos[0].contrato));
        case 'Cliente':
          return sortedData = [...data].sort((a,b) => a.contratos[0].nombre.localeCompare(b.contratos[0].nombre));
        case 'Rif/Cedula':
          return sortedData = [...data].sort((a,b) => parseInt(a.contratos[0].rif) - parseInt(b.contratos[0].rif) );
        case 'Banco destino':
          return sortedData = [...data].sort((a,b) => a.transaccions[0].banco_destino.localeCompare(b.transaccions[0].banco_destino));
        case 'Banco origen':
          return sortedData = [...data].sort((a,b) => a.transaccions[0].banco_origen.localeCompare(b.transaccions[0].banco_origen));
        default:
          return sortedData = data;
      }
    }

    const isATransactionOption = (data) => {
       return CONFIG_TRANSACCTION.includes(data)
    }

    const isAContractOption = (data) => {
      return CONFIG_CONTRACTS.includes(data)
    }

    const recordsToShow = computed(() => 
      sortedAndFilteredData.value.slice(0, props.indexState)
    );

   const VISIBLE_COLUMNS = computed(() => 
      (
        CONFIG_HEADERS[props.type] || []).filter(
        column => !props.columns.includes(column.label)
      )
    );

    const thereAreRegisters = computed(()=> recordsToShow.value.length > 0)

</script>

<template>  
  <div class="table-container box-filters-fade rounded-xl">
    <v-table v-if="thereAreRegisters" fixed-header>
      <thead>
        <tr>
          <th>#</th>
          <th v-for="column in VISIBLE_COLUMNS" :key="column.key">{{column.label}}</th>
          <th>Ver detalles</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(report, index) in recordsToShow" :key="report.id">
            <td>{{ index + 1 }}</td>
            <td v-for="(column, i) in VISIBLE_COLUMNS" :key="column.key">
              <template v-if="isATransactionOption(column.key)" >
                {{ report.transaccions.find((e)=> e[column.key] !== undefined )?.[column.key]}}
              </template>
              <template v-else-if="isAContractOption(column.key)" >
                {{ report.contratos.find((e)=> e[column.key] !== undefined )?.[column.key]}}
              </template>
              <template v-else>
                {{report[column.key]}}
              </template>
            </td>
            <td>
              <Modal
                :image-icon="DetailsIcon"
                :reportData="report"
              />
            </td>
           
        </tr>
      </tbody>
    </v-table>
      <div v-else class="not-found">
            <h2>No se encontraron registros</h2>
      </div>
      <footer class="pt-2">
       <v-btn variant="outlined" rounded="xl" @click="handleExport">Exportar</v-btn>
        Total de registros: {{recordsToShow.length}}
      </footer>

  
  </div>  
</template>

<style>
  
  td{
    font-size: small;
    white-space: nowrap;
  }

  th{
    font-size: small;
  }

  .table-container {
    padding: 20px;
    overflow-x: auto;
  }

  .box-icon{
    width: 30px;
    height: 30px;
  }

  .not-found{
    width: 100%;
    height: auto;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .box-filters-fade{
    animation: fade-down 2s normal;
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
