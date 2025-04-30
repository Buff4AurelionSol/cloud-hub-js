import * as XLSX from 'xlsx'

 export function exportTable(data, name){
    const newData = normalizedData(data);
    const workSheet = XLSX.utils.json_to_sheet(newData);
    const newWorkSheet = configureWorkSheet(workSheet)
    const workBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workBook, newWorkSheet, name, true)
    XLSX.writeFile(workBook, name +=".xlsx")
  }

  function configureWorkSheet(workSheet){
    workSheet['!cols'] = [];
    workSheet['!cols'][2] = { width: 15};
    workSheet['!cols'][3] = { width: 15};
    workSheet['!cols'][4] = {width: 18};
    workSheet['!cols'][5] = {width: 18};
    workSheet['!cols'][6] = {width: 20};
    workSheet['!cols'][8] = {width: 30};
    workSheet['!cols'][9] = {width: 20};
    workSheet['!cols'][10] = {width: 20};
    workSheet['!cols'][11] = {width: 20};
    workSheet['!cols'][12] = {width: 18};
    workSheet['!cols'][13] = {width: 15};
    return workSheet
  }

  function normalizedData(data){
    return data.map((row)=>{
      const newRow = {...row}
      for(const key in newRow){
        if(Array.isArray(newRow[key])){
          newRow[key] = newRow[key].join(';')
        }
      }
      return newRow
    })
  }