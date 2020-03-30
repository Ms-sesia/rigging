import startApp from "./index";
const startTime = new Date().getTime();

const workValue = { // input value
  workWeight : 20,
  workDistance : 12,
  workHeight : 28,
};
// const workValue = { // input value
//   workWeight : 20,
//   workDistance : 20,
//   workHeight : 80,
// };

const riggingData = startApp(workValue);
// console.log(riggingData);

const endTime = new Date().getTime(); 
console.log(endTime - startTime);