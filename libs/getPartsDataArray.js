import excelData from "./getExcelData";
import numberToAlph from "./numberToAlph";

const offset = 1;

const getPartsDataArray = (data, row, column, partsNameArray) => {
  return partsNameArray.map( (partsName)=> {
    for (let i = 1; i < column; i++) {
      let charIndex = numberToAlph(i);
      if (i > 25 && i < 52) charIndex = numberToAlph(0) + numberToAlph(i - 26 * 1); // Z이후 엑셀은 AA AB AC AD ...
      if (i >= 52) charIndex = numberToAlph(1) + numberToAlph(i - 26 * 2); // AA이후 엑셀은 BA BB BC BD ...

      const partsData = excelData(data, charIndex, row, offset);
      // parts name check
      if(partsName === partsData[0]) {
        const IMAGE_SERVER = "https://localhost/";
        const partsInfoArray = {
          name: partsData[0],
          code: partsData[1],
          refCode: partsData[2],
          marker: partsData[3],
          length: partsData[4],
          type: partsData[5],
          originx: partsData[6],
          originy: partsData[7],
          joint1x: partsData[8],
          joint1y: partsData[9],
          joint2x: partsData[10],
          joint2y: partsData[11],
          wire1x: partsData[12],
          wire1y: partsData[13],
          wire2x: partsData[14],
          wire2y: partsData[15],
          wire3x: partsData[16],
          wire3y: partsData[17],
          imgaSrc: `${IMAGE_SERVER}${partsData[18]}`,
          drawOrde: partsData[19],
        };
        
        return partsInfoArray;
      } 
    }
  });
};

export default getPartsDataArray;