const finalCraneInfo = (craneInfo, fileList) => {
  const modeNameList = ['main', 'fix', 'luffing'];
  let tmpCraneData = [];
  let modeMain = [];
  let modeFix = [];
  let modeLuffing = [];

  modeNameList.forEach( (modeName, index) => {
    craneInfo.filter((data) => {  // modeName별로 모아놓은 craneData 배열
      if(modeName === data.craneModeName){
        switch (modeName){
          case 'main' :
            modeMain.push(data);
            break;
          case 'fix' :
            modeFix.push(data);
            break;
          case 'luffing' :
            // console.log(data);
            modeLuffing.push(data);
            break;
        }
      }
    });
  });
  fileList.forEach( (filename, index1) => {
    if(modeMain.find(mainData => mainData.craneName === filename))
      tmpCraneData.push(modeMain.find(mainData => mainData.craneName === filename));
    if(modeFix.find(fixData => fixData.craneName === filename))
      tmpCraneData.push(modeFix.find(fixData => fixData.craneName === filename));
    if(modeLuffing.find(luffingData => luffingData.craneName === filename))
      tmpCraneData.push(modeLuffing.find(luffingData => luffingData.craneName === filename));
  });

  return tmpCraneData;
};

export default finalCraneInfo;

// const finalcraneInfo = (craneInfo) => {
//   let tmpValue = {
//     craneName : [],
//     info : [],
//   };
//   let tmpObject = {
//     modeName : [],
//     code : [],
//     data : [],
//   };

//   craneInfo.map( (info, index) => {
//     if(index === 0) validation(info, tmpValue, tmpObject);
//      // 크레인이 다르면
//     else if(info.craneName !== craneInfo[index-1].craneName)  validation(info, tmpValue, tmpObject);
//     // 동일 크레인에서 모드가 다르면
//     else if(info.craneModeName !== craneInfo[index-1].craneModeName)  validation(info, tmpValue, tmpObject);
//   });
//   tmpValue.info = tmpObject;
//   return tmpValue;
// };

// const validation = (info, tmpValue, tmpObject) => {
//   tmpValue.craneName.push(info.craneName);
//   tmpObject.modeName.push(info.craneModeName);
//   tmpObject.code.push(info.craneCode);
//   tmpObject.data.push(info.craneData);
// }

// export default finalcraneInfo;