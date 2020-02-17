const finalCraneInfo = (craneInfo) => {
  let tmpValue = [];
  craneInfo.map( (info, index) => {
    if(index === 0) tmpValue.push(info);
    else if(info.craneName !== craneInfo[index-1].craneName)  tmpValue.push(info);  // 크레인이 다르면
    else if(info.craneModeName !== craneInfo[index-1].craneModeName)  tmpValue.push(info);  // 동일 크레인에서 모드가 다르면
  });
  
  return tmpValue;
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