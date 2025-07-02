<script setup>
    const props = defineProps({
        imageIcon: {
            type: String
        },
        reportData: {
            type: Object
        }
    })


    
</script>

<template>
    <v-dialog max-width="600">
        <template v-slot:activator="{ props: activatorProps }">
            <v-btn 
                v-bind="activatorProps"
                color="surface-variant"
                text="Open Dialog"
                variant="flat"
                rounded="xl"
            >
                <img :src="props.imageIcon" class="box-icon" />
            </v-btn>   
        </template>

        <template v-slot:default="{ isActive }">
            <v-card title="Detalles">
            <v-card-text>
                <header>Creado el {{reportData.fecha_creacion}} </header>
                <ContractsTable :itemsContracts="props.reportData.contratos"/>
                <TransactionsSpace :dataTransacctions="props.reportData.transacciones"/> 
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