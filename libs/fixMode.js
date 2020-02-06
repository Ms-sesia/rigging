import {findFixSpecTable, finalSpecData} from "./calMainFixData";
import numberToAlph from "./numberToAph";
import excelData from "./excelData";
import fs from "fs";

const fix = (data, row, colum, sheetName) => {
  for(let i = 1 ; i < colum ; i++ ){ // B열부터 끝열까지
    let tableSpec = {
      mainBoom : 0,
      mainAngle : 0,
      totalExtLength : 0,
      adapter : 0,
      extBoom1 : 0,
      extBoom2 : 0,
      extBoom3 : 0,
      extMargin : 0,
      fix : 0,
      fixAngle : 0,
      distance : [],
      weight : [],
    };
    
    let charIndex = numberToAlph(i);  // B, C, D, E, F, ...
    if(i>25) charIndex = numberToAlph(0) + numberToAlph(i - 26);  // Z이후 엑셀은 AA AB AC AD ...

    tableSpec.mainBoom = data[charIndex + 1].v;  // B1, C1, D1, E1, ...
    tableSpec.totalExtLength = data[charIndex + 2].v;
    tableSpec.adapter = data[charIndex + 3].v;  // B3, C3, D3, E3, ...
    tableSpec.extBoom1 = data[charIndex + 4].v;  // B2, C2, D2, E2, ...
    tableSpec.extBoom2 = data[charIndex + 5].v;  // B2, C2, D2, E2, ...
    tableSpec.extBoom3 = data[charIndex + 6].v;  // B2, C2, D2, E2, ...    
    tableSpec.extMargin = data[charIndex + 7].v;
    tableSpec.fix = data[charIndex + 8].v;  // B4, C4, D4, E4, ...
    tableSpec.fixAngle = data[charIndex + 9].v;  // B5, C5, D5, E5, ...
    tableSpec.distance = excelData(data, 'A', row); // 제원표의 거리
    tableSpec.weight = excelData(data, charIndex, row); // B, C, D, E, ... 의 제원표의 무게 

    findFixSpecTable(tableSpec);
  }
  // console.log(finalSpecData);
  fs.writeFile(`./specTableJson/${sheetName}`, JSON.stringify(finalSpecData), 'utf8', (err) => { if(err) throw err; });
  // let ws = XLSX.utils.json_to_sheet(finalSpecData);
  // let wb = XLSX.utils.book_new();
  // XLSX.utils.book_append_sheet(wb, ws, "test spec data");
  // XLSX.writeFile(wb, `./specTableExcel/${sheetName}.xlsx`);
};

export default fix;