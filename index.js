import { getTableInfo } from "./libs/excelConvert";
import getCraneData from "./libs/getCraneData";
import modeSelect from "./libs/modeSelect";
import getCraneDistance from "./libs/getCraneDistance";

const getRiggingData = (workValue) => {
  if(workValue.workWeight > 1200 || workValue.workHeight > 136 || workValue.workDistance > 136){
    console.log(workValue.workWeight, workValue.workHeight, workValue.workDistance);
    return '입력값이 리깅 범위를 초과합니다. 입력값을 낮추세요.';
  }
  let craneInfo = []; // 전체 크레인에 대한 리깅가능한 데이터를 모아둔 배열.
  getTableInfo.forEach( (excelInfo) => {  // 엑셀파일 전부
    let preCraneCode = '';
    const craneName = excelInfo.fileName; // 500t, 750t, 1200t 구분
    const craneDistance = getCraneDistance(craneName);
    excelInfo.sheetname.map( (sheetName, index) => { // 엑셀 파일의 sheet
      const raw = excelInfo.length[index].raw;  // sheet의 raw 길이
      const colum = excelInfo.length[index].colum;  // sheet의 colum 길이
      const craneCode = sheetName.split('_')[0];  // TN, TY3, TNZF, TYVENZF 등 모드별 이름
      const modeName = modeSelect(sheetName); // main, fix, luffing 구분
      const craneData = getCraneData(excelInfo.data[sheetName], raw, colum, modeName, workValue, craneDistance); // 작업값을 만족하는 craneData 계산
      // console.log(craneName, modeName);
      if(craneData){  // 작업값들을 만족하는 제원표의 계산데이터
        if(preCraneCode !== craneCode){
          craneInfo.push({
            craneName : craneName,
            craneCode : craneCode,
            craneModeName : modeName,
            excelSheetName : sheetName,
            craneData : craneData,
          });
          preCraneCode = craneCode;
        }
      }
    });
  });
  if(craneInfo.length) {
    craneInfo.sort( (a, b) => a.craneName.split('_')[1] - b.craneName.split('_')[1] );  // 크레인이름 오름차순 정렬
    return craneInfo;
  }
};

export default getRiggingData;