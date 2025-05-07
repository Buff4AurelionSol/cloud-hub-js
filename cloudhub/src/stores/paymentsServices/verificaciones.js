import { handleAxiosError } from '@/utils/axiosErrorHandler'
import axios from 'axios'

export const useVerificacionesServices = () => {
  /**
   * Verifica una transaccion realizado por Pago Móvil
   * @param {Object} params Parametros
   * @param {string} params.banco ID del banco
   * @param {Date} params.fecha Fecha del reporte
   * @param {String} params.referencia Numero de referencia
   * @param {Number} params.monto Monto de la transacción
   * @returns {Object} Resultados de la operacion
   */
  const verificarPagoMovil = async params => {
    try {
      const { data } = await axios.get(`cloudpayments/conformacion/banco/tesoro`, {
        params,
      })
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

  const verificarBNC = async params => {
    try {
      const { data } = await axios.get(`cloudpayments/bnc/validate/transaccion/` + params.reference + '/' + params.dateMovement)
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
    verificarPagoMovil,
    verificarBNC,
  }
}
