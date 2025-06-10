<script setup>
    const DATA_DAY = ref(facturas_realizadas_hoy)
    
    const calculateLongerBill = (inicial, actual) => {
        return actual > inicial ? actual:  inicial
    }
    
    const longerBill = DATA_DAY.value.reduce(calculateLongerBill)
    

    const OPTIONS = {
        labels: DATA_DAY.value.map(item => item.nombre),
        legend: {
            show: true,
            showForSingleSeries: false,
            showForNullSeries: true,
            showForZeroSeries: `true`,
            position: 'top',
            horizontalAlign: 'left', 
            floating: false,
            fontSize: '15px',
            fontFamily: 'Helvetica, Arial',
            fontWeight: 400,
            formatter: undefined,
            inverseOrder: false,
            clusterGroupedSeries: true,
            clusterGroupedSeriesOrientation: 'vertical',
            offsetX: 0,
            offsetY: 0,
            markers: {
                size: 5,
                shape: 'line',
                strokeWidth: 1,
                fillColors: undefined,
                customHTML: undefined,
                onClick: undefined,
                offsetX: 0,
                offsetY: 0
            },
            itemMargin: {
                horizontal: 5,
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
                    size: '65%',
                    background: 'transparent',
                    labels: {
                        show: true,
                        name: {
                            show: true,
                            fontSize: '22px',
                            fontFamily: 'Helvetica, Arial, sans-serif',
                            fontWeight: 600,
                            color: undefined,
                            offsetY: -10,
                            
                        },

                        total: {
                            show: true,
                            showAlways: false,
                            label: longerBill.nombre,
                            fontSize: '15px',
                            fontFamily: 'Helvetica, Arial, sans-serif',
                            fontWeight: 600,
                            color: 'white',
                            formatter: function(){
                                return longerBill.cantidad_facturas
                            }                  
                        },
                        value: {
                            fontSize: '20px',   
                            fontWeight: 700,
                            color: 'white',       
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

    const SERIES = DATA_DAY.value.map(item => parseInt(item.cantidad_facturas)) 

    const total_facturas = DATA_DAY.value.reduce(calculateTotalBillings, 0)


</script>

<template>
    <section class="d-flex flex-column align-center ga-2">
        <header> 
            <h2>
                Facturación del día
            </h2>
        </header>
            <apexchart width="500" type="donut" :options="OPTIONS" :series="SERIES"/> 
        <footer>
            <span>Total de facturas: {{ total_facturas }}</span>
        </footer>
    </section>
</template>