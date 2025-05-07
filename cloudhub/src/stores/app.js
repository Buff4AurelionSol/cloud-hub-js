import { acceptHMRUpdate, defineStore } from 'pinia'
import { computed, ref } from 'vue'

export const useAppStore = defineStore(
  'app',
  () => {
    const globalLoading = ref(false)
    const sessionExpired = ref(false)
    const serverDown = ref(false)
    const theme = ref('light')
    const color = ref('')
    const notify = ref({
      color: 'success',
      msg: '',
      show: false,
      timeout: 3000,
    })
    const profileDrawer = ref(false)
    const sideDrawer = ref(true)
    const shortCuts = ref([])
    const qrCode = reactive({
      show: false,
      value: '',
      title: '',
    })
    const getGlobalLoading = computed(() => globalLoading.value)
    const getSessionExpired = computed(() => sessionExpired.value)
    const getServerDown = computed(() => serverDown.value)
    const getTheme = computed(() => theme.value)
    const getColor = computed(() => color.value)
    const getIsDarkMode = computed(() => theme.value === 'dark')
    const getNotify = computed(() => notify.value)
    const getShortCuts = computed(() => shortCuts.value)
    const getQrCode = computed(() => qrCode)

    const isMobile = computed(() => this.$vuetify.display.mobile)

    const setGlobalLoading = value => {
      globalLoading.value = value
    }
    const setTheme = value => {
      theme.value = value
    }
    const setColor = value => {
      color.value = value
    }
    const toggleTheme = () => {
      theme.value = theme.value === 'light' ? 'dark' : 'light'
    }
    const setSessionExpired = val => {
      sessionExpired.value = val
    }
    const setServerDown = val => {
      sessionExpired.value = val
    }
    const showNotification = (color, msg, timeout = 3000) => {
      notify.value.color = color
      notify.value.msg = msg
      notify.value.show = true
      notify.value.timeout = timeout
    }
    const addShortCut = val => {
      shortCuts.value.push(val)
    }
    const createQrCode = (value, title, show = true) => {
      qrCode.value = value
      qrCode.title = title
      qrCode.show = show
    }

    return {
      theme,
      color,
      profileDrawer,
      sideDrawer,
      shortCuts,

      getGlobalLoading,
      getTheme,
      getColor,
      getIsDarkMode,
      getNotify,
      getSessionExpired,
      getServerDown,
      getShortCuts,
      getQrCode,

      isMobile,

      toggleTheme,
      setGlobalLoading,
      setTheme,
      setColor,
      showNotification,
      setSessionExpired,
      setServerDown,
      addShortCut,
      createQrCode,
    }
  },
  {
    persist: true,
  },
)

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useAppStore, import.meta.hot))
}
