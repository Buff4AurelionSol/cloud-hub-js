import { handleAxiosError } from '@/utils/axiosErrorHandler'
import axios from 'axios'

export const useConsultasServices = () => {
  /**
   * Obtiene la cantidad de usos de vpos de una fecha especifica
   * @param {Number} mes El mes de la solicitud, del 1 al 12
   * @param {Number} anio El año de la solicitud
   * @returns {Promise<Object>} Objeto con la lista de los de los reportes realizados
   */
  const getVPOS = async (mes = null, anio = null) => {
    const m = mes || 1
    const a = anio || new Date().getFullYear()
    try {
      const { data } = await axios.get('/info/actividad/vpos/' + m + '/' + a)
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
    getVPOS,
  }
}
