import { handleAxiosError } from '@/utils/axiosErrorHandler'
import axios from 'axios'

export const useReportesServices = () => {
  /**
     * Obtiene los reportes efectivos por cobradores
     * @returns
     */
  const getEfectivos = async () => {
    try {
      const { data } = await axios.get(`/get/reportes/por-entregar/efectivo`)
      if (!data.success) {
        return {
          success: false,
          mensaje: data.mensaje,
        }
      }
      return {
        success: true,
        data: data.data,
      }
    } catch (error) {
      return handleAxiosError(error)
    }
  }

  /**
   * Obtiene un reporte a traves de una id
   * @param {Number} id ID del reporte a buscar
   * @returns {Promise<Object>} Los resultados de la operación
   */
  const getReporte = async id => {
    try {
      const { data } = await axios.get(`/cloudpayments/reportes/buscar/` + id)
      if (!data.success) {
        return {
          success: false,
          mensaje: data.mensaje,
        }
      }
      return {
        success: true,
        data: data.data,
      }
    } catch (error) {
      return handleAxiosError(error)
    }
  }

  return {
    getEfectivos,
    getReporte,
  }
}
