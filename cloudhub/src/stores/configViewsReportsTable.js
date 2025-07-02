export const configMap = {
    BOLIVARES: {
      'POR FACTURAR': {
        tableType: 'Por facturar',
        columns: COLUMNS_BY_TYPE['Por Facturar'],
        estado: OPTIONS_STATES_REPORTS['En facturacion'],
      },
      FACTURADOS: {
        tableType: 'Facturados',
        columns: COLUMNS_BY_TYPE['Facturados'],
        estado: OPTIONS_STATES_REPORTS.Facturado,
      },
      RECHAZADOS: {
        tableType: 'Rechazados',
        columns: COLUMNS_BY_TYPE['Rechazados'],
        estado: OPTIONS_STATES_REPORTS.Rechazado,
      },
      'POR VERIFICAR': {
        tableType: 'Por verificar',
        columns: COLUMNS_BY_TYPE['Por verificar'],
        estado: OPTIONS_STATES_REPORTS['Por verificar'],
      },
    },
    DIVISAS: {
      'POR FACTURAR': {
        tableType: 'Divisas/Por facturar',
        columns: COLUMNS_BY_TYPE['Divisas/Por Facturar'],
        estado: OPTIONS_STATES_REPORTS['En facturacion'],
      },
      FACTURADOS: {
        tableType: 'Divisas/Facturados',
        columns: COLUMNS_BY_TYPE['Divisas/Facturados'],
        estado: OPTIONS_STATES_REPORTS.Facturado,
      },
      RECHAZADOS: {
        tableType: 'Divisas/Rechazados',
        columns: COLUMNS_BY_TYPE['Divisas/Rechazados'],
        estado: OPTIONS_STATES_REPORTS.Rechazado,
      },
      'POR VERIFICAR': {
        tableType: 'Divisas/Por verificar',
        columns: COLUMNS_BY_TYPE['Divisas/Por Verificar'],
        estado: OPTIONS_STATES_REPORTS.Facturado, // ← verifica si este es correcto
      },
    },
  }
