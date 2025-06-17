<script setup>
    
    const props = defineProps({
        title: {
            type: String, 
            default: ''
        },
        data:{
            type: Array,
            default: []
        },
        classProps: {
            type: String 
        }
    })
    
    
    const calculateLongerBill = (inicial, actual) => {
        return actual > inicial ? actual:  inicial
    }
    
    const longerBill = computed(()=> {
         return props.data.reduce(calculateLongerBill)
    })
    

    const OPTIONS = {
        labels: props.data.map(item => item.nombre),
        chart:{
            offsetX: 0,
            offsetY: 0

        },
        legend: {
            show: true,
            showForSingleSeries: true,
            showForNullSeries: true,
            showForZeroSeries: true,
            position: 'top',
            horizontalAlign: 'left', 
            floating: false,
            fontSize: '12px',
            fontFamily: 'Helvetica, Arial',
            width: 250,
            offsetX: 255,
            offsetY: 10,
            height: 100,
            
            formatter: function(serieName, option){
                const valueSerie = option.w.globals.series[option.seriesIndex]
                return `${serieName}`+`: ${valueSerie}`  

            },
            inverseOrder: false,
            clusterGroupedSeriesOrientation: 'vertical',
            markers: {
                size: 5,
                shape: 'line',
                strokeWidth: 5,
                fillColors: undefined,
                customHTML: undefined,
                onClick: undefined,
                offsetX: 0,
                offsetY: 0
            },
            itemMargin: {
                horizontal: 6,
                vertical: 5
            },
            
        },
        plotOptions: {
            pie: {
                startAngle: 0,
                endAngle: 360,
                expandOnClick: false,
                offsetX: 0,
                offsetY: 0,
                customScale: 1,
                dataLabels: {
                    offset: 0,
                    minAngleToShowLabel: 10
                }, 
                
                donut: {
                    size: '40%',
                    background: 'transparent',
                    labels: {
                        show: true,
                        name: {
                            show: true,
                            fontSize: '20px',
                            fontFamily: 'Helvetica, Arial, sans-serif',
                            fontWeight: 200,
                            color: undefined,
                            offsetY: -10,
                            
                        },
                   
                        total: {
                            show: true,
                            showAlways: false,
                            label: longerBill.value.nombre,
                            fontSize: '15px',
                            fontFamily: 'Helvetica, Arial, sans-serif',
                            fontWeight: 600,
                            color: 'black',
                            formatter: function(){
                                return longerBill.value.cantidad_facturas
                            }                  
                        },
                        value: {
                            fontSize: '15px',   
                            fontWeight: 500,
                            color: 'black',       
                            offsetY: 0,        
                        }
                    }
                },      
            }
        },
        responsive: [{
            breakpoint: 530,
            options: {
                legend: {
                    show: false,
                }
            },
        }]
     
    }

    const calculateTotalBillings = (total, item) => {
        return total + parseInt(item.cantidad_facturas)
    }
    
    const SERIES = computed(()=>{
        return props.data.map(item => parseInt(item.cantidad_facturas)) 
    })

    const total_bills = computed(()=>{
        return props.data.reduce(calculateTotalBillings, 0)
    })

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
            <slot>
                
            </slot>
            <apexchart width="100%" height="70%" type="donut" :options="OPTIONS" :series="SERIES" />
        </section>
          
        <footer class="w-100">
            <div class="ml-5 mb-2 font-weight-light">
                <span>Total de facturas: {{ total_bills }}</span>
            </div>
        </footer>
    </section>
</template>

<style scoped>

    .areaComponent{
        height: 90vh;
    }

    .boxChart{
        height: 100%;
       
    }
</style>