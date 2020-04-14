import startApp from "./index";
const startTime = new Date().getTime();

// const workValue = { // input value
//   workWeight : 20,
//   workDistance : 12,
//   workHeight : 28,
// };
// const workValue = { // input value
//   workWeight : 5,
//   workDistance : 28,
//   workHeight : 28,
// };
const workValue = { // input value
  workWeight : 1,
  workDistance : 126,
  workHeight : 47,
};

const riggingData = startApp(workValue);
// console.log(riggingData);

const endTime = new Date().getTime(); 
// console.log(endTime - startTime);