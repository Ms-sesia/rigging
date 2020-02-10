import XLSX from "xlsx";

const workbook = XLSX.readFile("./LTM_1500-8.1.xlsx");

let excelLength = [];
workbook.SheetNames.forEach( (sheetname, index) => {
  const tableRowLength = Object.keys(XLSX.utils.sheet_to_json(workbook.Sheets[sheetname], {header : "A"})).length;  // 선택한 시트의 행의 개수
  const tableColumLength = Object.keys(XLSX.utils.sheet_to_json(workbook.Sheets[sheetname], {header : "A"})[0]).length; //선택한 시트의 열의 개수
  excelLength[index] = {
    raw : tableRowLength,
    colum : tableColumLength,
  };
});

const getTableData = {
  name : workbook.SheetNames, // 엑셀파일에서 가져온 시트명.
  data : workbook.Sheets, // 시트의 데이터들. workbook.Sheets[시트명] > 시트명에 해당하는 데이터들
  length : excelLength,
};

export default getTableData;