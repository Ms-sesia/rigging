import startApp from "./index";

const workValue = { // input value
  workWeight : 23,
  workDistance : 24,
  workHeight : 55,
};

const riggingData = startApp(workValue);
console.log(riggingData);