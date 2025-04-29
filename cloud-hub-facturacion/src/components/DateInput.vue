<script setup>
    const props = defineProps({
        name:{
            type: String
        },
        label: {
            type: String
        }
    })
</script>

<template>
    <v-date-input variant="outlined" :name="props.name" :label="props.label"/>
</template>

<style>
    .date-time{
        width: auto;
        height: 25px;
        
    }
</style>