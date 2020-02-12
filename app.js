import getTableInfo from "./libs/excelConvert";
import getCrainData from "./libs/getCrainData";
import modeSelect from "./libs/modeSelect";
import firstCrainInfo from "./libs/byModelMode";
let crainInfo = [];

getTableInfo.forEach( (excelInfo) => {  // 엑셀파일 전부
   excelInfo.sheetname.map( (sheetName, index) => { // 엑셀 파일의 sheet
    const raw = excelInfo.length[index].raw;  // sheet의 raw 길이
    const colum = excelInfo.length[index].colum;  // sheet의 colum 길이
    const modeName = modeSelect(sheetName); // main, fix, luffing 구분
    const crainCode = sheetName.split('_')[0];  // TN, TY3, TNZF, TYVENZF 등 모드별 이름
    const crainData = getCrainData(excelInfo.data[sheetName], raw, colum, sheetName, modeName); // 작업값을 만족하는 crainData 계산
    let crainName = excelInfo.fileName.split('-')[0]; // 500t, 750t, 1200t 구분

    if(crainName === 'LTM_1500'){ // 500t모델에서 TAB23으로 시작하는게 메인붐 84m, TAB22로 시작하는게 메인붐 50m.
      if(/TAB23/g.test(sheetName.split('_')[2]))  crainName = `${excelInfo.fileName.split('-')[0]}_84m`;
      else  crainName = `${excelInfo.fileName.split('-')[0]}_50m`;
    }

    if(crainData){  // 작업값들을 만족하는 제원표의 계산데이터
      crainInfo.push({
        crainName : crainName,
        crainCode : crainCode,
        crainModeName : modeName,
        crainData : crainData,
      });
    }
  });
});

const finalCrainInfo = firstCrainInfo(crainInfo);

console.log(finalCrainInfo);