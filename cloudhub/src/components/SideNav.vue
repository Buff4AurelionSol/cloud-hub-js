<script setup>
  const ITEMS = [
    {
      title: 'Consultar contratos',
      prependIcon: 'mdi-file-account',
      url: '/clients',
      codigo: 'cloudclients_consultar_contratos',
      permisos: ['ver'],
    },
    {
      title: 'Estadisticas',
      prependIcon: 'mdi-chart-histogram',
      url: '/clients/estadisticas',
      codigo: 'cloudclients_estadisticas',
      permisos: ['ver'],
    },
    {
      title: 'Avisos masivos',
      prependIcon: 'mdi-bullhorn',
      subItems: [
        {
          title: 'Correo',
          prependIcon: 'mdi-email',
          url: '/clients/masivo/correo',
          codigo: 'cloudclients_notificacion_masiva',
          permisos: ['ver'],
        },
        {
          title: 'SMS',
          prependIcon: 'mdi-message',
          url: '/clients/masivo/sms',
          codigo: 'cloudclients_notificacion_masiva',
          permisos: ['ver'],
        },
      ],
    },
    {
      title: 'Aviso de cobro',
      prependIcon: 'mdi-file-document',
      subItems: [
        {
          title: 'Configuracion',
          prependIcon: 'mdi-cog',
          url: '/clients/aviso-de-cobro/config',
          codigo: 'cloudclients_aviso_cobro_config',
          permisos: ['ver'],
        },
      ],
    },
  ]

  const router = useRouter()
  const route = useRoute()
  const session = useSessionStore()
  const app = useAppStore()

  const { sideDrawer } = storeToRefs(app)

  // Las ventanas que el usuario puede ver con sus permisos
  const filteredItems = ref(null)

  function filtrarOpciones () {
    const result = ITEMS.map(tab => {
      if (!tab?.subItems || tab.subItems?.length === 0) { // Opcion unica
        for (const permiso of tab.permisos) {
          if (!session.userCan(permiso, tab.codigo)) return null
        }
        return tab
      } else { // Opcion multiple
        tab.subItems = tab.subItems.filter(action => {
          // Verifica que el usuario tenga TODOS los permisos requerido para esa acción
          for (const permiso of action.permisos) {
            if (!session.userCan(permiso, action.codigo)) return false
          }
          return true
        })
        return tab.subItems.length > 0 ? tab : null
      }
    })
    filteredItems.value = result.filter(value => value !== null)
  }

  onMounted(() => {
    filtrarOpciones()
  })
</script>

<template>
  <v-navigation-drawer
    v-model="sideDrawer"
    :class="['h-100 border-0 pe-2',
             $vuetify.display.mobile ? 'bg-surface' : 'bg-transparent'
    ]"
    :permanent="!$vuetify.display.mobile"
    :width="($vuetify.display.mobile ? 300 : 250)"
  >
    <!--Titulo-->
    <v-card v-ripple color="transparent" elevation="0" @click="router.push('/clients')">
      <template #prepend>
        <h1>
          <v-icon color="primary" icon="mdi-account-card" />
          <span class="text-secondary">
            Cloud<b class="text-tertiary">CLIENTS</b>
          </span>
        </h1>
      </template>
    </v-card>
    <!--Lista de acciones-->
    <v-list class="me-2">
      <v-list-group v-for="item in filteredItems" :key="item.title">
        <template #activator="{isOpen, props: activatorProps}">
          <v-list-item
            v-bind="activatorProps"
            :active="route.path === item.url"
            color="primary"
            :link="route.path !== item.url"
            :prepend-icon="item.prependIcon"
            :readonly="route.path === item.url"
            rounded="xl"
            slim
            :title="item.title"
            @click="router.push(item.url)"
          >
            <template #append>
              <v-icon
                v-if="item.subItems?.length > 0"
                :icon="!isOpen ? 'mdi-chevron-down' : 'mdi-chevron-up'"
              />
            </template>
          </v-list-item>
        </template>
        <v-list-item
          v-for="sub in item.subItems"
          v-bind="sub"
          :key="sub.title"
          :active="route.path === sub.url"
          color="primary"
          density="compact"
          :link="route.path !== sub.url"
          :readonly="route.path === sub.url"
          rounded="xl"
          slim
          @click="router.push(sub.url)"
        />
      </v-list-group>
      <!--       <v-list-item
        v-for="item in filteredItems"
        v-bind="item"
        :key="item.title"
        :active="route.path === item.url"
        color="primary"
        density="compact"
        :link="route.path !== item.url"
        :readonly="route.path === item.url"
        rounded="xl"
        @click="router.push(item.url)"
      /> -->
    </v-list>
  </v-navigation-drawer>
</template>

<style scoped></style>
