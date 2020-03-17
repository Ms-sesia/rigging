import startApp from "./index";
const startTime = new Date().getTime();

const workValue = { // input value
  workWeight : 40,
  workDistance : 8,
  workHeight : 42,
};

const riggingData = startApp(workValue);
// console.log(riggingData);

const endTime = new Date().getTime(); 
console.log(endTime - startTime);