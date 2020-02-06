import getTableData from "./libs/convExcel";
import fix from "./libs/fixMode";
import luffing from "./libs/luffingMode";

getTableData.name.forEach( (sheetName, index) => { // 제원표의 modecode. ex) T, TN, TY3N ...
  const raw = getTableData.length[index].raw;
  const colum = getTableData.length[index].colum;
  if(/N/g.test(sheetName.split('_')[0]) || /F/g.test(sheetName.split('_')[0])){ // N과 F 둘 중 하나라도 있는 경우
    if(/F/g.test(sheetName.split('_')[0])){ // N과 F가 다 있음. fix mode
      // console.log('Fix 모드', sheetName); 
      // fix(getTableData.data[sheetName], raw, colum, sheetName);
    } else {  // F가 없는 N. luffing mode
      // console.log('luffing 모드', sheetName); 
      luffing(getTableData.data[sheetName], raw, colum, sheetName);
    }
  } else {  // N과 F 둘 다 없는경우. main mode
    // console.log('main 모드', sheetName); 
    // fix(getTableData.data[sheetName], raw, colum, sheetName);
  }
}); 