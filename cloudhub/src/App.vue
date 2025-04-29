<script setup>
  const indexState = ref(10)
  const filters = ref([])
  const transactions = ref([])
  const orderBy = ref("")
  const haveIChangeDirectionOrderBy = ref(false)
  const searchValue = ref("")
  const payTypeState = ref('BOLIVARES')

  function getNumberToFilter(value) {
    indexState.value = Number(value)
  }

  function getData(data){
    filters.value = data
  }

  function getTransactions(data){
    transactions.value = data
  }

  function getOrderBy(data){
    orderBy.value = data
  }

  function getSearch(data){
    searchValue.value = data
    console.log(searchValue.value)
  }

  function isChangeDirectionOrderBy(){
    haveIChangeDirectionOrderBy.value 
    ? 
      haveIChangeDirectionOrderBy.value = false 
    : 
      haveIChangeDirectionOrderBy.value = true

  }

  function getPayType(data){
    payTypeState.value = data
    console.log(payTypeState.value)
  }

</script>


<template>
  <Form @numberToFilter="getNumberToFilter" 
        @sendData="getData" 
        @transactions="getTransactions" 
        @orderBy="getOrderBy"
        :haveIChangeDirectionOrderBy="haveIChangeDirectionOrderBy"
        @isChangeDirectionOrderBy="isChangeDirectionOrderBy"
        @sendSearch="getSearch"
        @sendPayTypeState="getPayType"
   />
    
  <div v-if="payTypeState === 'BOLIVARES'">
    <Table :indexState="indexState" :filters="filters" :transactions="transactions" :orderBy="orderBy"
      :haveIChangeDirectionOrderBy="haveIChangeDirectionOrderBy" :searchValue="searchValue" 
    />
  </div>
  <div v-else-if="payTypeState === 'DIVISAS'">
    <TableDolar :indexState="indexState" :filters="filters" :transactions="transactions" :orderBy="orderBy"
      :haveIChangeDirectionOrderBy="haveIChangeDirectionOrderBy" :searchValue="searchValue" 
    />
  </div>

   
</template>

