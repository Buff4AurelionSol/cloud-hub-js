import * as XLSX from 'xlsx-js-style'

  export function exportTable(data, visibleColumns, formatedValueFn, typeTable) {
    const newData = normalizedData(data, visibleColumns, formatedValueFn);
    const workSheet = XLSX.utils.json_to_sheet(newData);
    const newWorkSheet = configureWorkSheet(workSheet, newData);
    const workBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workBook, newWorkSheet, name, true);

    const now = new Date();
    const date = now.toISOString().split('T')[0]; 

    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');

    const timestamp = `${date}_${hours}-${minutes}-${seconds}`;
    const fileName = `${typeTable}-${timestamp}.xlsx`;

    XLSX.writeFile(workBook, fileName);
  }

function configureWorkSheet(workSheet, data) {
  if (!data.length) return workSheet;

  const keys = Object.keys(data[0]);

  // Calcular anchos de columna
  const columnWidths = keys.map(key => {
    const maxContentLength = data.reduce((max, row) => {
      const cell = row[key];
      const length = String(cell ?? '').length;
      return length > max ? length : max;
    }, key.length);

    return { width: maxContentLength + 2 };
  });

  workSheet['!cols'] = columnWidths;

  // Define estilo de borde simple para todas las celdas
  const borderStyle = {
    top: { style: "thin", color: { rgb: "000000" } },
    bottom: { style: "thin", color: { rgb: "000000" } },
    left: { style: "thin", color: { rgb: "000000" } },
    right: { style: "thin", color: { rgb: "000000" } }
  };

  const numRows = data.length + 1; // +1 para la fila de encabezado
  const numCols = keys.length;

  // Aplica bordes a todas las celdas
  for (let row = 0; row < numRows; row++) {
    for (let col = 0; col < numCols; col++) {
      const cellAddress = XLSX.utils.encode_cell({ c: col, r: row });
      const cell = workSheet[cellAddress];
      if (cell) {
        // Si es fila encabezado (row === 0), agrega fondo azul y negrita además del borde
        if (row === 0) {
          cell.s = {
            fill: { fgColor: { rgb: "DCE6F1" } },
            font: { bold: true, color: { rgb: "1F4E78" } },
            alignment: { horizontal: "center", vertical: "center" },
            border: borderStyle
          };
        } else {
          // Para filas normales solo bordes y alineación
          cell.s = {
            border: borderStyle,
            alignment: { horizontal: "left", vertical: "center" }
          };
        }
      }
    }
  }

  return workSheet;
}




  function normalizedData(data, visibleColumns, formatedValueFn) {
    return data.map((row, index) => {
      const newRow = {
        '#': index + 1
      };

      visibleColumns.forEach((col) => {
        let value = formatedValueFn(row, col.title);
        if (Array.isArray(value)) {
          value = value.join(', ');
        } else if (value === null || value === undefined || value === '') {
          value = 'No hubo coincidencias';
        }
        newRow[col.value] = value;
      });

      return newRow;
    });
}
