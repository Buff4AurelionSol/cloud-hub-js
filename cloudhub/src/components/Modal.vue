<script setup>
    const props = defineProps({
        imageIcon: {
            type: String
        },
        reportData: {
            type: Object
        }
    })

  const [date, time] = props.reportData.created_at.split(" ")
  const [year, month, day] = date.split("-")

    
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
            <v-card title="Detalles">
            <v-card-text>
                <header>Creado el {{day}}-{{month}}-{{year}} a las: {{time }} </header>
                <ContractsTable :itemsContracts="props.reportData.contratos"/>
            </v-card-text>

            <v-card-actions>
                <v-spacer></v-spacer>

                <v-btn
                text="Cerrar detalles"
                @click="isActive.value = false"
                ></v-btn>
            </v-card-actions>
            </v-card>
        </template>
    </v-dialog>
</template>

<style scoped>

</style>