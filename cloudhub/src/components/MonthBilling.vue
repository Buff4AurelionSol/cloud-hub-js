<script setup>
    const DATA_MONTH = ref(facturas_realizadas_mes)
    const monthState = ref()
    const selectedDate = ref("")
    
    const handleSubmit = () => {         
          const date = new Date(selectedDate.value)
          console.log(date)
          const month = date.getMonth() + 1
          const year = date.getFullYear()
          const finalYear = [month, year]
          monthState.value =  finalYear.join("-")
    }

       
    const calculateLongerBill = (inicial, actual) => {
        return actual > inicial ? actual:  inicial
    }
    
    const longerBill = computed(()=> {
         return DATA_MONTH.value.reduce(calculateLongerBill)
    })
    

    const OPTIONS = {
        labels: DATA_MONTH.value.map(item => item.nombre),
        legend: {
            show: true,
            showForSingleSeries: true,
            showForNullSeries: true,
            showForZeroSeries: `true`,
            position: 'top',
            horizontalAlign: 'left', 
            floating: false,
            fontSize: '12px',
            fontFamily: 'Helvetica, Arial',
            formatter: function(serieName, option){
                const valueSerie = option.w.globals.series[option.seriesIndex]
                return `${serieName}`+`: ${valueSerie}`  

            },
            inverseOrder: false,
            clusterGroupedSeries: true,
            clusterGroupedSeriesOrientation: 'vertical',
            offsetX: 0,
            offsetY: 0,
            markers: {
                size: 6,
                shape: 'line',
                strokeWidth: 5,
                fillColors: undefined,
                customHTML: undefined,
                onClick: undefined,
                offsetX: 0,
                offsetY: 0
            },
            itemMargin: {
                horizontal: 5,
                vertical: 3
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
                    size: '50%',
                    background: 'transparent',
                    labels: {
                        show: true,
                        name: {
                            show: true,
                            fontSize: '20px',
                            fontFamily: 'Helvetica, Arial, sans-serif',
                            fontWeight: 600,
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
                            fontSize: '20px',   
                            fontWeight: 700,
                            color: 'black',       
                            offsetY: 16            
                        }
                    }
                },      
            }
        }

        
    }


    const calculateTotalBillings = (total, item) => {
        return total + parseInt(item.cantidad_facturas)
    }

    const SERIES = computed(()=>{
        return DATA_MONTH.value.map(item => parseInt(item.cantidad_facturas)) 
    })

    const total_bills = computed(()=>{
        return DATA_MONTH.value.reduce(calculateTotalBillings, 0)
    })


</script>

<template>
    <section class="     
        d-flex 
        flex-column 
        align-center 
        ga-2 
        bg-white 
        w-50 
        rounded-xl 
        border-t-lg 
        border-primary 
        border-opacity-100
        "
    >
        <header class="
                d-flex 
                w-100 
                border-b-md
                border-opacity-25
                border-secondary
                "
            > 
            <h2 class="text-subtitle-2 ml-5 pa-2">
                Facturación del Mes
            </h2>
        </header>
        <section class="w-75">
            <div class="d-flex justify-center align-center">
                <v-date-input 
                    variant="outlined" 
                    name="dateMonth" 
                    label="Fecha"
                    v-model="selectedDate"
                    @update:model-value="handleSubmit"
                />
            </div>
            <div>
                <apexchart width="500" type="donut" :options="OPTIONS" :series="SERIES"/> 
            </div>
        </section>
        <footer class="w-100">
            <div class="pa-2 font-weight-light">
                <span>Total de facturas: {{ total_bills }}</span>
            </div>
        </footer>
    </section>

</template>