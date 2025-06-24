<script setup>
  defineProps({
    tasa: {
      type: Boolean,
      default: false,
    },
    search: {
      type: Boolean,
      default: false,
    },
    // Con respecto a los avisos
    avisos: {
      type: [Array, Boolean],
      default: false,
    },
    avisosMenuTitle: {
      type: String,
    },
    avisosIcon: {
      type: String,
    },
    avisosTitle: {
      type: String,
    },
    avisosSubtitle: {
      type: String,
    },
    // Con respecto al contenido de cada aviso
    avisosContent: {
      type: String,
      default: 'items',
    },
    contentTitle: {
      type: String,
      default: 'title',
    },
    contentSubtitle: {
      type: String,
      default: 'subtitle',
    },
    avisosLengthStrategy: {
      type: String,
    },
    // Para sincronizar
    avisosSync: {
      type: Boolean,
      default: false,
    },
    avisosSyncTooltip: {
      type: String,
    },
    navIcon: {
      type: Boolean,
      default: false,
    },
  })
  const app = useAppStore()
  const paymentsStore = usePaymentsStore()
  const session = useSessionStore()

  const { sideDrawer } = storeToRefs(app)

  defineEmits(['syncAvisos'])

  onMounted(() => {
    paymentsStore.fetchTasa()
  })
</script>

<template>
  <v-app-bar
    class="position-fixed ps-5 d-flex"
    color="background"
    elevation="0"
  >
    <v-app-bar-nav-icon v-if="navIcon" variant="text" @click.stop="sideDrawer = !sideDrawer" />
    <v-app-bar-title v-if="$vuetify.display.mobile">
      <slot name="title" />
    </v-app-bar-title>
    <global-search-module v-if="search" />

    <template #append>
      <!-- Mostrar la tasa-->
      <v-chip v-if="tasa" color="primary" rounded>
        Tasa del día: {{ Number(paymentsStore.getTasa).toFixed(2) }} VES
      </v-chip>
      <!-- Menu para cambiar temas -->
      <global-menus-theme />
      <!-- Menu de avisos -->
      <global-menus-advices
        v-if="avisos !== false"
        :avisos
        :avisos-content
        :avisos-subtitle
        :avisos-sync
        :avisos-title
        :content-subtitle
        :content-title
        :icon="avisosIcon"
        :length-strategy="avisosLengthStrategy"
        :menu-title="avisosMenuTitle"
        :sync-tooltip="avisosSyncTooltip"
        @sync="$emit('syncAvisos')"
      />
      <!-- Ayuda -->
      <v-btn icon="mdi-help-circle-outline" />
      <v-btn
        v-if="session.getAppName !== 'CloudHUB'"
        href="/dashboard"
        icon="mdi-hubspot"
      />
      <global-menus-profile />
    </template>
  </v-app-bar>
</template>

<style scoped></style>
