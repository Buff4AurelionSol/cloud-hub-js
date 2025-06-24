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
    
    const chartRef = ref(null)
    const colorRef = ref([])
    const hoveredLegendItem = ref({
        name: '',   
        total: 0    
    })


    
    const calculateLongerBill = (inicial, actual) => {
        return actual > inicial ? actual:  inicial
    }
    
    const longerBill = computed(() => {
        if (!props.data.length) return { nombre: '', cantidad_facturas: 0 }
        return props.data.reduce((prev, curr) =>
            parseInt(curr.cantidad_facturas) > parseInt(prev.cantidad_facturas) ? curr : prev
        )
    })

    hoveredLegendItem.value = {
        name: longerBill.value.nombre.toUpperCase(),
        total: longerBill.value.cantidad_facturas
    }

    

    

    const OPTIONS = computed(()=> ({
        labels: props.data.map(item => item.nombre),
        chart:{
            offsetX: 0,
            offsetY: 0,
             events: {
                mounted: function (chartContext, _config) {
                    colorRef.value = chartContext?.w?.globals?.colors || []
                },
                dataPointMouseEnter(event, chartContext, config) {
                    const index = config.dataPointIndex
                    const item = props.data[index]
                    if (item) {
                        hoveredLegendItem.value = {
                        name: item.nombre.toUpperCase(),
                        total: item.cantidad_facturas
                        }
                    }
                },
                dataPointMouseLeave() {
                    hoveredLegendItem.value = {
                        name: longerBill.value.nombre.toUpperCase(),
                        total: longerBill.value.cantidad_facturas
                    }
                }
            }
        },
        legend: {
            show: false,
            
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
                        show: false,
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
                            label: hoveredLegendItem.value.name.toUpperCase(),
                            fontSize: '15px',
                            fontFamily: 'Helvetica, Arial, sans-serif',
                            fontWeight: 600,
                            color: 'black',
                            formatter: function(){
                                return hoveredLegendItem.value.total
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
     
    }))

    const calculateTotalBillings = (total, item) => {
        return total + parseInt(item.cantidad_facturas)
    }
    
    const SERIES = computed(()=>{
        return props.data.map(item => parseInt(item.cantidad_facturas)) 
    })

    const total_bills = computed(()=>{
        return props.data.reduce(calculateTotalBillings, 0)
    })
 
    const highlight = (name) => {
        
        if (chartRef.value?.chart?.highlightSeries) {
            chartRef.value.chart.highlightSeries(name)
            hoveredLegendItem.value.name = name.toUpperCase()
            hoveredLegendItem.value.total = props.data.find(item => item.nombre.toUpperCase() === name.toUpperCase() )?.cantidad_facturas || 0;
         
        }
    }

    const reset = () => {
        if (chartRef.value?.chart?.resetSeries) {
            chartRef.value.chart.resetSeries()
            hoveredLegendItem.value.name = longerBill.value.nombre.toUpperCase();
            hoveredLegendItem.value.total = longerBill.value.cantidad_facturas

        }
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
        <slot>
                
        </slot>
        <section class="custom-legend">
          <div class="item-legend" v-for="(item, index) in props.data" :key="item.codigo" 
            @mouseenter="highlight(item.nombre)" @mouseleave="reset"
           >
            <span class="color-bar" :style="{backgroundColor: colorRef[index] || '#ccc' }"></span>
            <span class="item-text">{{item.nombre.toUpperCase()}}:{{item.cantidad_facturas}}</span>
          </div>
        </section>
        <section class="w-100 boxChart">
            <apexchart width="100%" height="100%" type="donut" :options="OPTIONS" :series="SERIES" ref="chartRef" />
            <div class="label-donut">
                <p class="item-text">{{ hoveredLegendItem.name }}</p>
                <p class="text-lg">{{ hoveredLegendItem.total }}</p>
            </div>
        </section>
          
        <footer class="w-100">
            <div class="ml-5 mb-2 font-weight-light">
                <span>Total de facturas:
                    <v-chip class="bg-blue">
                        {{total_bills}}
                    </v-chip>
                </span>
            </div>
        </footer>
    </section>
</template>

<style scoped>

    .areaComponent{
        height: 100vh;
    }

    .boxChart{
        height: 100%;
        position: relative;
       
       
    }
    
    .custom-legend{
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        height: 240px;
        max-height: 250px;
        overflow-y: auto;
    }

    .color-bar{
        width: 6px;
        height: 100%;
        background-color: slateblue;
        border-radius: 1px;
    }

    .item-legend{
        display: flex;
        align-items: center;
        gap: 10px;
        padding-right: 10px;
    }

    .label-donut {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        text-align: center;
        pointer-events: none; 
    }

    .item-text{
        font-weight: bolder;
        color: black;
    }
</style>