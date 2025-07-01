import { isAxiosError } from "axios";

export const handleAxiosError = (error) => {
  if (isAxiosError(error)) {
    if (error.response && error.response.data) {
      const { mensaje, errors } = error.response.data;

      if (errors && typeof errors === "object") {
        const validationMessages = Object.values(errors).flat().join(", ");
        console.error(`Errores de validación: ${validationMessages}`);
        return {
          success: false,
          mensaje: validationMessages,
        };
      }

      let finalMessage =
        mensaje || error.response.data.error || error.response.data.message;

      // Si el mensaje es un array, lo unimos en un string
      if (Array.isArray(finalMessage)) {
        finalMessage = finalMessage.join(", ");
      }

      // Si el mensaje es un objeto, lo convertimos a string
      if (typeof finalMessage === "object" && finalMessage !== null) {
        finalMessage = Object.values(finalMessage).flat().join(", ");
      }

      console.error(`Error: ${finalMessage}`);

      return {
        success: false,
        mensaje: finalMessage,
      };
    } else if (error.request) {
      console.error("No se recibió respuesta del servidor:", error.request);
      return {
        success: false,
        mensaje: "No se recibió respuesta del servidor",
      };
    } else {
      console.error(
        "Error en la configuración de la solicitud:",
        error.message,
      );
      return {
        success: false,
        mensaje: "Error en la configuración de la solicitud",
      };
    }
  } else {
    console.error("Error desconocido:", error);
    return {
      success: false,
      mensaje: "Error desconocido:",
    };
  }
};
