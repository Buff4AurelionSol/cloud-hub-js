<script setup>
  import {REPORTS_DOLLAR} from '@/stores/const' 
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
      let data = REPORTS_DOLLAR.slice(0, props.indexState).filter(report => {
        const transactionMatch = props.transactions.length === 0 || props.transactions.includes('TODOS') || 
          props.transactions.includes(report.transactionType);
        
        const searchMatch = !props.searchValue || 
          Object.values(REPORTS_DOLLAR).some(value => 
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

    const thereAreRegisters = computed(()=> sortedAndFilteredData.value.length > 0)

</script>

<template>
  <div class="table-container">
    <v-table v-if="thereAreRegisters" fixed-header>
      <thead>
        <tr>
          <th>#</th>
          <th>ID</th>
          <th>REFERENCIA BANCARIA</th>
          <th>TIPO REPORTE</th>
          <th>TIPO TRANSACCIÓN</th>
          <th>MONTO ($)</th>
          <th>TASA</th>
          <th>CONTRATO(s)</th>
          <th>FACTURA(s)</th>
          <th>Fecha Facturado(s)</th>
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
            <td>{{ report.bankRef }}</td>
            <td>{{ report.type }}</td>
            <td>{{ report.amount }}</td>
            <td>{{ report.rate }}</td>
            <td>{{ report.contracts }}</td>
            <td>{{ report.invoices }}</td>  
            <td>{{ report.billingDate }}</td>
            <td>{{ report.client }}</td>
            <td>{{ report.idNumber }}</td>
            <td>{{ report.bankDest }}</td>
            <td>{{ report.bankOrigin }}</td>
            <td>{{ report.transactionType }}</td>
            <td>{{ report.transactionDate }}</td>
            <td>{{ report.reportDate }}</td>
            <Modal :imageIcon="DetailsIcon" 
              :reportsDate="report.reportDate"
            />
        </tr>
      </tbody>
    </v-table>
      <div v-else class="not-found">
            <h2>No se encontraron registros</h2>
      </div>
      <footer>
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
