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
   * Obtiene una lista paginada de reportes filtradas por una moneda y un estado de reporte
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

  /**
   * Obtiene una lista paginada de reportesfiltradas por un orden 
   * @param {Number} page Página a consultar
   * @param {Number} perPage Cantidad de elementos por página
   * @param {String} order_by Criterio para ordenar 
   * @returns {Promise<Object>} Resultado de la operación
   */
  const getReportOrderBy = async (page, perPage, order_by) => {
    try {
      const {data} = await axios.get(
         `/cloudpayments/reporte/get/paginate`,{
          params:{
            page,
            perPage,
            order_by
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

    /**
   * Obtiene una lista paginada de reportes filtradas por el tipo de reporte
   * @param {Number} page Página a consultar
   * @param {Number} perPage Cantidad de elementos por página
   * @param {String} order_by Tipo de Reporte 
   * @returns {Promise<Object>} Resultado de la operación
   */
  const getReportByType = async (page, perPage, tipo_reporte ) => {
    try {
      const {data} = await axios.get(
         `/cloudpayments/reporte/get/paginate`,{
          params:{
            page,
            perPage,
            tipo_reporte
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
    /**
   * Obtiene una lista paginada de reportes filtradas por el tipo de reporte
   * @param {Number} page Página a consultar
   * @param {Number} perPage Cantidad de elementos por página
   * @param {String} order_by Tipo de Reporte 
   * @returns {Promise<Object>} Resultado de la operación
   */
  const getReportByDate = async (page, perPage, fecha_ini, fecha_fin ) => {
    try {
      const {data} = await axios.get(
         `/cloudpayments/reporte/get/paginate`,{
          params:{
            page,
            perPage,
            fecha_ini,
            fecha_fin
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
    getReportPaginadosTipoReporteMoneda,
    getReportOrderBy,
    getReportByType,
    getReportByDate

  };
};
