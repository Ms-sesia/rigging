import startApp from "./index";

const workValue = { // input value
  workWeight : 55,
  workDistance : 26,
  workHeight : 45,
};

const riggingData = startApp(workValue);
console.log(riggingData);