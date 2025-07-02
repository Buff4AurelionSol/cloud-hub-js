<script setup>
    const props = defineProps({
        itemsContracts:{
            type: Array
        }
    })
</script>

<template>
  <v-table theme="dark">
    <thead>
      <tr>
        <th>Contrato</th>
        <th>Nombre</th>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="item in props.itemsContracts"
        :key="item.contrato"
      >
        <td>{{ item.contrato }}</td>
        <td>{{ item.nombre}}</td>
      </tr>
    </tbody>
  </v-table>
</template>