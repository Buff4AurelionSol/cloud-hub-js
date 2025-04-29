<script setup>
    const props = defineProps({
        imageIcon: {
            type: String
        },
        reportsDate: {
            type: String
        }
    })

  const [date, time] = props.reportsDate.split(" ")
  

    
</script>

<template>
    <v-dialog max-width="500">
        <template v-slot:activator="{ props: activatorProps }">
            <v-btn 
                v-bind="activatorProps"
                color="surface-variant"
                text="Open Dialog"
                variant="flat"
            >
                <img :src="props.imageIcon" class="box-icon" />
            </v-btn>   
        </template>

        <template v-slot:default="{ isActive }">
            <v-card title="Dialog">
            <v-card-text>
                Creado el {{date}} a las: {{time }} 
            </v-card-text>

            <v-card-actions>
                <v-spacer></v-spacer>

                <v-btn
                text="Close Dialog"
                @click="isActive.value = false"
                ></v-btn>
            </v-card-actions>
            </v-card>
        </template>
    </v-dialog>
</template>

<style scoped>

</style>