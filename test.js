import startApp from "./index";
// const startTime = new Date().getTime();

// const workValue = { // input value Unity test1
//   workWeight : 20,
//   workDistance : 12,
//   workHeight : 28,
// };
// const workValue = { // input value Unity test2
//   workWeight : 5,
//   workDistance : 20,
//   workHeight : 80,
// };
const workValue = { // input value  
  craneLocation : 'back',  // front, back, side
  block : {
    blockDistance1: 64.3,
    blockDistance2: 0,
    blockHeight1: 0,
    blockHeight2: 0
  },
  workWeight : 7.5,
  workBuilding : {  // 크레인이 건물에 붙는 면을 가로.
    vertical : 1,
    horizontal : 1,
    height : 68,
  },
};

const riggingData = startApp(workValue);
console.log(riggingData);

// const endTime = new Date().getTime(); 
// console.log(endTime - startTime);