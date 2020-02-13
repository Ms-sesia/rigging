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

// const finalCrainInfo = (crainInfo) => {
//   let tmpValue = {
//     crainName : [],
//     info : [],
//   };
//   let tmpObject = {
//     modeName : [],
//     code : [],
//     data : [],
//   };

//   crainInfo.map( (info, index) => {
//     if(index === 0) validation(info, tmpValue, tmpObject);
//      // 크레인이 다르면
//     else if(info.crainName !== crainInfo[index-1].crainName)  validation(info, tmpValue, tmpObject);
//     // 동일 크레인에서 모드가 다르면
//     else if(info.crainModeName !== crainInfo[index-1].crainModeName)  validation(info, tmpValue, tmpObject);
//   });
//   tmpValue.info = tmpObject;
//   return tmpValue;
// };

// const validation = (info, tmpValue, tmpObject) => {
//   tmpValue.crainName.push(info.crainName);
//   tmpObject.modeName.push(info.crainModeName);
//   tmpObject.code.push(info.crainCode);
//   tmpObject.data.push(info.crainData);
// }

// export default finalCrainInfo;