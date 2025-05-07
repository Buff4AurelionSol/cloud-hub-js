import useUtils from '@/utils/utils'
import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

export const useReporteStore = defineStore('reporte', () => {
  const reportesServices = useReportesServices()
  const utils = useUtils()

  const reporte = ref(null)

  const getReporte = computed(() => reporte.value)

  const getContratosUsuarios = computed(() => {
    return reporte.value?.contratos_usuario?.map(c => {
      const [contrato, nombre, rif] = c.split('--')
      return {
        contrato,
        nombre,
        rif,
      }
    })
  })

  const getUsuariosReporte = computed(() => {
    return getContratosUsuarios.value.filter(
      usuario => reporte.value?.contratos_reporte.includes(usuario.contrato)
    )
  })

  const getTransacciones = computed(() => {
    return reporte.value?.transaccions
  })

  const getFacturas = computed(() => {
    return reporte.value?.facturas
  })

  const canSplit = computed(() => {
    return getTransacciones.value?.length > 1 &&
        reporte.value.estado?.toLowerCase() !== 'facturado' &&
        reporte.value.estado?.toLowerCase() !== 'rechazado'
  })

  const setReporte = rep => {
    reporte.value = rep
  }

  const reporteIsEqual = rep => {
    return rep?.estado === reporte.value?.estado &&
      rep?.tipo_reporte === reporte.value?.tipo_reporte &&
      rep?.fecha_reporte === reporte.value?.fecha_reporte &&
      utils.arrayIsEqual(rep?.contratos_reporte, reporte.value?.contratos_reporte)
  }

  const fetchReporte = async id => {
    try {
      const result = await reportesServices.getReporte(id)
      setReporte(result.data?.reporte)
    } catch (error) {
      console.log(error)
    }
  }

  return {
    getReporte,
    getContratosUsuarios,
    getUsuariosReporte,
    getTransacciones,
    getFacturas,
    canSplit,

    reporteIsEqual,
    fetchReporte,
  }
})
