import getTableInfo from "./libs/excelConvert";
import getCraneData from "./libs/getCraneData";
import modeSelect from "./libs/modeSelect";
import getCraneDistance from "./libs/getCraneDistance";

const getRiggingData = (workValue) => {
  // 초과치 입력시 처리. 한계조건 : 무게 1200, 작업높이 136, 작업거리 136
  let craneInfo = new Array; // 전체 크레인에 대한 리깅가능한 데이터를 모아둔 배열.

  if(workValue.workWeight > 1200 || workValue.workBuilding.height > 170 || workValue.workBuilding.vertical > 129 ||workValue.workWeight < 1 || workValue.workBuilding.height < 1 || workValue.workBuilding.vertical <= 0){
    console.log("입력한 조건값이 올바르지 않습니다.");
    return craneInfo;
  }
  getTableInfo.forEach( (excelInfo) => {  // 엑셀파일 전부
    let preCraneCode = '';
    let craneDistance = 0;
    const craneName = excelInfo.fileName; // 500t, 750t, 1200t 구분
    const selectCraneLocation = getCraneDistance(craneName);
    // console.log(craneName, selectCraneLocation);
    if(workValue.craneLocation === 'back') craneDistance = selectCraneLocation.rearDistance;
    if(workValue.craneLocation === 'front') craneDistance = selectCraneLocation.frontDistance;
    if(workValue.craneLocation === 'side') craneDistance = selectCraneLocation.trigger;

    // if(craneName === 'L_1500_50m_8.1' || craneName === 'L_1500_84m_8.1'){ // 테스트용 if 1
    console.log(craneName);
    excelInfo.sheetname.map( (sheetName, index) => { // 엑셀 파일의 sheet
      // if(sheetName === 'T3YVEN_182t_TAB1783828.2'){ // 테스트용 if 2 
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
    // }// 테스트용 if 2
    })
  }
  // }// 테스트용 if 1
  );
  if(craneInfo.length) {
    craneInfo.sort( (a, b) => a.craneName.split('_')[1] - b.craneName.split('_')[1] );  // 크레인이름 오름차순 정렬
    return craneInfo;
  } else return craneInfo;
};

export default getRiggingData;