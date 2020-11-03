import excelData from "./getExcelData";
import numberToAlph from "./numberToAlph";

const offset = 1;

const getPartsDataArray = (data, row, column, partsNameArray) => {
  // return partsNameArray.map( (partsName)=> {
  let partsInfoArray = {};
  partsNameArray.map((partsName) => {
    for (let i = 1; i < column; i++) {
      let charIndex = numberToAlph(i);
      if (i > 25 && i < 52) charIndex = numberToAlph(0) + numberToAlph(i - 26 * 1); // Z이후 엑셀은 AA AB AC AD ...
      if (i >= 52) charIndex = numberToAlph(1) + numberToAlph(i - 26 * 2); // AA이후 엑셀은 BA BB BC BD ...

      const partsData = excelData(data, charIndex, row, offset);
      // parts name check
      if (partsName === partsData[0]) {
        const IMAGE_SERVER = "https://192.168.0.150:3001/images/";
        console.log(typeof partsData[0]);
        partsInfoArray[partsData[0]] = {
          name: partsData[0],
          code: partsData[1],
          refCode: partsData[2],
          marker: partsData[3],
          length: partsData[4],
          type: partsData[5],
          origin: {
            x: partsData[6],
            y: partsData[7],
          },
          joint: [
            { x: partsData[8], 
              y: partsData[9] 
            },
            {
              x: partsData[10],
              y: partsData[11],
            },
          ],
          wire: [
            {
              x: partsData[12],
              y: partsData[13],
            },
            {
              x: partsData[14],
              y: partsData[15],
            },
            {
              x: partsData[16],
              y: partsData[17],
            },
          ],
          imgaSrc: `${IMAGE_SERVER}${partsData[18]}`,
          drawOrde: partsData[19],
        };
      }
    }
  });

  return partsInfoArray;
};

export default getPartsDataArray;
