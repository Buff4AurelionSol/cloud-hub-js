import Cookies from 'js-cookie'
import { acceptHMRUpdate, defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { useDate } from 'vuetify'

export const useSessionStore = defineStore('session', () => {
  const date = useDate()
  const userServices = useUserServices()
  const route = useRoute()

  const appName = ref(null)
  const user = ref(null)
  const token = ref(null)
  const access = ref([])
  const specialAccess = ref([])
  const sessionExpired = ref(false)

  const getSessionExpired = computed(() => sessionExpired.value)
  const getUser = computed(() => user.value)
  const getAvaliableLocations = computed(() => user.value.estados)
  const getToken = computed(() => token.value)
  const getAppName = computed(() => appName.value ?? '')
  const getViewCode = computed(() => route.meta?.codigo ?? '')
  const getIsLogged = computed(
    () =>
      (!!user.value?.email &&
        !!user.value?.username &&
        !!user.value?.estadouser_id) ??
      false,
  )
  const getIsVerified = computed(
    () => !!user.value?.email_verified_at ?? false,
  )
  const getAccess = computed(() => access.value)
  const getSpecialAccess = computed(() => specialAccess.value)
  const getUserRoleList = computed(() => getAccess.value.flatMap(a => a.role_name))

  const getListViewsAccess = computed(() =>
    access.value.reduce((acc, role) => {
      role.vistas.forEach(vista => {
        const existingView = acc.find(v => v.vista_id === vista.vista_id)
        if (existingView) {
          // Consolidar permisos
          existingView.permisos = Array.from(
            new Set([
              ...existingView.permisos,
              ...vista.permisos.map(p => p.nombre),
            ]),
          )
        } else {
          // Agregar nueva vista
          acc.push({
            vista_id: vista.vista_id,
            app: vista.apps,
            nombre: vista.nombre,
            url: vista.url,
            codigo: vista.codigo,
            permisos: vista.permisos.map(p => p.nombre),
          })
        }
      })
      return acc
    }, []),
  )

  const getListViewsAccessInApp = computed(() =>
    access.value
      .flatMap(a => a.vistas)
      .filter(v => v.apps.nombre === getAppName.value)
      .map(v => ({
        vista_id: v.vista_id,
        app: v.apps,
        nombre: v.nombre,
        url: v.url,
        codigo: v.codigo,
        permisos: v.permisos.map(p => p.nombre), // Simplificar permisos a solo nombres
      })),
  )
  const getListAppAccess = computed(() => {
    const appIds = new Set()

    // Recorrer los roles y sus vistas para obtener los IDs de apps
    access.value.forEach(role => {
      role.vistas.forEach(vista => {
        if (vista.apps && vista.apps.id) {
          appIds.add(vista.apps.id)
        }
      })
    })

    return appIds
  })
  const getViewAccess = computed(() => userCanAccessView(getViewCode.value))

  const userCanAccessView = codigo => {
    const vista =
      access.value.flatMap(a => a.vistas).find(v => v.codigo === codigo) ??
      null

    if (vista) {
      // Simplificar permisos a solo nombres
      return {
        ...vista,
        permisos: vista.permisos.map(p => p.nombre), // Mapea los permisos a solo sus nombres
      }
    }

    return null // Retorna null si no se encuentra la vista
  }
  /**
   * Verifica que un usuario tiene un permiso especifico en la ruta actual o una pagina especifica.
   * Si no consigue en ninguna de las dos, verifica los permisos especiales del usuario.
   * @param {'ver' | 'crear' | 'editar' | 'eliminar'} permiso Nombre del permiso que se desea consultar
   * @param {string} codigoPagina (Opcional) Codigo de la pagina destino
   * @returns {Boolean} true Si la persona posee dicho permiso
   * @description NOTA: Tambien acepta permisos especiales si se conoce el nombre y se ejecuta de la misma
   * manera.
   */
  const userCan = (permiso, codigoPagina = null) => {
    if (codigoPagina) {
      const vistaDetalles = getListViewsAccess.value.find(
        vista => vista.codigo === codigoPagina,
      )
      return vistaDetalles
        ? vistaDetalles.permisos.includes(permiso) || getSpecialAccess.value.some(sp => sp.nombre === permiso)
        : false
    }
    return getViewAccess.value.permisos.includes(permiso) ||
    getSpecialAccess.value.some(sp => sp.nombre === permiso)
  }
  const firstViewInMultiple = codigo => {
    const viewsAllowed = []

    codigo.forEach(v => {
      const viewAllowed = userCanAccessView(v)
      if (viewAllowed) viewsAllowed.push(viewAllowed)
    })

    return viewsAllowed[0]
  }
  const setUser = value => {
    user.value = value
  }
  const setAppName = value => {
    appName.value = value
  }
  const setToken = async newAuthToken => {
    const authToken = Cookies.get('authToken')
    if (authToken) {
      Cookies.remove('authToken', { path: '/' })
    }
    const expires = date.addDays(new Date(), 1)
    Cookies.set('authToken', newAuthToken, {
      expires,
      path: '/',
    })
    token.value = newAuthToken
  }

  const setAccess = value => {
    access.value = value
  }

  const setSpecialAccess = value => {
    specialAccess.value = value
  }

  const login = async (email, password) => {
    try {
      const data = await userServices.login({
        email,
        password,
      })

      if (!data.success) {
        return data
      } else if (!data.data.accesos.some(r => ['Administrador', 'Empleado'].includes(r.role_name))) {
        return { success: false, mensaje: 'No tiene permisos para acceder a esta aplicación' }
      } else {
        await setToken(data.token)
        setUser(data.data)
        setAccess(data.data.accesos)
        setSpecialAccess(data.data.permisos_especiales)
        return { success: true }
      }
    } catch (error) {
      console.log(error)

      return { success: false }
    }
  }
  const logout = async () => {
    try {
      if (!getIsLogged.value) {
        window.location.reload()
        return
      }
      await userServices.logout()
    } finally {
      Cookies.remove('authToken', { path: '/' })
      user.value = null
      token.value = null
      appName.value = 'CloudHUB'
      access.value = []
    }
  }

  const setSessionExpired = val => {
    sessionExpired.value = val
  }

  return {
    user,
    token,
    access,
    specialAccess,
    sessionExpired,

    getSessionExpired,
    getUser,
    getAvaliableLocations,
    getToken,
    getAccess,
    getSpecialAccess,
    getUserRoleList,
    getAppName,
    getListAppAccess,
    getListViewsAccess,
    getListViewsAccessInApp,
    getViewAccess,
    getIsLogged,
    getIsVerified,

    userCanAccessView,
    userCan,
    firstViewInMultiple,
    setUser,
    setToken,
    setAccess,
    setSpecialAccess,
    setAppName,
    login,
    logout,
    setSessionExpired,
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useSessionStore, import.meta.hot))
}
