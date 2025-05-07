
import { handleAxiosError } from '@/utils/axiosErrorHandler'
import axios from 'axios'

export const usePaymentsServices = () => {
  /**
   * Obtiene un reporte mediante ID.
   *
   * @param {Object} id - ID encriptando del reporte a solicitar.
   * @returns {Promise<Object>} - Un objeto que contiene el resultado de la operación.
   *   - success: {boolean} - Índica si la operación fue exitosa.
   *   - data: {Array} - Lista de reportes si la operación fue exitosa.
   *   - mensaje: {string} - Mensaje de error si ocurre un problema.
   * @throws {Error} - Si ocurre un error durante la creación de la aplicación.
   */
  const getPayment = async id => {
    try {
      const { data } = await axios.get(`/reporte/${id}`)
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
   * Obtiene los tipos de transacciones disponibles
   * @returns {Promise<Object>} - Un objeto que contiene el resultado de la operación.
   *   — success: {boolean} - Índica si la operación fue exitosa.
   *   — mensaje: {string} - Mensaje de error si ocurre un problema.
   *   — data: {array} - Lista de RIF tipos si la operación fue exitosa.
   * @throws {Error} - Si ocurre un error durante la operación.
   */
  const getTipoTransacciones = async () => {
    try {
      const { data } = await axios.get('/tipo/transacciones')
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
   * Obtiene la factura indicada.
   *
   * @param {string} hash - El identificador del comprobante a obtener.
   *
   * @returns {Promise<Object>} - Un objeto que contiene el resultado de la operación.
   *   — success: {boolean} - Índica si la operación fue exitosa.
   *   — mensaje: {string} - Mensaje de error si ocurre un problema.
   *   — data: {Array} - Lista de facturas si la operación fue exitosa.
   * @throws {Error} - Si ocurre un error durante la creación de la aplicación.
   */
  const getInvoice = async hash => {
    try {
      const { data } = await axios.get(`/factura/descargar/${hash}`)
      if (!data.success) {
        return {
          success: false,
          mensaje: data.mensaje,
        }
      }
      return {
        success: true,
        file: data.data.file,
      }
    } catch (error) {
      return handleAxiosError(error)
    }
  }

  /**
   * Obtiene un comprobante en formato de imagen.
   *
   * @param {string} id - El identificador del comprobante a obtener.
   * @returns {Promise<Object>} - Un objeto que contiene el resultado de la operación.
   *   - success: {boolean} - Indica si la operación fue exitosa.
   *   - img: {string} - URL del blob de la imagen si la operación fue exitosa.
   *   - mensaje: {string} - Mensaje de error si ocurre un problema.
   */
  const getVoucher = async id => {
    try {
      const response = await axios.get(`/comprobante/obtener/${id}`, {
        responseType: 'arraybuffer',
      })
      const blob = new Blob([response.data], {
        type: response.headers['content-type'],
      })
      return {
        success: true,
        url: URL.createObjectURL(blob),
      }
    } catch (error) {
      return handleAxiosError(error)
    }
  }

  /**
   * Guarda un comprobante.
   *
   * @param {File} file - El archivo del comprobante a cargar.
   * @returns {Promise<Object>} - Un objeto que indica el resultado de la operación.
   */
  const postSaveVoucher = async file => {
    try {
      const { data } = await axios.post('/comprobante/cargar', file)
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
   * Elimina un comprobante.
   *
   * @param {Object} params - Los datos del comprobante a eliminar.
   * @param {string} params.id - ID del comprobante a eliminar.
   * @returns {Promise<Object>} - Un objeto que indica el resultado de la operación.
   *   - success: {boolean} - Indica si la eliminación fue exitosa.
   *   - data: {Object} - Datos devueltos por la API si la eliminación fue exitosa.
   *   - error: {Object} - Mensaje de error si ocurre un problema.
   */
  const deleteVoucher = async params => {
    try {
      const { data } = await axios.delete('/comprobante/borrar', params)
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
   * Realiza un pago.
   *
   * @param {Object} params - Los datos del reporte a enviar.
   * @param {string} params.tipo_reporte - El tipo de reporte (ej. "MENSUALIDAD").
   * @param {string} params.contratos_seleccionados - Contratos seleccionados para el reporte.
   * @param {string} params.nro_doc - Números de documentos relacionados, separados por comas.
   * @param {Array<Object>} params.transaccions - Lista de transacciones a reportar.
   * @param {Object} params.transaccions[].banco_destino - ID del banco destino.
   * @param {Object} params.transaccions[].banco_origen - ID del banco origen.
   * @param {string|null} params.transaccions[].cedula_depositante - Cédula del depositante (puede ser null).
   * @param {string} params.transaccions[].fecha_transaccion - Fecha de la transacción en formato ISO.
   * @param {number} params.transaccions[].moneda - ID de la moneda utilizada.
   * @param {number} params.transaccions[].monto_transaccion - Monto de la transacción.
   * @param {number} params.transaccions[].monto_usd - Monto en USD.
   * @param {boolean} params.transaccions[].pago_proveedor - Indica si es un pago a proveedor.
   * @param {string} params.transaccions[].referencia - Referencia de la transacción.
   * @param {number} params.transaccions[].tipo_transaccion - Tipo de transacción (ej. 1 para normal).
   * @param {string|null} params.transaccions[].id_comprobante - ID del comprobante (puede ser null).
   * @param {string} params.contrato - Contrato asociado.
   * @param {number} params.monto - Monto de la transacción.
   * @param {Object} params.idCardType - Tipo de tarjeta utilizada.
   * @param {string} params.CardNumber - Número de la tarjeta.
   * @param {string} params.dtExpiration - Fecha de expiración de la tarjeta.
   * @param {string} params.AccountType - Tipo de cuenta de la tarjeta.
   * @param {string} params.CardPIN - PIN de la tarjeta.
   * @param {string} params.cvv - CVV de la tarjeta.
   * @param {string} params.CardHolderID - Cédula del titular de la tarjeta.
   * @returns {Promise<Object>} - Un objeto que contiene el resultado de la operación.
   *   - success: {boolean} - Indica si la operación fue exitosa.
   *   - mensaje: {string} - Mensaje de error si ocurre un problema.
   */
  const postPayment = async params => {
    try {
      let route
      if (
        'transaccions' in params &&
        params.transaccions[0].tipo_transaccion === 6 &&
        params.transaccions.length === 1
      ) {
        route = '/reporte/pagomovil'
      } else if ('CardNumber' in params && !('transaccions' in params)) {
        route = 'cloudpayments/bnc/pos'
      } else {
        route = 'cloudpayments/reporte/reportar'
      }
      const { data } = await axios.post(route, params)
      if (!data.success) {
        return {
          success: false,
          mensaje: data.mensaje,
        }
      }
      return {
        success: true,
      }
    } catch (error) {
      return handleAxiosError(error)
    }
  }

  /**
   * Obtiene los métodos de pago disponibles.
   *
   * @returns {Promise<Object>} - Un objeto que contiene el resultado de la operación.
   *   — success: {boolean} - Índica si la operación fue exitosa.
   *   — mensaje: {string} - Mensaje de error si ocurre un problema.
   *   — data: {array} - Lista de RIF tipos si la operación fue exitosa.
   * @throws {Error} - Si ocurre un error durante la operación.
   */
  const getServerPaymentMethods = async () => {
    try {
      const { data } = await axios.get('/metodo/pagos')
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
   * Crea un nuevo metodo de pago
   * @param {Object} params Los datos del nuevo método
   * @returns {Promise<Object>} Un objeto que contiene el resultado de la operación.
   *   - success: {boolean} - Indica si la operación fue exitosa.
   *   - mensaje: {string} - Mensaje de error si ocurre un problema.
   */
  const postServerPaymentMethod = async params => {
    try {
      const { data } = await axios.post('/metodo/pagos', {
        banco_id: params.banco,
        empresa_id: params.empresa,
        transacciontipo_id: params.tipo,
        descripcion: params.descripcion,
        activo: true,
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

  /**
   * Modifica un nuevo metodo de pago existente
   * @param {Number} id ID del método a modificar
   * @param {Object} params Los datos del nuevo método
   * @returns {Promise<Object>} Un objeto que contiene el resultado de la operación.
   *   - success: {boolean} - Indica si la operación fue exitosa.
   *   - mensaje: {string} - Mensaje de error si ocurre un problema.
   */
  const editServerPaymentMethod = async (id, params) => {
    try {
      const { data } = await axios.put('/metodo/pagos/' + id, {
        banco_id: params.banco,
        empresa_id: params.empresa,
        transacciontipo_id: params.tipo,
        descripcion: params.descripcion,
        activo: params.activo,
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

  const deleteServerPaymentMethod = async id => {
    try {
      const { data } = await axios.delete('/metodo/pagos/' + id)
      if (!data.success) {
        return {
          success: false,
          mensaje: data.mensaje,
        }
      }
      return {
        success: true,
        data: data.data,
        mensaje: data.mensaje,
      }
    } catch (error) {
      return handleAxiosError(error)
    }
  }

  /**
   * Obtiene la tasa del día.
   *
   * @returns {Promise<Object>} - Un objeto que contiene el resultado de la operación.
   *   — success: {boolean} - Índica si la operación fue exitosa.
   *   — mensaje: {string} - Mensaje de error si ocurre un problema.
   *   — data: {object} - El objeto con la tasa si la operación fue exitosa.
   * @throws {Error} - Si ocurre un error durante la operación.
   */
  const getTasa = async () => {
    try {
      const { data } = await axios.get('/tasa-bcv')
      return data
    } catch (error) {
      return handleAxiosError(error)
    }
  }

  /**
   * Obtiene la lista de todas las tasas registradas
   * @returns {Promise<Object>} - Un objeto que contiene el resultado de la operación.
   *   — success: {boolean} - Índica si la operación fue exitosa.
   *   — mensaje: {string} - Mensaje de error si ocurre un problema.
   *   — data: {object} - El objeto con la tasa si la operación fue exitosa.
   * @throws {Error} - Si ocurre un error durante la operación.
   */
  const getListaTasas = async () => {
    try {
      /* const { data } = await axios.get('/tasa-bcv')
      return data */
      return {
        success: true,
        data: LISTA_TASAS,
      }
    } catch (error) {
      return handleAxiosError(error)
    }
  }

  /**
   * Obtiene los bancos disponibles.
   *
   * @returns {Promise<Object>} - Un objeto que contiene el resultado de la operación.
   *   — success: {boolean} - Índica si la operación fue exitosa.
   *   — mensaje: {string} - Mensaje de error si ocurre un problema.
   *   — data: {array} - Lista de bancos si la operación fue exitosa.
   * @throws {Error} - Si ocurre un error durante la operación.
   */
  const getBanks = async () => {
    try {
      const { data } = await axios.get('/banco')
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
   * Obtiene las monedas disponibles.
   *
   * @returns {Promise<Object>} - Un objeto que contiene el resultado de la operación.
   *   — success: {boolean} - Índica si la operación fue exitosa.
   *   — mensaje: {string} - Mensaje de error si ocurre un problema.
   *   — data: {array} - Lista de monedas si la operación fue exitosa.
   * @throws {Error} - Si ocurre un error durante la operación.
   */
  const getCurrencys = async () => {
    try {
      const { data } = await axios.get('/banco/monedas')
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
    getPayment,
    getServerPaymentMethods,
    getTipoTransacciones,
    getInvoice,
    getVoucher,
    deleteVoucher,
    postSaveVoucher,
    postPayment,
    postServerPaymentMethod,
    editServerPaymentMethod,
    deleteServerPaymentMethod,
    getTasa,
    getListaTasas,
    getBanks,
    getCurrencys,
  }
}
