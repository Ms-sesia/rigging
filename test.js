import startApp from "./index";
const startTime = new Date().getTime();

const workValue = { // input value
  workWeight : 5,
  workDistance : 7,
  workHeight : 7,
};

const riggingData = startApp(workValue);
console.log(riggingData);

const endTime = new Date().getTime(); 
console.log(endTime - startTime);