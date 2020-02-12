const finalCrainInfo = (crainInfo) => {
  let tmpValue = [];
  crainInfo.map( (info, index) => {
    if(index === 0) tmpValue.push(info);
    else if(info.crainName !== crainInfo[index-1].crainName)  tmpValue.push(info);  // 크레인이 다르면
    else if(info.crainModeName !== crainInfo[index-1].crainModeName)  tmpValue.push(info);  // 동일 크레인에서 모드가 다르면
  });
  return tmpValue;
};

export default finalCrainInfo;