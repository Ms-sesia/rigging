import XLSX from "xlsx";
import fs from "fs";
import path from "path";

const getExcelData = (loadDirName) => {
  const cwd = path.join(__dirname, "../", "./excelData", `./${loadDirName}`);
  const filelist = fs.readdirSync(cwd);
  let excelInfo = new Array();

  for (let i = 0; i < filelist.length; i++) {
    const workbook = XLSX.readFile(`${cwd}/${filelist[i]}`);
    let excelLength = new Array();
    for (let j = 0; j < workbook.SheetNames.length; j++) {
      const tableRowLength = XLSX.utils.sheet_to_json(workbook.Sheets[workbook.SheetNames[j]], { header: "A" }).length;
      const tableColumnLength = Object.keys(
        XLSX.utils.sheet_to_json(workbook.Sheets[workbook.SheetNames[j]], { header: "A" })[0]
      ).length;
      excelLength.push({ row: tableRowLength, column: tableColumnLength });
    }
    excelInfo.push({
      fileName: filelist[i].split(".xlsx")[0],
      allSheetName: workbook.SheetNames, // 엑셀파일에서 가져온 시트명.
      data: workbook.Sheets, // 시트의 데이터들. workbook.Sheets[시트명] > 시트명에 해당하는 데이터들
      length: excelLength,
    });
  }

  return excelInfo;
  // return filelist.map((filename) => {
  //   const workbook = XLSX.readFile(`${cwd}/${filename}`);
  //   // let excelLength = [];
  //   const excelLength = workbook.SheetNames.map((sheetname, index) => {
  //     const tableRowLength = XLSX.utils.sheet_to_json(workbook.Sheets[sheetname], { header: "A" }).length; // 선택한 시트의 행의 개수
  //     const tableColumnLength = Object.keys(XLSX.utils.sheet_to_json(workbook.Sheets[sheetname], { header: "A" })[0])
  //       .length; //선택한 시트의 열의 개수
  //     return { row: tableRowLength, column: tableColumnLength };
  //     // excelLength[index] = {
  //     //   row: tableRowLength,
  //     //   column: tableColumnLength,
  //     // };
  //   });

  //   return {
  //     fileName: filename.split(".xlsx")[0],
  //     allSheetName: workbook.SheetNames, // 엑셀파일에서 가져온 시트명.
  //     data: workbook.Sheets, // 시트의 데이터들. workbook.Sheets[시트명] > 시트명에 해당하는 데이터들
  //     length: excelLength,
  //   };
  // });
};

export default getExcelData;
