import startApp from "./index";
const startTime = new Date().getTime();

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
  blockHeight: 15,
  blockDistance: 5,
  workWeight : 8,
  workDistance : 42,
  workHeight : 82,
};

const riggingData = startApp(workValue);
console.log(riggingData);

const endTime = new Date().getTime(); 
// console.log(endTime - startTime);