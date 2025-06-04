<script setup>

    import DetailsIcon from '@/pics/visible.png'

    const props = defineProps({
        indexState: {
            type: Number
        }, 
        columns: {
            type: Array
        }
    })

    const HEADERS = [
        {title: 'id', value:'ID'},
        {title: 'transaccions', children: [
            {title:'referencia', value:'REFERENCIA'},
            {title:'banco_origen', value:'BANCO ORIGEN'},
            {title:'banco_destino', value:'BANCO DESTINO'},
            {title:'monto', value: 'MONTO'},
            {title:'monto_usd', value: 'MONTO USD'},
            {title: 'tasa', value: 'TASA'},
            {title:'tipo', value: 'TIPO TRANSACCIÓN'},
            {title:'fecha', value:'FECHA TRANSACCIÓN'}

         ]
        },
        {title: 'contratos', children:[
            {title:'nombre', value:'CLIENTE'},
            {title: 'contrato', value:'CONTRATO(S)'},
            {title:'rif', value:'RIF/CEDULA'}
        ]},
        {title:'facturas', children:[
            {title:'factura', value:'FACTURA(S)'},
            {title:'fecha', value:'FECHA FACTURA'}
        ]},
        {title:'created_at', value: 'FECHA REPORTE'}
    ]

    const DATA_FILTER = () => {
     
    
        console.log("Esto es lo que obtengo: ", props.columns)
        
      
    }

            
   
</script>

<template>
    <v-table class="table-container box-filters-fade rounded-xl">
        <thead>
            <tr>
                 <th>
                    #
                </th>
                <template v-for="head in HEADERS" :key="head.title">
                    <template v-if="!head.children">
                       
                        <th :key="head.title">
                            {{head.value }}
                        </th>
                    </template>
                    <template v-else v-for="child in head.children" :key="child.title">
                        <th>{{ child.value }}</th>
                    </template>
                </template>
            </tr>
        </thead>
        <tbody>
            <tr v-for="(report, index) in REPORTS_FACTURADOS" :key="index">
                <td>
                    {{ index  + 1}}
                </td>
                <template v-for="head in HEADERS" :key="head.title">
                    <td v-if="!head.children">
                        {{ report[head.title] ?? '—' }}
                    </td>
                    
                    <template v-else>
                        <td v-for="child in head.children" :key="child.title" >
                            <template v-if="child.title === 'contrato'">
                              <div class="d-flex flex-column ga-1">
                                  <v-chip v-for="(item, i) in report[head.title]" 
                                    class="bg-blue" 
                                    :class="{'mb-1': i === report[head.title].length - 1 }"
                                   >
                                        {{item[child.title]}}
                                  </v-chip>
                              </div>
                            </template>

                            <template v-else>
                                {{ report[head.title].map(item => item[child.title]).join(" ; ")}}
                            </template>
                        </td>
                    </template>
                </template>
                 <td>
                    <Modal
                        :image-icon="DetailsIcon"
                        :reportData="report"
                    />
                </td>
            </tr>
            <tr>

            </tr>
        </tbody>

    </v-table>
    <div class="d-flex justify-center ma-2">
          <v-btn @click="DATA_FILTER" size="large" class="bg-blue">
                PRUEBA
          </v-btn>
    </div>
</template>