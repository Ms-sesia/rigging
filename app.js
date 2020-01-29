const XLSX = require('xlsx');
const fs = require('fs');
const getDataArr = require('./libs/getDataArr.js');
const num2Alph = require('./libs/numberToAph.js');
const offset = 6;
let workbook = XLSX.readFile("./LTM_1500-8.1.xlsx");
let finalSpecData = [];
let workValue = { // input value
  workWeight : 15,
  distance : 21,
  height : 50,
}
let fixValue = {
  crainHeight : 2,
  hookHeight : 6,
}

let parseData = () => {
  workbook.SheetNames.forEach((sheetName) => {
    let worksheet = workbook.Sheets[sheetName]; // object of object.
    const tableRowLength = Object.keys(XLSX.utils.sheet_to_json(worksheet, {header : "A"})).length;  // 선택한 시트의 행의 개수
    const tableColumLength = Object.keys(XLSX.utils.sheet_to_json(worksheet, {header : "A"})[0]).length; //선택한 시트의 열의 개수
    specData(worksheet, tableRowLength, tableColumLength, sheetName);
    finalSpecData = [];
  })
};

let findSpecTable = (spec) => {
  // 삼각함수 : Math.cos(x*Math.PI/180) 각도는 라디안 표기
  MBoom = spec.mainBoom + spec.extBoom + spec.adapter;// mainBoom + extBoom + adapter
  for(i=60 ; i < 86 ; i++){
    let calValue = {  // 출력용 객체
      mainBoom : spec.mainBoom,
      mainAngle : i,
      extBoom : spec.extBoom,
      adapter : spec.adapter,
      fix : spec.fix,
      fixAngle : spec.fixAngle,
      tableDistance : [],
      workDistance : workValue.distance,
      distance1 : 0,
      distance2 : 0,
      totalDistance : 0,
      marginHeight : 0,
      workHeight : workValue.height,
      tableWeight : [],
    };

    let d1 = MBoom * Math.cos(i * Math.PI/180);  // mainBoom distance
    let d2 = spec.fix * Math.cos((i - spec.fixAngle)*Math.PI/180);  // fix distance
    calValue.distance1 = d1;
    calValue.distance2 = d2;

    totalDistance = Math.round(d1 + d2);  // 소숫점 반올림. 원하는 제원값보다 낮춰서 해당 거리 제외.
    // totalDistance 가 10보다 큰 홀수일 경우 더 적은 무게를 들게끔 totalDistance를 1 더한다.
    if(totalDistance % 2 !== 0 && totalDistance % 2 < 10 ) totalDistance += 1;
    calValue.totalDistance = totalDistance;

    let h1 = MBoom * Math.sin(i * Math.PI/180);  // mainBoom height
    let h2 = spec.fix * Math.sin((i - spec.fixAngle) * Math.PI/180);  // fix height
    totalHeight = Math.ceil(h1 + h2);  //작업높이는 올림이 더 좋아보임. 그래야 거리가 좁아짐. totalDistance와 비교 할 때 최소 거리보다 넓으면 제외.
    calValue.marginHeight = totalHeight - (workValue.height + fixValue.crainHeight + fixValue.hookHeight);  // 여유 높이 = 계산한 높이 - (작업높이 + 크레인높에 + hook길이)

    if( totalDistance > workValue.distance && calValue.marginHeight > 0) {  // specdistance가 totaldistance보다 큰 것, 마진이 0보다 큰 것. => distance관련 좀 더 합리적인 조건이 필요함.
      spec.distance.forEach( (data, j) => {
        if( data > totalDistance && spec.weight[j] > workValue.workWeight) {  //60도의 최소 작업거리 이상, 주어진 무게 이상
          calValue.tableDistance[j] = data;
          calValue.tableWeight[j] = spec.weight[j];
        }
      })
      finalSpecData.push(calValue);
    }
  }
};

let specData = (data, row, colum, sheetName) => {
  for(let i = 1 ; i < colum ; i++ ){ // B열부터 끝열까지
    let minSpec = {
      mainBoom : 0,
      mainAngle : 0,
      extBoom : 0,
      adapter : 0,
      fix : 0,
      fixAngle : 0,
      distance : [],
      weight : [],
    };
    charIndex = num2Alph(i);  // B, C, D, E, F, ...
    if(i>25) charIndex = num2Alph(0) + num2Alph(i - 26);  // Z이후 엑셀은 AA AB AC AD ...
    
    minSpec.mainBoom = data[charIndex + 1].v;  // B1, C1, D1, E1, ...
    minSpec.extBoom  = data[charIndex + 2].v;  // B2, C2, D2, E2, ...
    minSpec.adapter  = data[charIndex + 3].v;  // B3, C3, D3, E3, ...
    minSpec.fix      = data[charIndex + 4].v;  // B4, C4, D4, E4, ...
    minSpec.fixAngle = data[charIndex + 5].v;  // B5, C5, D5, E5, ...
    minSpec.distance = getDataArr(data, 'A', row, offset);
    minSpec.weight   = getDataArr(data, charIndex, row, offset);
    findSpecTable(minSpec);
  }  
  fs.writeFile(`./specTableJson/${sheetName}`, JSON.stringify(finalSpecData), 'utf8', (err) => { if(err) throw err; });
  let ws = XLSX.utils.json_to_sheet(finalSpecData);
  let wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "test spec data");
  XLSX.writeFile(wb, `./specTableExcel/${sheetName}.xlsx`);
};

let appStart = () => {
  parseData();
};

appStart();