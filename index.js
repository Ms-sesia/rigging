import getTableInfo from "./libs/excelConvert";
import getCraneData from "./libs/getCraneData";
import modeSelect from "./libs/modeSelect";
import firstCraneInfo from "./libs/byModelMode";

const fileList = getTableInfo.map( (excelData) => {
  return excelData.fileName.split('-')[0];
});

let craneInfo = [];
const getRiggingData = (workValue) => {
  getTableInfo.forEach( (excelInfo) => {  // 엑셀파일 전부
    excelInfo.sheetname.map( (sheetName, index) => { // 엑셀 파일의 sheet
      const raw = excelInfo.length[index].raw;  // sheet의 raw 길이
      const colum = excelInfo.length[index].colum;  // sheet의 colum 길이
      const modeName = modeSelect(sheetName); // main, fix, luffing 구분
      const craneCode = sheetName.split('_')[0];  // TN, TY3, TNZF, TYVENZF 등 모드별 이름
      const craneData = getCraneData(excelInfo.data[sheetName], raw, colum, modeName, workValue); // 작업값을 만족하는 craneData 계산
      const craneName = excelInfo.fileName.split('-')[0]; // 500t, 750t, 1200t 구분
      // console.log(`craneName :`, craneName,`\tcraneName :`, craneCode, `\tmodeName :`, modeName);
      if(craneData){  // 작업값들을 만족하는 제원표의 계산데이터
        craneInfo.push({
          craneName : craneName,
          craneCode : craneCode,
          craneModeName : modeName,
          excelSheetName : sheetName,
          craneData : craneData,
        });
      }
    });
  });

  return firstCraneInfo(craneInfo, fileList);
};

export default getRiggingData;