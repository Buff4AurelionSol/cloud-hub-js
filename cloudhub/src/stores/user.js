import { handleAxiosError } from '@/utils/axiosErrorHandler'
import axios from 'axios'

export const useUserServices = () => {
  /**
   * Obtiene el usuario conectado.
   *
   * @param {string} [token=null] - Token de authentication (opcional).
   *
   * @returns {Promise<Object>} - Un objeto que indica el resultado de la operación.
   */
  const getUser = async (token = null) => {
    try {
      // Si se pasa un token, lo usamos; de lo contrario, se usará el interceptor
      const { data } = await axios.get('/user', {
        headers: {
          Authorization: token ? `Bearer ${token}` : undefined, // Token pasado directamente
        },
      })

      if (!data.success) {
        return {
          success: false,
          mensaje: data.mensaje,
        }
      }

      return {
        success: true,
        user: data.user,
      }
    } catch (error) {
      return handleAxiosError(error)
    }
  }

  /**
   * Registra una solicitud para recuperar el usuario.
   *
   * @param {Object} params - Parámetros para realizar la operación.
   * @param {string} params.email - EL correo del usuario.
   *
   * @returns {Promise<Object>} - Un objeto que indica el resultado de la operación.
   */
  const postRecover = async params => {
    try {
      const { data } = await axios.post('/user/send/password/code', params)
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
   * Cambia la contraseña del usuario.
   *
   * @param {Object} params - Parámetros para cambiar la contraseña.
   * @param {string} params.password - La nueva contraseña del usuario.
   * @param {string} params.password_confirmation - La nueva contraseña del usuario.
   * @param {string} [token=null] - Token de authentication (opcional).
   *
   * @returns {Promise<Object>} - Un objeto que índica el resultado de la operación.
   */
  const postChangePassword = async (params, token) => {
    try {
      const route = token ? '/user/reset/password' : '/user/password'
      const config = token
        ? {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        : {}
      const { data } = await axios.post(route, params, config)
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
   * Verífica el OTP de cambio de contraseña.
   *
   * @param {Object} params - Parámetros para cambiar la contraseña.
   * @param {string} params.codigo - El OTP a verificar.
   *
   * @returns {Promise<Object>} - Un objeto que índica el resultado de la operación.
   */
  const postOTPPasswordVerify = async params => {
    try {
      const { data } = await axios.post('/user/password/code/check', params)
      if (!data.success) {
        return {
          success: false,
          mensaje: data.mensaje,
        }
      }
      return {
        success: true,
        token: data.data.token,
      }
    } catch (error) {
      return handleAxiosError(error)
    }
  }

  /**
   * Inicia sesión en la aplicación.
   *
   * @param {Object} params - Parámetros para realizar la operación.
   * @param {string} params.[email] - El correo electrónico del usuario.
   * @param {string} params.[password] - La contraseña del usuario.
   * @param {string} params.[credencial_google] - Las credenciales de google.
   * @param {string} params.[tipoAuth] - Tipo de autenticación de google.
   * @returns {Promise<Object>} - Un objeto que índica el resultado de la operación.
   */
  const login = async params => {
    try {
      const { data } = await axios.post('/login', params)
      if (!data.success) {
        return {
          success: false,
          mensaje: data.mensaje,
        }
      }
      return {
        success: true,
        data: data.data,
        token: data.token,
      }
    } catch (error) {
      return handleAxiosError(error)
    }
  }

  /**
   * Cierra sesión de la aplicación.
   *
   * @returns {Promise<void>} - No devuelve nada.
   */
  const logout = async () => {
    try {
      await axios.post('/logout')
    } catch (error) {}
  }

  return {
    getUser,
    postRecover,
    postChangePassword,
    postOTPPasswordVerify,
    login,
    logout,
  }
}
