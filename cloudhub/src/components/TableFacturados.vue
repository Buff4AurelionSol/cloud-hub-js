<script setup>

    import DetailsIcon from '@/pics/visible.png'
    const modelPage = defineModel('valueCurrentPage')

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
        },
        reciveTotalPages:{
          type: Number
        },
        loading: {
          type: Boolean
        }
    })

    
    //FUNCIÓN PARA SOLO MOSTRAR HEADERS PERTINENTES DE CADA TABLE DINÀMICAMENTE
    const VISIBLE_COLUMN = computed(() => {
      return COLUMNS_HEADERS.value.filter((col) => !props.columns.includes(col.value));
    });



    //Funcionalidades del Renderizado 
    const tableData = computed(() => props.dataTable)
    
    const COLUMNS_HEADERS = computed(() => props.columnsHeaders)

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

    const PAGINATED_DATA = computed(() => sortedAndFilteredData.value);


    const TOTAL_PAGES = computed(() => props.reciveTotalPages)

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


    const sortedAndFilteredData = computed(() => {
      
      let DATA = [...tableData.value];
    
      const filteredBySearch = getDataSerchFiltered([...DATA])
   
      return props.haveIChangeDirectionOrderBy
        ? [...filteredBySearch].reverse()
        : filteredBySearch;
    });

    const handleExport = () => {
      exportTable(PAGINATED_DATA.value, VISIBLE_COLUMN.value, formatedValue, props.typeTable);
    }



</script>

<template>
    <div class="w-100 d-flex justify-center mb-2">
      <v-btn variant="outlined" rounded="xl" @click="handleExport">Exportar a Excell</v-btn>
    </div>
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
        <template v-if="PAGINATED_DATA.length > 0 && loading === false">
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
        <template v-else-if="loading === true">
          <tr>
            <td :colspan="VISIBLE_COLUMN.length + 2">
              <v-skeleton-loader :elevation="3" color="secondary" type="article"></v-skeleton-loader>
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
        v-model="modelPage"
        :length="TOTAL_PAGES"
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
