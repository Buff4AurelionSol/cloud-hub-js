<script setup>
import { computed, ref } from 'vue';

    const isStacked = ref(false)

    const props = defineProps({
        title: {
            type: String, 
            required: true
        },
        data: {
            type: Array,
            default: () => []
        },
        classProps: {
            type: String,
            required: true
        }
    })

    const paymentMethods = computed(()=> {
       const methods =  [... new Set(
        props.data
                .filter(item => item.reportes > 0)
                .map(item => item.metodo)
       )]

       return methods.sort()

    })

    const uniqueDates = computed(()=>{
        const dates = [... new Set (props.data.map(item => item.dia_mes))]
        return dates.sort((a,b)=> new Date(a) - new Date(b))
    })
    
    

    const SERIES = computed(()=>{
        return paymentMethods.value.map((method)=>{
            return {
                name: method.toUpperCase(),
                data: uniqueDates.value.map((date) => {
                    const record = props.data.find(item => item.dia_mes === date && item.metodo === method );
                    return record ? record.reportes : 0; 
                })
            }
        })

    })

    const totalBills = computed(()=>{
        return props.data.reduce((acc, item) => acc + item.reportes, 0)
    })

    const OPTIONS = computed(()=> ({
        chart:{
            type: 'bar',
            stacked: isStacked.value,
            height: 350,        
            toolbar: {
                show: false
            },
            animations: {
                enabled: true,
                speed: 800,
                animateGradually: {
                    enabled: true,
                    delay: 150
                },
                dynamicAnimation: {
                    enabled: true,
                    speed: 350
                }
            }

        },
        plotOptions: {
            bar:{
                horizontal: false,
                borderRadius: 2,
                columnWidth: '80%'
            }
        },
        xaxis: {
            categories: uniqueDates.value,

         /*    labels: {
                formatter: function(value){
                    
                }
            } 
         */
        },

        yaxis: {
            title: {
                text: 'Cantidad de Reportes'
            }
        },
        legend: {
            position: 'right',
            offsetY: 40
        },
        responsive: [{
            breakpoint: 530,
            options: {
                legend: {
                    position: 'top'
                }
            },
        }]

    }))

    const changeCheckBox = () => {
        isStacked.value = !isStacked.value
    }

</script>

<template>
    <section :class="`${classProps} areaComponent`">
        <header class="
            d-flex 
            w-100 
            border-b-md
            border-opacity-25
            border-secondary
            "
        > 
            <h2 class="text-subtitle-2 ml-5 pa-2">
                {{ title }}
            </h2>
        </header>
        <section class="w-100 boxChart">
            <v-checkbox label="Encapsular" @input="changeCheckBox"></v-checkbox>
           
            <apexchart width="100%" height="400" :options="OPTIONS" :series="SERIES" />
        </section>
 
        <footer class="w-100">
            <div class="ml-5 mb-2 font-weight-light">
                <span>
                    Total de reportes: 
                    <v-chip class="bg-blue">
                        {{totalBills}}
                    </v-chip>
                </span>
            </div>
        </footer>
    </section>
</template>

<style>
    .box-chexbox{
        width: 10px;
    }
</style>

