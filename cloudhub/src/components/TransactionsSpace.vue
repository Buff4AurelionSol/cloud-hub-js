<script setup>
    const props = defineProps({
        dataTransacctions: {
            type: Array
        }
    })
</script>

<template>
    <section v-for="(transaction, i) in props.dataTransacctions" class="d-flex flex-column ga-4 pt-4">
        <header>TRANSACCIÓN: {{i+1}}</header>
        <div class="d-flex ga-4 justify-center">
            <div class="d-flex flex-column ga-1">
                <div>
                    <span>Banco origen:</span>
                    <span>{{transaction.banco_origen}}</span>
                </div>
                <div>
                    <span>Tipo Transacción:</span>
                    <span>{{transaction.tipo}}</span>
                </div>
                <div>
                    <span>Pago proveedor:</span>
                    <span>{{transaction.pago_proveedor}}</span>
                </div>
                <div>
                    <span>Monto:</span>
                    <span>{{transaction.monto}}</span>
                </div>
            </div>
            <div class="d-flex flex-column ga-1">
                <div>
                    <span>Banco destino</span>
                <span>{{transaction.banco_origen}}</span>
                </div>
                <div>
                    <span>Moneda:</span>
                    <span>{{transaction.moneda}}</span>
                </div>
                <div>
                    <span>Referencia:</span>
                    <span>{{transaction.referencia}}</span>
                </div>
                <div>
                    <span>Depositante:</span>
                    <span>{{transaction.depositante}}</span>
                </div>
            </div>
        </div>
    </section>


</template>