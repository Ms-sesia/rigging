import getTableData from "./libs/excelConvert";
import fix from "./libs/fixMode";
import luffing from "./libs/luffingMode";
import fs from "fs";

getTableData.name.forEach( (sheetName, index) => { // 제원표의 modecode. ex) T, TN, TY3N ...
  const raw = getTableData.length[index].raw;
  const colum = getTableData.length[index].colum;
  if(/N/g.test(sheetName.split('_')[0]) || /F/g.test(sheetName.split('_')[0])){ // N과 F 둘 중 하나라도 있는 경우
    if(/F/g.test(sheetName.split('_')[0])){ // F가 있는데 N이 있거나 없음. fix mode
      if(sheetName === 'TY3EF_165t_TAB223085')
        fix(getTableData.data[sheetName], raw, colum, sheetName);
    } else {  // F가 없는데 N은 존재. luffing mode
      luffing(getTableData.data[sheetName], raw, colum, sheetName);
    }
  } else {  // N과 F 둘 다 없는경우. main mode
    fix(getTableData.data[sheetName], raw, colum, sheetName);
  }
}); 

// fs.readFile(`./luffingFinalSpecJson/TN_165t_TAB231142.2`, 'utf8', (err, testJSONFile) => {
//   if(err) throw err;
// });