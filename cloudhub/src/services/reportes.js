import { handleAxiosError } from "@/utils/axiosErrorHandler";
import axios from "axios";

export const useReportesServices = () => {
 

  /**
   * Obtiene una lista paginada de reportes
   * @param {Number} page Página a consultar
   * @param {Number} perPage Cantidad de elementos por página
   * @returns {Promise<Object>} Resultado de la operación
   */
  const getReportesPaginados = async (page, perPage) => {
    try {
      const { data } = await axios.get(
        `/cloudpayments/reporte/get/paginate`,{
          params:{
            page,
            perPage
          }
        }
      );
      if (!data.success) {
        return {
          success: false,
          mensaje: data.mensaje,
        };
      }
      return {
        success: true,
        data: data.data,
        total_pages: data.total_pages
      };
    } catch (error) {
      return handleAxiosError(error);
    }
  };



  /**
   * Obtiene una lista paginada de reportes
   * @param {Number} page Página a consultar
   * @param {Number} perPage Cantidad de elementos por página
   * @param {Number} moneda El tipo de moneda (Bolivares-Dolares)
   * @param {Number} estado El estado del Reporte (Por facturar, Facturado, etc...)
   * @returns {Promise<Object>} Resultado de la operación
   */
  const getReportPaginadosTipoReporteMoneda = async (page, perPage, moneda, estado ) => {
    try {
      const {data} = await axios.get(
         `/cloudpayments/reporte/get/paginate`,{
          params:{
            page,
            perPage,
            estado,
            moneda
          }
        }
      );
      if (!data.success) {
        return {
          success: false,
          mensaje: data.mensaje,
        };
      }
      return {
        success: true,
        data: data.data,
        total_pages: data.total_pages
      };

    }
    catch(error){
      return handleAxiosError(error)
    }
  }


  return {
    getReportesPaginados,
    getReportPaginadosTipoReporteMoneda

  };
};
