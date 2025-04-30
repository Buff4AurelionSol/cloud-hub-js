<script setup>
  import {reports} from '@/stores/const' 
  import DetailsIcon from '@/pics/visible.png'
  import {exportTable} from '@/modules/exportToExcell.js'

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
    
    function handleExport() {
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

      return props.haveIChangeDirectionOrderBy ? [...sortedData].reverse() : sortedData;
      
    });


    const thereAreRegisters = computed(()=> sortedAndFilteredData.value.length > 0)

</script>

<template>
  <div class="table-container">
    <v-table v-if="thereAreRegisters" fixed-header>
      <thead>
        <tr>
          <th>#</th>
          <th v-if="!props.columns.includes('ID')">ID</th>
          <th v-if="!props.columns.includes('ESTADO')">ESTADO</th>
          <th v-if="!props.columns.includes('REFERENCIA')">REFERENCIA</th>
          <th v-if="!props.columns.includes('TIPO REPORTE')">TIPO REPORTE</th>
          <th v-if="!props.columns.includes('TIPO TRANSACCIÓN')">TIPO TRANSACCIÓN</th>
          <th v-if="!props.columns.includes('MONTO TRANSACCIÓN')">MONTO TRANSACCIÓN</th>
          <th v-if="!props.columns.includes('MONTO USD')">MONTO USD</th>
          <th v-if="!props.columns.includes('TASA')">TASA</th>
          <th v-if="!props.columns.includes('CONTRATOS')">CONTRATOS</th>
          <th v-if="!props.columns.includes('CLIENTE')">CLIENTE</th>
          <th v-if="!props.columns.includes('RIF/CEDULA')">RIF/CEDULA</th>
          <th v-if="!props.columns.includes('BANCO ORIGEN')">BANCO ORIGEN</th>
          <th v-if="!props.columns.includes('BANCO DESTINO')">BANCO DESTINO</th>
          <th v-if="!props.columns.includes('FECHA TRANSACCIÓN')">FECHA TRANSACCIÓN</th>
          <th v-if="!props.columns.includes('FECHA REPORTE')">FECHA REPORTE</th>
          <th>Ver detalles</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(report, index) in sortedAndFilteredData" :key="index">
            <td>{{ index + 1 }}</td>
            <td v-if="!props.columns.includes('ID')">{{ report.id }}</td>
            <td v-if="!props.columns.includes('ESTADO')">{{ report.estado }}</td>
            <td v-if="!props.columns.includes('REFERENCIA')">{{ report.referencia }}</td>
            <td v-if="!props.columns.includes('TIPO REPORTE')">{{ report.tipoReporte }}</td>
            <td v-if="!props.columns.includes('TIPO TRANSACCIÓN')">{{ report.tipoTransaccion }}</td>
            <td v-if="!props.columns.includes('MONTO TRANSACCIÓN')">{{ report.montoTransaccionBs }}</td>
            <td v-if="!props.columns.includes('MONTO USD')">{{ report.montoUSD }}</td>  
            <td v-if="!props.columns.includes('TASA')">{{ report.tasa }}</td>
            <td v-if="!props.columns.includes('CONTRATOS')">{{ report.contratos }}</td>
            <td v-if="!props.columns.includes('CLIENTE')">{{ report.cliente }}</td>
            <td v-if="!props.columns.includes('RIF/CEDULA')">{{ report.rifCedula }}</td>
            <td v-if="!props.columns.includes('BANCO ORIGEN')">{{ report.bancoOrigen }}</td>
            <td v-if="!props.columns.includes('BANCO DESTINO')">{{ report.bancoDestino }}</td>
            <td v-if="!props.columns.includes('FECHA TRANSACCIÓN')">{{ report.fechaTransaccion }}</td>
            <td v-if="!props.columns.includes('FECHA REPORTE')">{{ report.fechaReporte }}</td>
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
