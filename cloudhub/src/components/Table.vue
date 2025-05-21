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
      let data = AWAS.slice(0, props.indexState).filter(report => {
        const transactionMatch = props.transactions.length === 0 || props.transactions.includes('TODOS') || 
          props.transactions.includes(report.transaccions.tipo);
        
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
          sortedData = [...data].sort((a,b) => a.transaccions[monto] - b.transaccions[monto]);
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

    const CONFIG_TRANSACCTION = ['id', 'referencia','pago_proveedor',
      'banco_destino', 'banco_origen', 'tasa_id', 'tasa', 'tipo', 'monto', 'monto_usd',
      'fecha', 'moneda', 'depositante', 'comprobante', 'id_comprobante'
    ]

    const CONFIG_CONTRACTS = ['nombre', 'contrato', 'rif', 'estado']


    const isATransactionOption = (data) => {
       return CONFIG_TRANSACCTION.includes(data)
    }

    const isAContractOption = (data) => {
      return CONFIG_CONTRACTS.includes(data)
    }

    const VISIBLE_COLUMNS = computed(()=> CONFIG_COLUMN.filter(column => !props.columns.includes(column.label)))

    const thereAreRegisters = computed(()=> sortedAndFilteredData.value.length > 0)

</script>

<template>
  <div class="table-container box-filters-fade">
    <v-table v-if="thereAreRegisters" fixed-header>
      <thead>
        <tr>
          <th>#</th>
          <th v-for="column in VISIBLE_COLUMNS" :key="column.key">{{column.label}}</th>
          <th>Ver detalles</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(report, index) in sortedAndFilteredData" :key="report.id">
            <td>{{ index + 1 }}</td>
        
            <td v-for="column in VISIBLE_COLUMNS" :key="column.key">
              <div v-for="(item, index) in report[column.key]" v-if="column.key === 'contratos'">
                <v-chip  variant="flat" size="small" color="blue">
                   {{item.contrato }}
                </v-chip>
              </div>

              <td v-if="isATransactionOption(column.key)" >
                {{ report.transaccions.find((e)=> e[column.key] !== undefined )?.[column.key]}}
              </td>
              <td v-else-if="isAContractOption(column.key)" >
                {{ report.contratos.find((e)=> e[column.key] !== undefined )?.[column.key]}}
              </td>
              <template v-else>
                {{report[column.key]}}
              </template>
            </td>
            <td>
              <Modal
                :image-icon="DetailsIcon"
                :reportsDate="report.created_at"
              /> 
            </td>
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
