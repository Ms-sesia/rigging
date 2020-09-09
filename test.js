import startApp from "./index";
const workValue = { // input value  
  safetyFactor : 80,
  craneLocation : 'back',  // front, back, side
  workWeight : 7.5,
  workBuilding : {  // 크레인이 건물에 붙는 면을 가로.
    vertical : 1,
    horizontal : 1,
    height : 68,
  },
  block : {
    vertical1: 64.3,
    horizontal1: 0,
    height1: 0,
    vertical2: 0,
    height2: 0
  },
};

const riggingData = startApp(workValue);
console.log(riggingData);

// const endTime = new Date().getTime(); 
// console.log(endTime - startTime);