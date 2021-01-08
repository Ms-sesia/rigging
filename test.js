import partsArray from "./libs/partsArray";
import startApp from "./libs/riggingData";

const workValue = {
  // input value
  safetyFactor: 85,
  craneLocation: "back", // front, back, side
  workWeight: 20,
  workBuilding: {
    // 크레인이 건물에 붙는 면을 가로.
    vertical: 20, //거리
    horizontal: 0,
    height: 20, //높이
  },
  block: {
    // vertical1: 10, //거리
    // horizontal1: 0,
    // height1: 10, //높이
    // vertical2: 5, //여유거리
    // height2: 0,
    vertical1: undefined, //거리
    horizontal1: undefined,
    height1: undefined, //높이
    vertical2: undefined, //여유거리
    height2: undefined,
  },
};
// const result = startApp(workValue);
// console.log(result);
// result.forEach((data) => console.log(data.riggingData.workBuilding, data.riggingData.block));
// partsArray(result);
// console.log(partsArray(craneData));

// const partsInfoData = partsArray(craneData);

const craneDataCal = startApp(workValue);
// console.log(craneDataCal);
craneDataCal.forEach((data) => {
  console.log(data);
});
// const partsInfoData = partsArray(craneDataCal[18]);
// const partsInfoData = partsArray(craneDataCal[craneDataCal.length-1]);
// const partsInfoData = partsArray(craneDataCal[46]);
// console.log(craneDataCal[46]);
// console.log('-------------------------------------------------------------------------------');
// console.log("partsList", partsInfoData.partsList);
// console.log("-------------------------------------------------------------------------------");
// console.log("allPartsData", partsInfoData.partsData);
// console.log("-------------------------------------------------------------------------------");
// console.log("marker", partsInfoData.partsData.BODY.marker);
// console.log("-------------------------------------------------------------------------------");
// console.log("connectionData", partsInfoData.connectionData);
