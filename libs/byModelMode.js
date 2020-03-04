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
            modeLuffing.push(data);
            break;
        }
      }
    });
  });
  fileList.forEach( (filename) => {
    const cranename = filename.split('-')[0];
    if(modeMain.find(mainData => mainData.craneName === cranename))
      tmpCraneData.push(modeMain.find(mainData => mainData.craneName === cranename));
    if(modeFix.find(fixData => fixData.craneName === cranename))
      tmpCraneData.push(modeFix.find(fixData => fixData.craneName === cranename));
    if(modeLuffing.find(luffingData => luffingData.craneName === cranename))
      tmpCraneData.push(modeLuffing.find(luffingData => luffingData.craneName === cranename));
  });

  return tmpCraneData;
};

export default finalCraneInfo;