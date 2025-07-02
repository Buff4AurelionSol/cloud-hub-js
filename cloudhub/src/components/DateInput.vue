<script setup>
    const props = defineProps({
        name:{
            type: String,
            required: true
        },
        label: {
            type: String,
            required: true
        }
       
    })

    const [model, modifiers] = defineModel({
        set(value){
            if(modifiers.formatted){
               const year = value.getFullYear();
               const month = value.getMonth() +1;
               const finalDate = `${month}-${year}`
               return finalDate; 
            }

            if(modifiers.dateFull){
                const year = value.getFullYear()
                const month = String(value.getMonth() + 1).padStart(2, '0');
                const day = String(value.getDate()).padStart(2, '0');   
                const finalDate = `${year}-${month}-${day}`
                return finalDate
            }
            return value
        }
    })
    
</script>

<template>
    <v-date-input variant="outlined" :name="props.name" :label="props.label"  v-model="model" :value="model" />
</template>

