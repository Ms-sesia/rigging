import findLuffingSpecTable from "./calLuffingData";
import findMainFixSpecTable from "./calMainFixData";
import numberToAlph from "./numberToAph";
import excelData from "./getExcelData";

const heightOfHookCrane = { // Default Hook and Crain height. heightOfHookCrain
  craneHeight : 2,
  hookHeight : 6,
};

const getcraneData = (data, row, colum, modeName, workValue, craneDistance) => {
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
    tableSpec.flyFixLuffing = data[charIndex + 9].v;
    tableSpec.workingArea = data[charIndex + 11].v; // 회전반경
    tableSpec.counterWeight = data[charIndex + 12].v;
    tableSpec.overRear = data[charIndex + 13].v;
    tableSpec.optional = data[charIndex + 14].v;  // 앞단에서 telescopableLoads 와 optional 구분
    tableSpec.distance = excelData(data, 'A', row);
    tableSpec.weight = excelData(data, charIndex, row, i);
    
    if(modeName === 'MAIN' || modeName === 'FIX' || modeName === 'FLYJIB'){  // main & fix mode
      tableSpec.flyFixAngle = data[charIndex + 10].v;
      const Fix = findMainFixSpecTable(tableSpec, workValue, heightOfHookCrane, craneDistance);
      if(Fix) return Fix;
    } else {  // luffing mode
      tableSpec.mainAngle = data[charIndex + 10].v;
      const Luffing = findLuffingSpecTable(tableSpec, workValue, heightOfHookCrane, craneDistance);
      if(Luffing) return Luffing;
    } 
  }
};

export default getcraneData;