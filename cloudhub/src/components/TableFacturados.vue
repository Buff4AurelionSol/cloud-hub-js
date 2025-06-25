<script setup>

    import DetailsIcon from '@/pics/visible.png'

    const props = defineProps({
        indexState: {
            type: Number
        }, 
        columns: {
            type: Array
        },
        typeTable:{
            type: String 
        },
        dataTable: {
            type: Object
        },
        columnsHeaders:{
          type: Array
        },
        orderBy:{
          type: String
        },
        haveIChangeDirectionOrderBy:{
          type: Boolean
        },
        transactions:{
          type: Array,
          default: () => []
        },
        searchValue:{
          type: String
        },
        typeReport:{
          type: Array,
          default: () => []
        }
    })

    

 
    //Funcionalidades del Renderizado 
    const tableData = computed(() => props.dataTable)
    
    const COLUMNS_HEADERS = computed(() => props.columnsHeaders)

    const VISIBLE_COLUMN = computed(() => {
      return COLUMNS_HEADERS.value.filter((col) => !props.columns.includes(col.value));
    });


    const formatedValue = (data, pathKey) => {
        return pathKey.split(".").reduce((currentValue, key)=>{
          if(Array.isArray(currentValue)){
            currentValue = currentValue[0];
          }

          if(currentValue?.[key] === null || currentValue?.[key]  === ''){
            return 'NO DATA'
          }

          return currentValue?.[key] 

        },data)
    }

    //Funcionalidades del paginado
    const rowsPerPage = computed(()=> props.indexState)
    const currentPage = ref(1)

    const PAGINATED_DATA = computed(() => {
      const start = (currentPage.value - 1) * rowsPerPage.value
      const end = start + rowsPerPage.value
      return sortedAndFilteredData.value.slice(start, end)
    })

    const totalPages = computed(() => Math.ceil(sortedAndFilteredData.value.length / rowsPerPage.value))

    const getDataTransactionFiltered = (DATA) => {
        return DATA.filter(item => {
          if (props.transactions.length <= 0 || props.transactions.includes('TODOS')) {
            return true;
          }

            return item.transaccions.some(trans => props.transactions.includes(trans.tipo));
        });
    }

    const getTypeReportFiltered = (DATA) => {
      return DATA.filter(item =>{
        if(props.typeReport.length <= 0){
          return true
        }
        return props.typeReport.includes(item.tipo_reporte)

      })

    }

    const getDataSerchFiltered = (DATA) => {
      return DATA.filter(item => {
          if (!props.searchValue) return true;

          const search = props.searchValue.toLowerCase().trim();

          // Unimos todos los valores visibles en una sola cadena
          const combinedText = props.columnsHeaders.map(col => {
              const value = formatedValue(item, col.title);
              return typeof value === 'string' || typeof value === 'number'
                ? String(value).toLowerCase()
                : ''; 
            })
            .join(' ');

            console.log(item, "y el combined text es:::: ", combinedText )

          return combinedText.includes(search);
        });
    }

    const getDataOrderBy = (DATA) => {
      let dataOrderBy; 
      switch (props.orderBy) {
        case 'Por defecto':
          dataOrderBy = DATA;
          break;
        case 'Referencia':
          dataOrderBy = [...DATA].sort((a, b) => parseInt(a.transaccions[0].referencia) - parseInt(b.transaccions[0].referencia) ) 
          break;
        case 'Monto Bs':
          dataOrderBy = [...DATA].sort((a,b) => parseInt(a.transaccions[0].monto) - parseInt(b.transaccions[0].monto));
          break;
        case 'Contrato':
          dataOrderBy = [...DATA].sort((a,b)=> parseInt(a.contratos[0].contrato) - parseInt(b.contratos[0].contrato));
          break;
        case 'Cliente':
          dataOrderBy = [...DATA].sort((a,b) => a.contratos[0].nombre.localeCompare(b.contratos[0].nombre));
          break;
        case 'Rif/Cedula':
          dataOrderBy = [...DATA].sort((a,b) => parseInt(a.contratos[0].rif) - parseInt(b.contratos[0].rif) );
          break;
        case 'Banco destino':
          dataOrderBy = [...DATA].sort((a,b) => a.transaccions[0].banco_destino.localeCompare(b.transaccions[0].banco_destino));
          break;
        case 'Banco origen':
          dataOrderBy = [...DATA].sort((a,b) => a.transaccions[0].banco_origen.localeCompare(b.transaccions[0].banco_origen));
          break;
        default:
          dataOrderBy = DATA;
      }

      return dataOrderBy;

    }

    const sortedAndFilteredData = computed(() => {
      
      let DATA = tableData.value;
      const filtereTransaction = getDataTransactionFiltered([...DATA]);
      const filteredBySearch = getDataSerchFiltered([...filtereTransaction])
      const filteredOrderBy = getDataOrderBy([...filteredBySearch]);
      const filteredTypeReport = getTypeReportFiltered([...filteredOrderBy])

      return props.haveIChangeDirectionOrderBy
        ? [...filteredTypeReport].reverse()
        : filteredTypeReport;
    });


</script>

<template>
    <v-table class="table-container box-filters-fade rounded-xl">
      <thead>
        <tr>
          <th>#</th>
          <template v-for="head in VISIBLE_COLUMN"  :key="head.title">
             <th>{{ head.value }}</th>
          </template>
          <th>Ver detalles</th>
        </tr>
      </thead>

      <tbody>
        <template v-if="PAGINATED_DATA.length > 0">
          <tr v-for="(report, index) in PAGINATED_DATA" :key="index">
            <td>{{ index + 1 }}</td>

            <td v-for="col in VISIBLE_COLUMN" :key="col.title">
                <template v-if=" Array.isArray(formatedValue(report, col.title))">
                    {{ formatedValue(report, col.title).join("") }}
                </template>
            
                <template v-else>
                  {{ formatedValue(report, col.title) }}
                </template>
                
            </td>

            <td>
              <Modal :image-icon="DetailsIcon" :reportData="report" />
            </td>
          </tr>
        </template>
        <template v-else>
           <tr>
              <td :colspan="VISIBLE_COLUMN.length + 2" class="text-center text-h6 pa-5">
                No se han encontrado coincidencias
              </td>
           </tr>
        </template>
        
      </tbody>
    </v-table>
    <div class="d-flex justify-end align-center mt-4">
      <v-pagination
        v-model="currentPage"
        :length="totalPages"
        :total-visible="indexState"
        color="primary"
      />
    </div>
</template>



<style>
  
  td{
    font-size: small;
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
