<script setup>
  const VALUES_PAY_TYPE = defineModel('payTypeValue')
</script>

<template>
  <v-row class="text-center">
    <v-col>
      <v-btn-toggle
        v-model="VALUES_PAY_TYPE"
        color="deep-purple-accent-3"
        rounded="0"
        group
      >
        <div>
          <v-btn value="BOLIVARES" class="h-100">
            BOLIVARES
          </v-btn>

          <v-btn value="DIVISAS" class="h-100">
            DIVISAS
          </v-btn>
        </div>
      </v-btn-toggle>
    </v-col>
  </v-row>
</template>

