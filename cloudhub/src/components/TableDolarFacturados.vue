<script setup>

  import DetailsIcon from '@/pics/visible.png'
  
    const props = defineProps({
      indexState:{
        type: Number,
      },
      filters:{
        type: Array,
        default: () => []
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
      }
    })

   const CONFIG_TRANSACCTION = ['id', 'referencia','pago_proveedor',
      'banco_destino', 'banco_origen', 'tasa_id', 'tasa', 'tipo', 'monto', 'monto_usd',
      'fecha', 'moneda', 'depositante', 'comprobante', 'id_comprobante'
    ]

   const CONFIG_CONTRACTS = ['nombre', 'contrato', 'rif', 'estado']

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
      
      let data = REPORTS_DOLAR.filter((report, i) => {
        const transactionMatch = props.transactions.length === 0 || props.transactions.includes('TODOS') || 
          props.transactions.includes( report.transaccions.find(e => e.tipo !== undefined)?.tipo);
  
        const searchMatch = !props.searchValue || searchInObject(report, props.searchValue.toLowerCase())

        return transactionMatch && searchMatch; 
      } 
       );
       
      

      let sortedData;
      
      switch (props.orderBy) {
        case 'Por defecto':
          sortedData = data;
          break;
        case 'Referencia':
          sortedData = [...data].sort((a, b) => parseInt(a.transaccions[0].referencia) - parseInt(b.transaccions[0].referencia) ) 
          break;
        case 'Monto Bs':
          sortedData = [...data].sort((a,b) => parseInt(a.transaccions[0].monto) - parseInt(b.transaccions[0].monto));
          break;
        case 'Contrato':
          sortedData = [...data].sort((a,b)=> parseInt(a.contratos[0].contrato) - parseInt(b.contratos[0].contrato));
          break;
        case 'Cliente':
          sortedData = [...data].sort((a,b) => a.contratos[0].nombre.localeCompare(b.contratos[0].nombre));
          break;
        case 'Rif/Cedula':
          sortedData = [...data].sort((a,b) => parseInt(a.contratos[0].rif) - parseInt(b.contratos[0].rif) );
          break;
        case 'Banco destino':
          sortedData = [...data].sort((a,b) => a.transaccions[0].banco_destino.localeCompare(b.transaccions[0].banco_destino));
          break;
        case 'Banco origen':
          sortedData = [...data].sort((a,b) => a.transaccions[0].banco_origen.localeCompare(b.transaccions[0].banco_origen));
          break;
        default:
          sortedData = data;
      }

      return props.haveIChangeDirectionOrderBy ? [...sortedData].reverse(): sortedData;
      
    });

    
    const CONFIG_COLUMN = [
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
    ]

    const isATransactionOption = (data) => {
       return CONFIG_TRANSACCTION.includes(data)
    }

    const isAContractOption = (data) => {
      return CONFIG_CONTRACTS.includes(data)
    }

  

    const recordsToShow = computed(() => 
      sortedAndFilteredData.value.slice(0, props.indexState)
    );

    const VISIBLE_COLUMNS = computed(()=> CONFIG_COLUMN.filter(column => !props.columns.includes(column.label) && column.key !== 'monto'))

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
                {{ report.transaccions.find((e)=> e[column.key] !== undefined)?.[column.key]}}
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
        <button @click="filterCampsTable">si</button>
      </footer>

  
  </div>  
</template>

<style scoped>
  
  td{
    font-size: small;
  }

  .table-container {
    padding: 10px;
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
</style>
