const riggingData = (spec, index, workValue, heightOfHookCrane, craneDistance, params, testCode) => {
  const marginHeight = Number(
    (params.h1 + params.h2 + heightOfHookCrane.craneHeight - (workValue.workHeight + heightOfHookCrane.hookHeight)).toFixed(1)
  );
  const B1B2WDistance = workValue.workDistance + workValue.blockDistance1 + workValue.blockDistance2;

  if (marginHeight > 0)
    return {
      // 출력용 객체, 거리가 먼 것(가벼운 중량을 들 수 있는 것)을 기준으로 출력
      mainBoom: spec.mainBoom,
      mainAngle: params.mainAngle,
      totalExtLength: spec.totalExtLength,
      adapter1: spec.adapter1,
      extBoom1: spec.extBoom1,
      extBoom2: spec.extBoom2,
      extBoom3: spec.extBoom3,
      extBoom4: spec.extBoom4,
      adapter2: Number(spec.adapter2.toFixed(1)), // 값이 소숫점 9번째 자리까지 나와서 fixed이용.
      fixLuffing: spec.fixLuffing,
      fixLuffingAngle: spec.fixAngle,
      craneRearDistance: craneDistance,
      distance1: Number((params.d1).toFixed(1)),
      distance2: Number((params.d2).toFixed(1)),
      centerToBuildingDistance: Number((spec.distance[index] - workValue.workDistance).toFixed(1)),
      centerToBlockDistance : Number((spec.distance[index] - B1B2WDistance).toFixed(1)),
      rearToBuildingDistance: Number((spec.distance[index] - craneDistance - workValue.workDistance).toFixed(1)),
      rearToBlockDistance : Number((spec.distance[index] - craneDistance - B1B2WDistance).toFixed(1)),
      totalDistance: Number((params.d1 + params.d2).toFixed(1)),
      tableDistance: spec.distance[index],
      workDistance: workValue.workDistance,
      height1: Number((params.h1).toFixed(1)),
      height2: Number((params.h2).toFixed(1)),
      totalHeight: Number((params.h1 + params.h2 + heightOfHookCrane.craneHeight).toFixed(1)),
      marginHeight: marginHeight,
      workHeight: workValue.workHeight,
      tableWeight: spec.weight[index],
      addWeight: spec.addWeight,
      overRear: spec.overRear,
      optional: spec.optional,
      workWeight: workValue.workWeight,
      safetyFactor: params.safetyFactor,  // 안전율
      testCode : testCode,
    };
};

const findMainFixSpecTable = (spec, workValue, heightOfHookCrane, craneDistance) => {
  const B1B2WDistance = workValue.workDistance + workValue.blockDistance1 + workValue.blockDistance2;
  const BWDistance = workValue.workDistance + workValue.blockDistance1;
  for (let i = 0; i < spec.weight.length; i++) {
    // if(spec.weight[i] >= workValue.workWeight && workValue.workWeight/spec.weight[i]*100 <= 75) {  // weight data가 있어야하고 작업무게 이상이어야 한다.
    if (spec.weight[i] >= workValue.workWeight && B1B2WDistance + craneDistance < spec.distance[i]) {
      // weight data가 있어야하고 작업무게 이상이어야 한다.
      // fix, main 모드에서 메인붐 각도는 60~85도
      for (let mainAngle = 85; mainAngle >= 60; mainAngle--) {
        // 삼각함수 : Math.cos(x*Math.PI/180) 각도는 라디안 표기
        const MBoom = spec.mainBoom + spec.totalExtLength; // mainBoom + totalExtLength
        const params = {
          mainAngle: mainAngle,
          d1: MBoom * Math.cos((mainAngle * Math.PI) / 180),
          d2: spec.fixLuffing * Math.cos(((mainAngle - spec.fixAngle) * Math.PI) / 180),
          h1: MBoom * Math.sin((mainAngle * Math.PI) / 180),
          h2: spec.fixLuffing * Math.sin(((mainAngle - spec.fixAngle) * Math.PI) / 180),
          safetyFactor: Number(((workValue.workWeight / spec.weight[i]) * 85).toFixed(1)),
        };
        params.totalDist = params.d1 + params.d2;

        // 크레인 길이가 크레인 센터에서 장애물까지의 길이보다 길면 계산 x => b1b2wdist + canedist < totaldist 조건으로 상쇄
        // if (spec.distance[i] - BWDistance - craneDistance < 0)
        //   continue;
        if(workValue.blockHeight === undefined)
          workValue.blockHeight = 0;
        if(workValue.blockDistance === undefined)
          workValue.blockDistance = 0;

        // 장애물이 있을 때 크레인으로부터의 각도
        let blockAngle = 0;
        if(workValue.blockHeight)
         blockAngle = Number((Math.atan((workValue.blockHeight - heightOfHookCrane.craneHeight) / (spec.distance[i] - BWDistance)) * ( 180 / Math.PI )).toFixed(1));
        
        // totalDistance가 계산으로 생성되었기 때문에 i-1과 i사이의 값이 될 수 있으므로 찾아야한다.
        if(params.totalDist > spec.distance[i-1] && params.totalDist <= spec.distance[i]){
          // -------------------------------- 장애물 추가 시 리깅 조건 계산
          // 1. 작업높이가 장애물높이보다 작을 때
          if(workValue.workHeight < workValue.blockHeight) {
            // 1) 장애물거리 + 작업거리가 d2와 크레인 시작점 사이일 때 && mainAngle이 blockAngle보다 클 때
            if( params.d2 < B1B2WDistance && B1B2WDistance < (spec.distance[i] - craneDistance) && blockAngle < mainAngle ){ 
              // 1] h1+크레인높이 > 장애물 높이
              if(params.h1 + heightOfHookCrane.craneHeight > workValue.blockHeight){
                const testCode = 1; 
                return riggingData(spec, i, workValue, heightOfHookCrane, craneDistance, params, testCode);
              }
            // 2) 장애물거리 + 작업거리가 d2보다 작을 때 && mainAngle이 blockAngle보다 클 때
            } else if(params.d2 > B1B2WDistance && blockAngle < mainAngle) {
              // 1] h1+크레인높이 > 장애물 높이
              if(params.h1 + heightOfHookCrane.craneHeight > workValue.blockHeight){
                const testCode = 2;
                return riggingData(spec, i, workValue, heightOfHookCrane, craneDistance, params, testCode);
              }
              // 2] h1+크레인높이 < 장애물 높이
              else if (params.h1 + heightOfHookCrane.craneHeight < workValue.blockHeight){
                const fixAngle2 = Number((Math.atan((workValue.blockHeight - params.h1 - heightOfHookCrane.craneHeight) / (params.d2 - BWDistance)) * (180 / Math.PI)).toFixed(1)); // 픽스(러핑) 시작지점에서 건물까지의 대각선 각도
                if(fixAngle2 < spec.fixAngle) {
                  const testCode = 3;
                  return riggingData(spec, i, workValue, heightOfHookCrane, craneDistance, params, testCode);
                }
              }
            }
          // 2. 작업높이가 장애물높이보다 클 때
          } else if(workValue.workHeight > workValue.blockHeight){
            // 1) 장애물거리 + 작업거리가 d2와 크레인 시작점 사이일 때 && mainAngle이 blockAngle보다 클 때 && mainAngle이 건물까지의 각도인 minMainAngle보다 클 때
            const minMainAngle = Number((Math.atan((workValue.workHeight - heightOfHookCrane.craneHeight) / (spec.distance[i] - workValue.workDistance)) * ( 180 / Math.PI )).toFixed(1));
            if( params.d2 < B1B2WDistance && B1B2WDistance < (spec.distance[i] - craneDistance) && blockAngle < mainAngle && minMainAngle < mainAngle){ 
              // 1] h1 + 크레인높이 > 작업높이
              if(params.h1 + heightOfHookCrane.craneHeight > workValue.workHeight){
                const testCode = 4;
                return riggingData(spec, i, workValue, heightOfHookCrane, craneDistance, params, testCode);
              }
              // 2] h1 + 크레인높이 < 작업높이
              else if(params.h1 + heightOfHookCrane.craneHeight < workValue.workHeight){
                const fixAngle2 = Number((Math.atan((workValue.workHeight - params.h1 - heightOfHookCrane.craneHeight) / (params.d2 - workValue.workDistance)) * (180 / Math.PI)).toFixed(1)); // 픽스(러핑) 시작지점에서 건물까지의 대각선 각도
                if( fixAngle2 < spec.fixAngle){
                  const testCode = 5;
                  return riggingData(spec, i, workValue, heightOfHookCrane, craneDistance, params, testCode);
                }
              }
            // 2) 장애물거리 + 작업거리가 d2보다 작을 때 && mainAngle이 blockAngle보다 클 때
            } else if(params.d2 > B1B2WDistance && blockAngle < mainAngle && minMainAngle < mainAngle) {
              // 1] h1 + 크레인높이 > 작업높이
              if(params.h1 + heightOfHookCrane.craneHeight > workValue.workHeight){
                const testCode = 6;
                return riggingData(spec, i, workValue, heightOfHookCrane, craneDistance, params, testCode);
              }
              // 2] h1 + 크레인높이 < 작업높이
              else if (params.h1 + heightOfHookCrane.craneHeight < workValue.workHeight){
                const fixAngle2 = Number((Math.atan((workValue.workHeight - params.h1 - heightOfHookCrane.craneHeight) / (params.d2 - workValue.workDistance)) * (180 / Math.PI)).toFixed(1)); // 픽스(러핑) 시작지점에서 건물까지의 대각선 각도
                if(fixAngle2 < spec.fixAngle) {
                  const testCode = 7;
                  return riggingData(spec, i, workValue, heightOfHookCrane, craneDistance, params, testCode);
                }
              }
            }
          }
        }
      }
    }
  }
};


// 장애물이 없을 때 fix 알고리즘
        
        // if (workValue.workDistance < params.d2) { // 작업거리가 d2보다 작을 때
        //   if (workValue.workHeight > params.h1 + heightOfHookCrane.craneHeight) { // 작업높이가 h1보다 클 때
        //     const fixAngle2 = Number((Math.atan((workValue.workHeight - heightOfHookCrane.craneHeight - params.h1) / (craneDistance - params.d1)) * (180 / Math.PI)).toFixed(1)); // d1지점에서 건물까지의 대각선 각도
        //     if (mainAngle - spec.fixAngle > fixAngle2)
        //       return riggingData(spec, i, workValue, heightOfHookCrane, craneDistance, params);
        //   } else if (workValue.workHeight < params.h1 + heightOfHookCrane.craneHeight) // 작업높이가 h1보다 작을 때
        //     return riggingData(spec, i, workValue, heightOfHookCrane, craneDistance, params);
        // } else if (workValue.workDistance > params.d2 && workValue.workDistance < spec.distance[i] - craneDistance) { // 작업시작위치가 d1-크레인거리 에서 d2사이일 때.
        //   const mainAngle2 = Number(
        //     ( Math.atan((workValue.workHeight - heightOfHookCrane.craneHeight) / (spec.distance[i] - workValue.workDistance)) * (180 / Math.PI)).toFixed(1)); // 크레인이 건물과 맞닿아있을 때의 각도(메인붐이 건물과 닿지 않을 최소각도)
        //   if (mainAngle > mainAngle2)
        //     return riggingData(spec, i, workValue, heightOfHookCrane, craneDistance, params);
        // }

export default findMainFixSpecTable;



