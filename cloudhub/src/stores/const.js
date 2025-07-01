export const OPTIONS_ORDER_BY = [
  "Por defecto",
  "Referencia",
  "Monto Bs",
  "Contrato",
  "Cliente",
  "Rif/Cedula",
  "Banco destino",
  "Banco origen"
]

export const OPTIONS_TRANSACTION = [
  "TODOS",
  "TRANSFERENCIA",
  "DEPÓSITO",
  "BANESCO PAGOS",
  "MULTIPAGO",
  "PAGO MÓVIL",
  "C2P",
  "EFECTIVO",
  "PDV",
  "POS VIRTUAL",
  "DEBIN BNC",
  "CRÉDITO INMEDIATO",
  "DÉBITO INMEDIATO",
  "BIOPAGO"
]

export const ALL_HEADERS = [
  { key: 'id', label: '#' },
  { key: 'estado', label: 'Estado' },
  { key: 'referencia', label: 'Referencia Bancaria' },
  { key: 'tipo_reporte', label: 'Tipo Reporte' },
  { key: 'monto_transaccion', label: 'Monto Transacción' },
  { key: 'monto_dolar', label: 'Monto ($)' },
  { key: 'tasa', label: 'Tasa' },
  { key: 'contratos', label: 'Contratos' },
  { key: 'cliente', label: 'Cliente' },
  { key: 'rif', label: 'Rif/Cédula' },
  { key: 'banco_destino', label: 'Banco D.' },
  { key: 'banco_origen', label: 'Banco O.' },
  { key: 'tipo_transaccion', label: 'Tipo Transacción' },
  { key: 'fecha_transaccion', label: 'Fecha Transacción' },
  { key: 'fecha_reporte', label: 'Fecha Reporte' },
  { key: 'ver_detalles', label: 'Ver detalles' },
  { key: 'factura', label: 'Factura' },
  { key: 'fecha_factura', label: 'Fecha Factura' },
  { key: 'motivo_rechazo', label: 'Motivo Rechazo' },
  { key: 'deuda', label: 'Deuda ID/Recibo' }
]

// src/constants/columns.ts

export const COMMON_COLUMNS = [
  { title: 'id', value: 'ID' },
  { title: 'created_at', value: 'FECHA REPORTE' },
]

export const REPORTE_COLUMNS = [
  { title: 'tipo_reporte', value: 'TIPO REPORTE' },
  { title: 'reporteestado.estado', value: 'ESTADO' },
]

export const TRANSACCION_COLUMNS = [
  { title: 'transaccions.referencia', value: 'REFERENCIA' },
  { title: 'transaccions.bancoorigen.nombre', value: 'BANCO ORIGEN' },
  { title: 'transaccions.bancodestino.nombre', value: 'BANCO DESTINO' },
  { title: 'transaccions.monto', value: 'MONTO' },
  { title: 'transaccions.monto_usd', value: 'MONTO USD' },
  { title: 'transaccions.tasa', value: 'TASA' },
  { title: 'transaccions.transacciontipo.tipo', value: 'TIPO TRANSACCIÓN' },
  { title: 'transaccions.transacciontipo.created_at', value: 'FECHA TRANSACCIÓN' },
]

export const CONTRATO_COLUMNS = [
  { title: 'contrato.nombre', value: 'CLIENTE' },
  { title: 'contrato.contrato', value: 'CONTRATO(S)' },
  { title: 'contrato.rif_id', value: 'RIF/CEDULA' },
]

export const FACTURA_COLUMNS = [
  { title: 'factura.factura', value: 'FACTURA(S)' },
  { title: 'factura.fecha', value: 'FECHA FACTURA' },
]

export const MOTIVO_RECHAZO = [
  { title: 'motivo_rechazo', value: 'MOTIVO RECHAZO' }
]

export const DEUDA = [
  { title: 'deuda', value: 'DEUDA' }
]
export const COLUMNS_BY_TYPE = {
  'Por Facturar': [
    ...COMMON_COLUMNS,
    ...REPORTE_COLUMNS,
    ...TRANSACCION_COLUMNS,
    ...CONTRATO_COLUMNS,
  ],
  'Facturados': [
    ...COMMON_COLUMNS,
    ...REPORTE_COLUMNS,
    ...TRANSACCION_COLUMNS,
    ...CONTRATO_COLUMNS,
    ...FACTURA_COLUMNS
  ],
  'Rechazados': [
    ...COMMON_COLUMNS,
    ...REPORTE_COLUMNS,
    ...TRANSACCION_COLUMNS,
    ...CONTRATO_COLUMNS,
    ...MOTIVO_RECHAZO
  ],
  'Por verificar': [
    ...COMMON_COLUMNS,
    ...TRANSACCION_COLUMNS,
    ...CONTRATO_COLUMNS,
    ...DEUDA

  ],
  'Divisas/Por Facturar': [
    ...COMMON_COLUMNS,
    ...REPORTE_COLUMNS,
    ...TRANSACCION_COLUMNS,
    ...CONTRATO_COLUMNS
  ],
  'Divisas/Facturados': [
    ...COMMON_COLUMNS,
    ...REPORTE_COLUMNS,
    ...TRANSACCION_COLUMNS,
    ...CONTRATO_COLUMNS,
    ...FACTURA_COLUMNS
  ],
  'Divisas/Rechazados': [
    ...COMMON_COLUMNS,
    ...REPORTE_COLUMNS,
    ...TRANSACCION_COLUMNS,
    ...CONTRATO_COLUMNS,
    ...MOTIVO_RECHAZO
  ],
  'Divisas/Por Verificar': [
    ...COMMON_COLUMNS,
    ...TRANSACCION_COLUMNS,
    ...CONTRATO_COLUMNS,
    ...DEUDA
  ]

}
export const OPTIONS_STATES_REPORTS = {
  'Por verificar': 1,
  'Exonerado': 2,
  'En verificacion': 3,
  'Rechazado': 4,
  'Verificado': 5,
  'En facturacion': 6,
  'Facturado': 7,
  'Recibo': 8,
  'Conciliar Manual': 9,
  'Por confirmar Banesco': 10,
  'Por revisar': 11,
  'En Espera de Deposito': 12,
};

export const OPTIONS_MONEDA = {
  'BOLIVARES': 1,
  'DOLARES': 2,
};
