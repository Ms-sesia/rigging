import partsArray from "./libs/partsArray";
import startApp from "./libs/riggingData";

const workValue = { // input value  
  safetyFactor : 85,
  craneLocation : 'back',  // front, back, side
  // workWeight : 7.5,
  // workBuilding : {  // 크레인이 건물에 붙는 면을 가로.
  //   vertical : 1,
  //   horizontal : 0,
  //   height : 68,
  // },
  // block : {
  //   vertical1: 64.3,
  //   horizontal1: 0,
  //   height1: 0,
  //   vertical2: 0,
  //   height2: 0
  // },
  workWeight : 20,
  workBuilding : {  // 크레인이 건물에 붙는 면을 가로.
    vertical : 8,
    horizontal : 0,
    height : 34,
  },
  block : {
    vertical1: 0,
    horizontal1: 0,
    height1: 0,
    vertical2: 0,
    height2: 0
  },
};

// startApp(workValue);
// console.log(startApp(workValue));
// partsArray(craneData);
// console.log(partsArray(craneData));

const craneDataCal = startApp(workValue);
const partsInfoData = partsArray(craneDataCal[craneDataCal.length-1]);
console.log(craneDataCal[craneDataCal.length-1]);
console.log('-------------------------------------------------------------------------------');
console.log(partsInfoData.partsList);
console.log('-------------------------------------------------------------------------------');
console.log(partsInfoData.partsData);
console.log('-------------------------------------------------------------------------------');
console.log(partsInfoData.connectionData);