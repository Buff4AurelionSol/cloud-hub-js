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
      let data = reports.slice(0, props.indexState).filter(report => {
        const transactionMatch = props.transactions.length === 0 || props.transactions.includes('TODOS') || 
          props.transactions.includes(report.tipoTransaccion);
        
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
          sortedData = [...data].sort((a, b) => a.referencia.localeCompare(b.referencia));
          break;
        case 'Monto Bs':
          sortedData = [...data].sort((a,b) => a.montoTransaccionBs - b.montoTransaccionBs);
          break;
        case 'Contrato':
          sortedData = [...data].sort((a,b)=> a.contratos - b.contratos);
          break;
        case 'Cliente':
          sortedData = [...data].sort((a,b) => a.cliente.localeCompare(b.cliente));
          break;
        case 'Rif/Cedula':
          sortedData = [...data].sort((a,b) => a.rifCedula - b.rifCedula);
          break;
        case 'Banco destino':
          sortedData = [...data].sort((a,b) => a.bancoDestino.localeCompare(b.bancoDestino));
          break;
        case 'Banco origen':
          sortedData = [...data].sort((a,b) => a.bancoOrigen.localeCompare(b.bancoOrigen));
          break;
        default:
          sortedData = data;
      }

      return props.haveIChangeDirectionOrderBy ? [...sortedData].reverse(): sortedData;
      
    });

    const CONFIG_COLUMN = [
      {key:'id', label:'ID'},
      {key:'estado', label:'ESTADO'},
      {key:'referencia', label:"REFERENCIA"},
      {key:'tipoReporte',label:'TIPO REPORTE'},
      {key:'tipoTransaccion', label:'TIPO TRANSACCIÓN'},
      {key:'montoTransaccionBs', label:'MONTO TRANSACCIÓN'},
      {key:'montoUSD', label:'MONTO USD'},
      {key:'tasa', label:'TASA'},
      {key:'contratos', label:'CONTRATOS'},
      {key:'cliente', label:'CLIENTE'},
      {key:'rifCedula', label:'RIF/CEDULA'},
      {key:'bancoOrigen', label:'BANCO ORIGEN'},
      {key:'bancoDestino', label:'BANCO DESTINO'},
      {key:'fechaTransaccion', label:'FECHA TRANSACCIÓN'},
      {key:'fechaReporte', label:'FECHA REPORTE'}
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
          <th v-for="column in VISIBLE_COLUMNS" :key="column.key">{{column.label}}</th>
          <th>Ver detalles</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(report, index) in sortedAndFilteredData" :key="index">
            <td>{{ index + 1 }}</td>
            <td v-for="column in VISIBLE_COLUMNS" :key="column.key">{{report[column.key]}}</td>
            <Modal :imageIcon="DetailsIcon" 
              :reportsDate="report.fechaReporte"
            />
        </tr>
      </tbody>
    </v-table>
      <div v-else class="not-found">
            <h2>No se encontraron registros</h2>
      </div>
      <footer class="pt-2">
       <v-btn variant="outlined" @click="handleExport">Exportar</v-btn>

        Total de registros: {{reports.length}}
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
