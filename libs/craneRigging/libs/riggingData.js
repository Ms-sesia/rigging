import getCraneData from "./getCraneData";
import modeSelect from "./modeSelect";
import getCraneDistance from "./getCraneDistance";
import getExcelData from "./excelConvert";

const getRiggingData = (workValue, unlockedCraneNames) => {
  const specTableInfo = getExcelData("craneSpecTable");
  // 초과치 입력시 처리. 한계조건 : 무게 1200, 작업높이 136, 작업거리 136
  let craneInfo = new Array(); // 전체 크레인에 대한 리깅가능한 데이터를 모아둔 배열.

  if (
    workValue.workWeight > 1200 ||
    workValue.workBuilding.height > 170 ||
    workValue.workBuilding.vertical > 129 ||
    workValue.workWeight < 1 ||
    workValue.workBuilding.height < 1 ||
    workValue.workBuilding.vertical < 0
  ) {
    console.log("입력한 조건값이 올바르지 않습니다.");
    return craneInfo;
  }

  if (!workValue.block.vertical1) workValue.block.vertical1 = 0;
  if (!workValue.block.horizontal1) workValue.block.horizontal1 = 0;
  if (!workValue.block.height1) workValue.block.height1 = 0;
  if (!workValue.block.vertical2) workValue.block.vertical2 = 0;
  if (!workValue.block.height2) workValue.block.height2 = 0;
  // console.log(unlockedCraneNames);
  for (let i = 0; i < specTableInfo.length; i++) {
    let preCraneCode = "";
    const excelInfo = specTableInfo[i];
    const craneName = excelInfo.fileName;
    const craneDistance = getCraneDistance(craneName);
    for (let j = 0; j < specTableInfo[i].allSheetName.length; j++) {
      // 엑셀 파일의 sheet
      const { row, column } = excelInfo.length[j];
      const sheetName = excelInfo.allSheetName[j];
      const craneCode = sheetName.split("_")[0]; // TN, TY3, TNZF, TYVENZF 등 모드별 이름
      const modeName = modeSelect(sheetName); // main, fix, luffing 구분
      if (preCraneCode !== craneCode) {
        // 작업값을 만족하는 craneData 계산
        const riggingData = getCraneData(excelInfo.data[sheetName], row, column, modeName, workValue, craneDistance);
        if (riggingData) {
          craneInfo.push({
            craneName: craneName,
            craneCode: craneCode,
            craneModeName: modeName,
            excelSheetName: sheetName,
            paid: unlockedCraneNames.includes(craneName) ? true : false,
            craneData: riggingData,
          });
          if (!unlockedCraneNames.includes(craneName)) {
            preCraneCode = craneCode;
            break;
          }
          preCraneCode = craneCode;
        }
      }
    }
  }
  if (craneInfo.length) {
    craneInfo.sort((a, b) => a.craneName.split("_")[1] - b.craneName.split("_")[1]); // 크레인이름 오름차순 정렬
    return craneInfo;
  } else return craneInfo;
};

export default getRiggingData;
