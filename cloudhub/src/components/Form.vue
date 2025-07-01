<script setup >
  import ExchangeIMG from '@/pics/exchangeIMG.png'
  import arrowVerticle from '@/pics/arrows-verticle.svg'



  const formRef = ref(null)
  const showFormState = ref(false)
   
  //MODELS
  const SELECTED_COLUMNS = defineModel('selectedColumns')
  const TYPE_REPORT = defineModel('typeReport')
  const TRANSACTIONS_VALUES = defineModel('transactionsValues')
  const SELECTED_ORDERS = defineModel('selectedOrders')
  const SEARCH_VALUE = defineModel('searchValue')
  const VALUES_INPUT_SHOW = defineModel('valueInputShow')
  const VALUES_TYPE_REPORT = defineModel('tyeReportsValue')
  const VALUES_PAY_TYPE = defineModel('payTypeValue')

  const emit = defineEmits(['isChangeDirectionOrderBy'])

  const props = defineProps({
    haveIChangeDirectionOrderBy:{
      type: Boolean
    },
    columnsItems: {
            type: Array
        }
  })

  const handleSubmit = (e) => {
    
    if(!formRef.value) return;
    
    const formData = new FormData(formRef.value)
    
    const data = Object.fromEntries(formData.entries()) 
    

  }



  const isChangeDirectionOrderBy = () => {
    emit('isChangeDirectionOrderBy')
  }


  watchEffect(()=>{
    handleSubmit()
  })

  const changeStateShowForm = () => {
    showFormState.value
      ? showFormState.value = false 
      : showFormState.value = true
  }


</script>

<template>
  <form ref="formRef" @input="handleSubmit" @change="handleSubmit">
    <v-container>
      <v-row cols="12" class="flex d-flex justify-center mb-2">
        <v-btn size="large" @click="changeStateShowForm" rounded="xl">
          {{showFormState ? "Cerrar filtros" : "Abrir filtros"}}
        </v-btn>
      </v-row>    
      <v-row :class="{ 'justify-center': !showFormState }">
        <v-col cols="12" md="6" v-if="showFormState":class="{'box-filters-fade': showFormState}">
          <SearchInput v-model:searchValue="SEARCH_VALUE"/> 
        </v-col>
        <v-col cols="12" md="6" :class="showFormState ? 'box-filters-fade': 'box-filters-move mb-2'">
          <PayType v-model:payTypeValue="VALUES_PAY_TYPE"/>
        </v-col>
        <v-row cols="12" md="6" class="mb-2">
            <TypeReport v-model:typeReportsValue="VALUES_TYPE_REPORT"/>
        </v-row>
      </v-row>

      <v-row v-if="showFormState">
        <v-col cols="12" md="3" :class="{'box-filters-fade': showFormState}">
          <DateInput name="fecha-1" label="Fecha de inicio"/>
        </v-col>
        <v-col cols="12" md="3" :class="{'box-filters-fade': showFormState}">
          <DateInput name="fecha-2" label="Fecha final"/>
        </v-col>
        <v-col cols="12" md="6" class="order-by-col" :class="{'box-filters-fade': showFormState}">
          <OrderByInput v-model:selectedOrders="SELECTED_ORDERS"/>
          <button 
            class="buttonExchange" 
            name="changeDirectionOrderByButton" 
            @click="isChangeDirectionOrderBy" 
            type="button"
          >
             <svg 
                fill="#000000" 
                viewBox="0 0 16 16" 
                xmlns="http://www.w3.org/2000/svg">
                <path 
                  d="M2 4H0l3-4 3 4H4v12H2V4zm12 8h2l-3 4-3-4h2V0h2v12z" 
                  fill-rule="evenodd"/>
            </svg>
          </button>
        </v-col>
      </v-row>

      <v-row v-if="showFormState">
        <v-col cols="6" :class="{'box-filters-fade': showFormState}">
          <ShowPaysInput v-model:valuesInputShow="VALUES_INPUT_SHOW"/>
        </v-col>
        <v-col cols="6" :class="{'box-filters-fade': showFormState}">
          <TransactionInput v-model="TRANSACTIONS_VALUES"/>
        </v-col>
      </v-row>

      <v-row v-if="showFormState" >
        <v-col cols="6" :class="{'box-filters-fade': showFormState}">
          <ColumnsFilter :columnsItems="columnsItems" v-model:selected="SELECTED_COLUMNS" />
        </v-col>
        <v-col :class="{'box-filters-fade': showFormState}">
          <TypeReportInput v-model:typeReport="TYPE_REPORT"/>
        </v-col>
      </v-row>

    </v-container>
    
  </form>
</template>

<style scoped>
  .header-Form  {
    display: flex;
    justify-content: center;
    margin: 10px 0px;
  }

  .order-by-col{
    position: relative;
  }

  .buttonExchange{
    width: 25px;
    position: absolute;
    right: -20px;
    bottom: 33px;
  }

  
  .buttonExchange svg{
    width: 25px;
    height: 40px;
    fill: white;
  }

  .box-filters-move{
    animation: move-right 2s normal;
  }

  .box-filters-fade{
    animation: fade-down 2s normal;
  }


  @keyframes move-right {

    from{
      transform: translateX(-100px);
    }

    to {
      transform: translateX(0px);
    }
    
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