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

    const totalPages = computed(() => Math.ceil(tableData.value.length / rowsPerPage.value))

    const sortedAndFilteredData = computed(()=>{
      
      let DATA = tableData.value;
      
      let sortedData = DATA; 

     

      return props.haveIChangeDirectionOrderBy ? [...sortedData].reverse(): sortedData;
    })
   


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
