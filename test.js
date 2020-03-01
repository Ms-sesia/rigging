import startApp from "./index";
const startTime = new Date().getTime();

const workValue = { // input value
  workWeight : 21,
  workDistance : 22,
  workHeight : 30,
};

const riggingData = startApp(workValue);
console.log(riggingData);

const endTime = new Date().getTime(); 
console.log(endTime - startTime);