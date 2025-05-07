import { acceptHMRUpdate, defineStore } from 'pinia'
import { computed, ref } from 'vue'

export const usePaymentsStore = defineStore('tasa', () => {
  const paymentsServices = usePaymentsServices()
  const tasa = ref(null)
  const listaTasas = ref(null)
  const bancos = ref([])
  const tiposTransacciones = ref([])
  const monedas = ref([])

  const getTasa = computed(() => tasa.value)
  const getListaTasas = computed(() => listaTasas.value)
  const getBancos = computed(() => bancos.value)
  const getBancosBs = computed(() =>
    bancos.value.filter(b => b.monedas.some(m => m.nombre === 'BOLIVARES')),
  )
  const getTipoTransacciones = computed(() => tiposTransacciones.value)
  const getMonedas = computed(() => monedas.value)

  const setTasa = val => {
    tasa.value = val
  }

  const setListaTasas = val => {
    listaTasas.value = val
  }

  const calcularMonto = monto =>
    Number(Number(monto) * Number(tasa.value)).toFixed(2)
  const findBanco = id => bancos.value.find(r => r.id === id)
  const findTipoTransaccion = id => tiposTransacciones.value.find(r => r.id === id)
  const findMoneda = id => monedas.value.find(r => r.id === id)

  const setBancos = (data = []) => {
    bancos.value = data
  }

  const setTiposTransacciones = (data = []) => {
    tiposTransacciones.value = data
  }

  const setMonedas = (data = []) => {
    monedas.value = data
  }

  const bancosFromMoneda = id => {
    return bancos.value.filter(banco => {
      return banco.monedas.some(moneda => moneda.id === id)
    })
  }

  const bancosOrigenFromDestino = (id, monedaID = 1) => {
    return bancos.value.filter(banco => {
      const hasMoneda = banco.monedas.some(moneda => moneda.id === monedaID)

      // Asegurarse de que banco.id sea un número
      const bancoId = Number(banco.id)

      if (id === 1 || id === 29 || id === 33) {
        return monedaID === 1 ? hasMoneda : false
      } else if (id === 29 && monedaID === 2) {
        return bancoId === 29
      } else if (id === 31 && monedaID === 2) {
        return bancoId === 31
      } else {
        return false
      }
    })
  }

  const fetchBancos = async () => {
    try {
      const result = await paymentsServices.getBanks()
      setBancos(result.data)
    } catch (e) {
      console.log(e)
    }
  }

  const fetchTipoTransacciones = async () => {
    try {
      const result = await paymentsServices.getTipoTransacciones()
      setTiposTransacciones(result.data)
    } catch (e) {
      console.log(e)
    }
  }

  const fetchMonedas = async () => {
    try {
      const result = await paymentsServices.getCurrencys()
      setMonedas(result.data)
    } catch (e) {
      console.log(e)
    }
  }

  const fetchTasa = async () => {
    try {
      const result = await paymentsServices.getTasa()
      setTasa(result.data.tasa)
    } catch (e) {
      console.log(e)
    }
  }

  const fetchListaTasas = async () => {
    try {
      const result = await paymentsServices.getListaTasas()
      setListaTasas(result.data)
    } catch (e) {
      console.log(e)
    }
  }
  return {
    tasa,
    bancos,
    tiposTransacciones,
    monedas,

    getTasa,
    getListaTasas,
    getBancos,
    getBancosBs,
    getTipoTransacciones,
    getMonedas,

    setTasa,
    calcularMonto,
    findBanco,
    findTipoTransaccion,
    findMoneda,
    bancosFromMoneda,
    bancosOrigenFromDestino,

    fetchTasa,
    fetchListaTasas,
    fetchBancos,
    fetchTipoTransacciones,
    fetchMonedas,
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(usePaymentsStore, import.meta.hot))
}
