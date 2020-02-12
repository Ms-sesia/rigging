import findLuffingSpecTable from "./calLuffingData";
import findMainFixSpecTable from "./calMainFixData";
import numberToAlph from "./numberToAph";
import excelData from "./getExcelData";
// import fs from "fs";

const getCrainData = (data, row, colum, modeName) => {
  let finalSpecData = [];
  let tableSpec = {
    mainBoom : 0,
    totalExtLength : 0,
    adapter : 0,
    extBoom1 : 0,
    extBoom2 : 0,
    extBoom3 : 0,
    extMargin : 0,
    luffingFix : 0,
    distance : [],
    weight : [],
  };

  for(let i = 1 ; i < colum ; i++ ){ // B열부터 끝열까지
    let charIndex = numberToAlph(i);  // B, C, D, E, F, ...
    if(i>25) charIndex = numberToAlph(0) + numberToAlph(i - 26);  // Z이후 엑셀은 AA AB AC AD ...

    tableSpec.mainBoom = data[charIndex + 1].v;  // B1, C1, D1, E1, ...
    tableSpec.totalExtLength = data[charIndex + 2].v;
    tableSpec.adapter = data[charIndex + 3].v;
    tableSpec.extBoom1 = data[charIndex + 4].v;
    tableSpec.extBoom2 = data[charIndex + 5].v;
    tableSpec.extBoom3 = data[charIndex + 6].v;
    tableSpec.extMargin = data[charIndex + 7].v;
    tableSpec.luffingFix = data[charIndex + 8].v;
    tableSpec.distance = excelData(data, 'A', row);
    tableSpec.weight = excelData(data, charIndex, row);

    if(modeName === 'main' || modeName === 'fix'){  // main & fix mode
      tableSpec.fixAngle = data[charIndex + 9].v;  
      const Fix = findMainFixSpecTable(tableSpec);

      if(Fix.length)  finalSpecData.push(Fix);

    } else {  // luffing mode
      tableSpec.mainAngle = data[charIndex + 9].v;
      const Luffing = findLuffingSpecTable(tableSpec);

      if(Luffing.length)  finalSpecData.push(Luffing);

    } 
  }
  if(finalSpecData.length){
    const firstData = finalSpecData[0][0];
    return firstData;
  }
  // fs.writeFile(`./luffingFinalSpecJson/${sheetName}`, JSON.stringify(finalSpecData), 'utf8', (err) => { if(err) throw err; });
};

export default getCrainData;