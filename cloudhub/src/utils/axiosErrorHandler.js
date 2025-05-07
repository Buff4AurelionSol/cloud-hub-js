import { isAxiosError } from 'axios'

export const handleAxiosError = error => {
  if (isAxiosError(error)) {
    if (error.response && error.response.data) {
      const { mensaje, errors } = error.response.data

      if (errors && typeof errors === 'object') {
        const validationMessages = Object.values(errors)
          .flat()
          .join(', ')
        console.error(`Errores de validación: ${validationMessages}`)
        return {
          success: false,
          mensaje: validationMessages,
        }
      }

      const finalMessage =
        mensaje || error.response.data.error || error.response.data.message
      console.error(`Error: ${finalMessage}`)

      if (typeof finalMessage === 'object' && !Array.isArray(finalMessage)) {
        return {
          success: false,
          mensaje: Object.values(finalMessage).flat().join(', '),
        }
      }
      return {
        success: false,
        mensaje: Array.isArray(finalMessage)
          ? finalMessage.join(', ')
          : finalMessage,
      }
    } else if (error.request) {
      console.error('No se recibió respuesta del servidor:', error.request)
      return {
        success: false,
        mensaje: 'No se recibió respuesta del servidor',
      }
    } else {
      console.error(
        'Error en la configuración de la solicitud:',
        error.message,
      )
      return {
        success: false,
        mensaje: 'Error en la configuración de la solicitud',
      }
    }
  } else {
    console.error('Error desconocido:', error)
    return {
      success: false,
      mensaje: 'Error desconocido:',
    }
  }
}
