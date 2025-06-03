<script setup>


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

     const validCells = computed(() => {
        return REPORTS_FACTURADOS.filter(item =>
            Object.values(item).some(value => typeof value === 'object' && value !== null)
        );
    });

            
   
</script>

<template>
    <v-table>
        <thead>
            <tr>
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
            <tr v-for="(report, index) in validCells" :key="index">
                <template v-for="head in HEADERS" :key="head.title">
                    <!-- Si NO tiene hijos (campos simples) -->
                    <td v-if="!head.children">
                        {{ report[head.title] ?? '—' }}
                    </td>

                    <!-- Si tiene hijos (campos anidados como facturas, contratos...) -->
                    <template v-else>
                        <td v-for="child in head.children" :key="child.title">
                        {{ report[head.title]?.[0]?.[child.title] }}
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
</template>