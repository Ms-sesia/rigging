import getExcelData from "./excelConvert";
import getPartsNameDataArray from "./getPartsNameDataArray";

const partsArray = (craneData) => {
  let analysisIndex = 0;
  let dataIndex = 0;

  const partsDataTable = getExcelData("partsDataTable");
  // searching for excel name index
  for (let i = 0; i < partsDataTable.length; i++) {
    switch (partsDataTable[i].fileName) {
      case "partsAnalysisTable":
        analysisIndex = i;
        break;
      case "byPartsData":
        dataIndex = i;
        break;
    }
  }

  const partsNameArray = getPartsNameDataArray(partsDataTable[analysisIndex], craneData);

  return {
    list: partsNameArray,
    data: getPartsNameDataArray(partsDataTable[dataIndex], craneData, partsNameArray),
  };
};

export default partsArray;