const riggingData = (spec, index, workValue, heightOfHookCrane, craneDistance, params, testCode) => {
  const marginHeight =  Number((params.h1 + params.h2 + heightOfHookCrane.craneHeight - (workValue.workHeight + heightOfHookCrane.hookHeight)).toFixed(1));
  const BWDistance = workValue.workDistance + workValue.blockDistance;

  if(marginHeight > 0)  return {  // 출력용 객체, 거리가 먼 것(가벼운 중량을 들 수 있는 것)을 기준으로 출력
    mainBoom : spec.mainBoom,
    mainAngle : spec.mainAngle,
    totalExtLength : spec.totalExtLength,
    adapter1 : spec.adapter1,
    extBoom1 : spec.extBoom1,
    extBoom2 : spec.extBoom2,
    extBoom3 : spec.extBoom3,
    extBoom4 : spec.extBoom4,
    adapter2 : Number(spec.adapter2.toFixed(1)),  // 값이 소숫점 9번째 자리까지 나와서 fixed이용.
    fixLuffing : spec.fixLuffing,
    fixLuffingAngle : Number(spec.mainAngle - params.luffingAngle.toFixed(1)),
    // fixLuffingAngle : Number(params.luffingAngle.toFixed(1)),
    craneRearDistance : craneDistance,
    distance1 : Number(params.d1.toFixed(1)),
    distance2 : Number(params.d2.toFixed(1)),
    centerToBuildingDistance : Number((spec.distance[index] - workValue.workDistance).toFixed(1)),
    centerToBlockDistance : Number((spec.distance[index] - BWDistance).toFixed(1)),
    rearToBuildingDistance : Number((spec.distance[index] - craneDistance - workValue.workDistance).toFixed(1)),
    rearToBlockDistance : Number((spec.distance[index] - craneDistance - BWDistance).toFixed(1)),
    totalDistance : Number((params.d1 + params.d2).toFixed(1)),
    tableDistance : spec.distance[index],
    workDistance : workValue.workDistance,
    height1 : Number(params.h1.toFixed(1)),
    height2 : Number(params.h2.toFixed(1)),
    totalHeight : Number((params.h1 + params.h2 + heightOfHookCrane.craneHeight).toFixed(1)),
    marginHeight : marginHeight,
    workHeight : workValue.workHeight,
    tableWeight : spec.weight[index],
    addWeight : spec.addWeight,
    overRear : spec.overRear,
    optional : spec.optional,
    workWeight : workValue.workWeight,
    safetyFactor : params.safetyFactor,  // 안전율
    testCode : testCode,
  };
}

const findLuffingSpecTable = (spec, workValue, heightOfHookCrane, craneDistance) => {
  for(let i = 0 ; i < spec.weight.length ; i++){
    // if(spec.weight[i] >= workValue.workWeight && workValue.workWeight/spec.weight[i]*100 <= 75) {  // weight data가 있어야하고 작업무게 이상이어야 한다.
    if(spec.weight[i] >= workValue.workWeight) {  // weight data가 있어야하고 작업무게 이상이어야 한다.
      let params = {};
      const MBoom = spec.mainBoom + spec.totalExtLength;// mainBoom + totalExtLength
      const BWDistance = workValue.workDistance + workValue.blockDistance;
      // 삼각함수 : Math.cos(x*Math.PI/180) 각도는 라디안 표기
      params.d1 = MBoom * Math.cos(spec.mainAngle * Math.PI/180);  // luffing에서 d1은 메인붐과 메인붐각도가 정해져있기 때문에 고정
      
      // 크레인 길이가 크레인 센터에서 장애물까지의 길이보다 길면 계산 x
      if (spec.distance[i] - BWDistance - craneDistance < 0)
        continue;
      params.d2 = spec.distance[i] - params.d1;
      params.luffingAngle = Number((Math.acos(params.d2/spec.fixLuffing)*(180/Math.PI)).toFixed(1));  // 지면과 수평으로부터 올라오는 러핑 각도
      params.h1 = MBoom * Math.sin(spec.mainAngle * Math.PI/180);
      params.h2 = spec.fixLuffing * Math.sin(params.luffingAngle * Math.PI/180);
      params.safetyFactor = Number((workValue.workWeight / spec.weight[i] * 85).toFixed(1));
      if(workValue.blockHeight === undefined)
        workValue.blockHeight = 0;
      if(workValue.blockDistance === undefined)
        workValue.blockDistance = 0;

      // 장애물이 있을 때 크레인으로부터의 각도
      let blockAngle = 0;
      if(workValue.blockHeight !== 0)
       blockAngle = Number((Math.atan((workValue.blockHeight - heightOfHookCrane.craneHeight) / (spec.distance[i] - BWDistance)) * ( 180 / Math.PI )).toFixed(1));
      
      // spec.distance[i] 가 totalDistance로 이용을 하고 있기 때문에 i-1과 i의 거리가 필요 없다.
      // -------------------------------- 장애물 추가 시 리깅 조건 계산
      // 1. 작업높이가 장애물높이보다 작을 때
      if(workValue.workHeight < workValue.blockHeight) {
        // 1) 장애물거리 + 작업거리가 d2와 크레인 시작점 사이일 때 && mainAngle이 blockAngle보다 클 때
        if(params.d2 < BWDistance && BWDistance < (spec.distance[i] - craneDistance) && blockAngle < spec.mainAngle){ 
          // 1] h1+크레인높이 > 장애물 높이
          if(params.h1 + heightOfHookCrane.craneHeight > workValue.blockHeight){
            const testCode = 1;
            return riggingData(spec, i, workValue, heightOfHookCrane, craneDistance, params, testCode);
          }
        // 2) 장애물거리 + 작업거리가 d2보다 작을 때 && mainAngle이 blockAngle보다 클 때
        } else if(params.d2 > BWDistance && blockAngle < spec.mainAngle) {
          // 1] h1+크레인높이 > 장애물 높이
          if(params.h1 + heightOfHookCrane.craneHeight > workValue.blockHeight){
            const testCode = 2;
            return riggingData(spec, i, workValue, heightOfHookCrane, craneDistance, params, testCode);
          }
          // 2] h1+크레인높이 < 장애물 높이
          else if (params.h1 + heightOfHookCrane.craneHeight < workValue.blockHeight){
            const luffingAngle2 = Number((Math.atan((workValue.blockHeight - params.h1 - heightOfHookCrane.craneHeight) / (params.d2 - BWDistance)) * (180 / Math.PI)).toFixed(1)); // 픽스(러핑) 시작지점에서 건물까지의 대각선 각도
            if(luffingAngle2 < params.luffingAngle){
              const testCode = 3;
              return riggingData(spec, i, workValue, heightOfHookCrane, craneDistance, params, testCode);
            }
          }
        }
      // 2. 작업높이가 장애물높이보다 클 때
      } else if(workValue.workHeight > workValue.blockHeight){
        // 1) 장애물거리 + 작업거리가 d2와 크레인 시작점 사이일 때 && mainAngle이 blockAngle보다 클 때 && mainAngle이 건물까지의 각도인 minMainAngle보다 클 때
        const minMainAngle = Number((Math.atan((workValue.workHeight - heightOfHookCrane.craneHeight) / (spec.distance[i] - workValue.workDistance)) * ( 180 / Math.PI )).toFixed(1));
        if( params.d2 < BWDistance && BWDistance < (spec.distance[i] - craneDistance) && blockAngle < spec.mainAngle && minMainAngle < spec.mainAngle){ 
          // 1] h1 + 크레인높이 > 작업높이
          if(params.h1 + heightOfHookCrane.craneHeight > workValue.workHeight){
            const testCode = 4;
            return riggingData(spec, i, workValue, heightOfHookCrane, craneDistance, params, testCode);
          }
          // 2] h1 + 크레인높이 < 작업높이
          else if(params.h1 + heightOfHookCrane.craneHeight < workValue.workHeight){
            const luffingAngle2 = Number((Math.atan((workValue.workHeight - params.h1 - heightOfHookCrane.craneHeight) / (params.d2 - workValue.workDistance)) * (180 / Math.PI)).toFixed(1)); // 픽스(러핑) 시작지점에서 건물까지의 대각선 각도
            if( luffingAngle2 < params.luffingAngle){
              const testCode = 5;
              return riggingData(spec, i, workValue, heightOfHookCrane, craneDistance, params, testCode);
            }
          }
        // 2) 장애물거리 + 작업거리가 d2보다 작을 때 && mainAngle이 blockAngle보다 클 때
        } else if(params.d2 > BWDistance && blockAngle < spec.mainAngle && minMainAngle < spec.mainAngle) {
          // 1] h1 + 크레인높이 > 작업높이
          if(params.h1 + heightOfHookCrane.craneHeight > workValue.workHeight){
            const testCode = 6; 
            return riggingData(spec, i, workValue, heightOfHookCrane, craneDistance, params, testCode);
          }
          // 2] h1 + 크레인높이 < 작업높이
          else if (params.h1 + heightOfHookCrane.craneHeight < workValue.blockHeight){
            const luffingAngle2 = Number((Math.atan((workValue.workHeight - params.h1 - heightOfHookCrane.craneHeight) / (params.d2 - workValue.workDistance)) * (180 / Math.PI)).toFixed(1)); // 픽스(러핑) 시작지점에서 건물까지의 대각선 각도
            if(luffingAngle2 < params.luffingAngle){
              const testCode = 7;
              return riggingData(spec, i, workValue, heightOfHookCrane, craneDistance, params, testCode);
            }
          }
        }
      }
    }
  }
};


/*
장애물이 없을 때의 알고리즘

if(workValue.workDistance < params.d2){ // 작업거리가 d2보다 작을 때
  if(workValue.workHeight > (params.h1 + heightOfHookCrane.craneHeight)){ // 작업높이가 h1보다 클 때
    const luffingAngle2 = Number((Math.atan( (workValue.workHeight - heightOfHookCrane.craneHeight - params.h1) / (params.d2 - workValue.workDistance) )*(180/Math.PI)).toFixed(1));  // d2 시작 지점에서 건물까지의 대각선 각도
    if(params.luffingAngle > luffingAngle2){
      return riggingData(spec, i, workValue, heightOfHookCrane, craneDistance, params);
    }
  } else if(workValue.workHeight < (params.h1 + heightOfHookCrane.craneHeight)){ // 작업높이가 h1보다 작을 때
    return riggingData(spec, i, workValue, heightOfHookCrane, craneDistance, params);
  }
} else if(workValue.workDistance > params.d2 && workValue.workDistance < spec.distance[i] - craneDistance){  // 작업 시작위치가 d1-크레인거리 에서 d2사이일 때.
  const mainAngle2 = Number((Math.atan((workValue.workHeight - heightOfHookCrane.craneHeight)/spec.distance[i] - workValue.workDistance)*(180/Math.PI)).toFixed(1));  // 크레인센터에서부터 건물까지의 대각선 각도
  if(spec.mainAngle > mainAngle2){  // 크레인 메인붐이 건물에 닿지 않기위한 최소 조건
    return riggingData(spec, i, workValue, heightOfHookCrane, craneDistance, params);
  }
}
*/

export default findLuffingSpecTable;