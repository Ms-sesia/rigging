import { getTableInfo } from "./libs/excelConvert";
import getCraneData from "./libs/getCraneData";
import modeSelect from "./libs/modeSelect";
import getCraneDistance from "./libs/getCraneDistance";

const getRiggingData = (workValue) => {
  // 초과치 입력시 처리. 한계조건 : 무게 1200, 작업높이 136, 작업거리 136
  if(workValue.workWeight > 1200)   return '작업무게 값이 리깅 범위를 초과합니다.';
  if(workValue.workHeight > 170)    return '작업높이 값이 리깅 범위를 초과합니다.';
  if(workValue.workDistance > 129)  return '작업거리 값이 리깅 범위를 초과합니다.';
  if(workValue.workWeight < 1)      return '작업무게 값이 너무 낮습니다.';
  if(workValue.workHeight < 1)      return '작업높이 값이 너무 낮습니다.';
  if(workValue.workDistance < 1)    return '작업거리 값이 너무 낮습니다.';

  let craneInfo = []; // 전체 크레인에 대한 리깅가능한 데이터를 모아둔 배열.
  getTableInfo.forEach( (excelInfo) => {  // 엑셀파일 전부
    let preCraneCode = '';
    const craneName = excelInfo.fileName; // 500t, 750t, 1200t 구분
    const craneDistance = getCraneDistance(craneName);
    if(craneName === 'LTM_11200'){
      excelInfo.sheetname.map( (sheetName, index) => { // 엑셀 파일의 sheet
        if(sheetName === 'T3YV2VEN_202t_TAB1783868.4'){
          const raw = excelInfo.length[index].raw;  // sheet의 raw 길이
          const colum = excelInfo.length[index].colum;  // sheet의 colum 길이
          const craneCode = sheetName.split('_')[0];  // TN, TY3, TNZF, TYVENZF 등 모드별 이름
          const modeName = modeSelect(sheetName); // main, fix, luffing 구분
          const craneData = getCraneData(excelInfo.data[sheetName], raw, colum, modeName, workValue, craneDistance); // 작업값을 만족하는 craneData 계산
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
        }
      });
    }
  });
  if(craneInfo.length) {
    craneInfo.sort( (a, b) => a.craneName.split('_')[1] - b.craneName.split('_')[1] );  // 크레인이름 오름차순 정렬
    return craneInfo;
  } else return craneInfo;
};

export default getRiggingData;