<script setup>
  import {reports} from '@/stores/const' 
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
      }
    })
    
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
          <th>ID</th>
          <th>ESTADO</th>
          <th>REFERENCIA</th>
          <th>TIPO REPORTE</th>
          <th>TIPO TRANSACCIÓN</th>
          <th>MONTO TRANSACCIÓN</th>
          <th>MONTO USD</th>
          <th>TASA</th>
          <th>CONTRATOS</th>
          <th>CLIENTE</th>
          <th>RIF/CEDULA</th>
          <th>BANCO ORIGEN</th>
          <th>BANCO DESTINO</th>
          <th>FECHA TRANSACCIÓN</th>
          <th>FECHA REPORTE</th>
          <th>Ver detalles</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(report, index) in sortedAndFilteredData" :key="index">
            <td>{{ index + 1 }}</td>
            <td>{{ report.id }}</td>
            <td>{{ report.estado }}</td>
            <td>{{ report.referencia }}</td>
            <td>{{ report.tipoReporte }}</td>
            <td>{{ report.tipoTransaccion }}</td>
            <td>{{ report.montoTransaccionBs }}</td>
            <td>{{ report.montoUSD }}</td>  
            <td>{{ report.tasa }}</td>
            <td>{{ report.contratos }}</td>
            <td>{{ report.cliente }}</td>
            <td>{{ report.rifCedula }}</td>
            <td>{{ report.bancoOrigen }}</td>
            <td>{{ report.bancoDestino }}</td>
            <td>{{ report.fechaTransaccion }}</td>
            <td>{{ report.fechaReporte }}</td>
            <Modal :imageIcon="DetailsIcon" 
              :reportsDate="report.fechaReporte"
            />
        </tr>
      </tbody>
    </v-table>
      <div v-else class="not-found">
            <h2>No se encontraron registros</h2>
      </div>
      <footer>
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
