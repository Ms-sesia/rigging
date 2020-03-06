import findLuffingSpecTable from "./calLuffingData";
import findMainFixSpecTable from "./calMainFixData";
import numberToAlph from "./numberToAph";
import excelData from "./getExcelData";

const heightOfHookCrane = { // Default Hook and Crain height. heightOfHookCrain
  craneHeight : 2,
  hookHeight : 6,
};

const getcraneData = (data, row, colum, modeName, workValue) => {
  let tableSpec = {};

  for(let i = 1 ; i < colum ; i++ ){ // B열부터 끝열까지
    let charIndex = numberToAlph(i);  // B, C, D, E, F, ...
    if(i>25) charIndex = numberToAlph(0) + numberToAlph(i - 26);  // Z이후 엑셀은 AA AB AC AD ...
    tableSpec.mainBoom = data[charIndex + 1].v;  // B1, C1, D1, E1, ...
    tableSpec.totalExtLength = data[charIndex + 2].v;
    tableSpec.adapter1 = data[charIndex + 3].v;
    tableSpec.extBoom1 = data[charIndex + 4].v;
    tableSpec.extBoom2 = data[charIndex + 5].v;
    tableSpec.extBoom3 = data[charIndex + 6].v;
    tableSpec.extBoom4 = data[charIndex + 7].v;
    tableSpec.adapter2 = data[charIndex + 8].v;
    tableSpec.fixLuffing = data[charIndex + 9].v;
    tableSpec.addWeight = data[charIndex + 11].v;
    tableSpec.distance = excelData(data, 'A', row);
    tableSpec.weight = excelData(data, charIndex, row, i);
    
    if(modeName === 'main' || modeName === 'fix'){  // main & fix mode
      tableSpec.fixAngle = data[charIndex + 10].v;  
      const Fix = findMainFixSpecTable(tableSpec, workValue, heightOfHookCrane);
      // data를 넘겼다 받을 필요가 없음.
      tableSpec.overRear = data[charIndex + 12].v;
      tableSpec.optional = data[charIndex + 13].v;
      if(Fix) return Fix;
    } else {  // luffing mode
      tableSpec.mainAngle = data[charIndex + 10].v;
      const Luffing = findLuffingSpecTable(tableSpec, workValue, heightOfHookCrane);
      // data를 넘겼다 받을 필요가 없음.
      tableSpec.overRear = data[charIndex + 12].v;
      tableSpec.optional = data[charIndex + 13].v;
      if(Luffing) return Luffing;
    } 
  }
};

export default getcraneData;