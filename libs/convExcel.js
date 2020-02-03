import XLSX from "xlsx";

const workbook = XLSX.readFile("./LTM_1500-8.1.xlsx");
const getTableData = workbook.SheetNames;

export default getTableData;