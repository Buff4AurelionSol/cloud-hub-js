<script setup>
  const indexState = ref(10)
  const filters = ref([])
  const transactions = ref([])
  const orderBy = ref("")
  const haveIChangeDirectionOrderBy = ref(false)
  const searchValue = ref("")

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

</script>


<template>
  <Form @numberToFilter="getNumberToFilter" 
        @sendData="getData" 
        @transactions="getTransactions" 
        @orderBy="getOrderBy"
        :haveIChangeDirectionOrderBy="haveIChangeDirectionOrderBy"
        @isChangeDirectionOrderBy="isChangeDirectionOrderBy"
        @sendSearch="getSearch"
   />

   <Table :indexState="indexState" :filters="filters" :transactions="transactions" :orderBy="orderBy"
      :haveIChangeDirectionOrderBy="haveIChangeDirectionOrderBy" :searchValue="searchValue" />
</template>

