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

    const handleExport = () => {
      const fileName = prompt('Introduce el nombre del archivo Excel:', 'Reporte');
      if (!fileName) return; 
      exportTable(sortedAndFilteredData.value, fileName);
    }
    
    const sortedAndFilteredData = computed(() => {
      let data = REPORTS_DOLLAR.slice(0, props.indexState).filter(report => {
        const transactionMatch = props.transactions.length === 0 || props.transactions.includes('TODOS') || 
          props.transactions.includes(report.transactionType);
        
        const searchMatch = !props.searchValue || 
          Object.values(report).some(value => 
            String(value).toLowerCase().includes(props.searchValue.toLocaleLowerCase())
          )
          return transactionMatch && searchMatch;
      } 
       );
      
      

      let sortedData;
      
      switch (props.orderBy) {
        case 'Por defecto':
          sortedData = data;
          break;
        case 'Referencia':
          sortedData = [...data].sort((a, b) => a.bankRef.localeCompare(b.bankRef));
          break;
        case 'Monto Bs':
          sortedData = [...data].sort((a,b) => a.amount - b.amount);
          break;
        case 'Contrato':
          sortedData = [...data].sort((a,b)=> a.contracts - b.contracts);
          break;
        case 'Cliente':
          sortedData = [...data].sort((a,b) => a.client.localeCompare(b.client));
          break;
        case 'Rif/Cedula':
          sortedData = [...data].sort((a,b) => a.idNumber - b.idNumber);
          break;
        case 'Banco destino':
          sortedData = [...data].sort((a,b) => a.bankDest.localeCompare(b.bankDest));
          break;
        case 'Banco origen':
          sortedData = [...data].sort((a,b) => a.bankOrigin.localeCompare(b.bankOrigin));
          break;
        default:
          sortedData = data;
      }

      return props.haveIChangeDirectionOrderBy ? [...sortedData].reverse() : sortedData;
      
    });

    
    const CONFIG_COLUMN = [
      {key:'id', label:'ID'},
      {key:'bankRef', label:'REFERENCIA BANCARIA'},
      {key:'type', label:'TIPO REPORTE'},
      {key:'transactionType', label:'TIPO TRANSACCIÓN'},
      {key:'amount', label:'MONTO ($)'},
      {key:'rate', label:'TASA'},
      {key:'contracts', label:'CONTRATO(S)'},
      {key:'invoices', label:'FACTURA(S)'},
      {key:'billingDate', label:'FECHA FACTURADO(S)'},
      {key:'client', label:'CLIENTE'},
      {key:'idNumber', label:'RIF/CEDULA'},
      {key:'bankDest', label:'BANCO ORIGEN'},
      {key:'bankOrigin', label:'BANCO DESTINO'},
      {key:'transactionDate', label:'FECHA TRANSACCIÓN'},
      {key:'reportDate', label:'FECHA REPORTE'}
    ]

    const VISIBLE_COLUMNS = computed(()=> CONFIG_COLUMN.filter(column => !props.columns.includes(column.label)))

    const thereAreRegisters = computed(()=> sortedAndFilteredData.value.length > 0)

</script>

<template>
  <div class="table-container">
    <v-table v-if="thereAreRegisters" fixed-header>
      <thead>
        <tr>
          <th>#</th>
          <th v-for="column in VISIBLE_COLUMNS">{{column.label}}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(report, index) in sortedAndFilteredData" :key="index">
            <td>{{ index + 1 }}</td>
            <td v-for="column in VISIBLE_COLUMNS" :key="column.key" >
              <div v-for="(item, index) in report[column.key]" v-if="column.key === 'contracts' || column.key === 'invoices'" class="d-flex justify-center gap-2 mt-2" >
                <v-chip variant="flat" size="small" color="blue">
                  {{item}}
                </v-chip>
              </div>
              <template v-else>
                {{report[column.key]}}
              </template>
            </td>
        </tr>
      </tbody>
    </v-table>
      <div v-else class="not-found">
            <h2>No se encontraron registros</h2>
      </div>
      <footer class="pt-2">
        <v-btn variant="outlined" @click="handleExport">Exportar</v-btn>
        Total de registros: {{REPORTS_DOLLAR.length}}
      </footer>
  </div>  
</template>

<style>
  
  td{
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
</style>
