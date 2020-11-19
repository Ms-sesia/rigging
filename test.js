import partsArray from "./libs/partsArray";
import startApp from "./libs/riggingData";

const workValue = { // input value  
  safetyFactor : 85,
  craneLocation : 'back',  // front, back, side
  workWeight : 20,
  workBuilding : {  // 크레인이 건물에 붙는 면을 가로.
    vertical : 18,
    horizontal : 0,
    height : 12,
  },
  block : {
    vertical1: 4,
    horizontal1: 0,
    height1: 3,
    vertical2: 3,
    height2: 0
  },
};
startApp(workValue);
// console.log(startApp(workValue));
// partsArray(craneData);
// console.log(partsArray(craneData));

// const partsInfoData = partsArray(craneData);
const partsInfoData = partsArray(craneDataCal[craneDataCal.length-1]);
console.log(craneDataCal[craneDataCal.length-1]);
console.log('-------------------------------------------------------------------------------');
console.log(partsInfoData.partsList);
console.log('-------------------------------------------------------------------------------');
console.log(partsInfoData.partsData);
console.log('-------------------------------------------------------------------------------');
console.log(partsInfoData.connectionData);