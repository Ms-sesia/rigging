const riggingData = (spec, index, workValue, heightOfHookCrane, craneDistance, params) => {
  const marginHeight = Number(
    (
      params.h1 +
      params.h2 +
      heightOfHookCrane.craneHeight -
      (workValue.workHeight + heightOfHookCrane.hookHeight)
    ).toFixed(1)
  );

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
      distance1: params.d1,
      distance2: params.d2,
      centerToBuildingDistance: Number((spec.distance[index] - workValue.workDistance).toFixed(1)),
      rearToBuildingDistance: Number((spec.distance[index] - craneDistance - workValue.workDistance).toFixed(1)),
      totalDistance: Number((params.d1 + params.d2).toFixed(1)),
      tableDistance: spec.distance[index],
      workDistance: workValue.workDistance,
      height1: params.h1,
      height2: params.h2,
      totalHeight: Number((params.h1 + params.h2 + heightOfHookCrane.craneHeight).toFixed(1)),
      marginHeight: marginHeight,
      workHeight: workValue.workHeight,
      tableWeight: spec.weight[index],
      addWeight: spec.addWeight,
      overRear: spec.overRear,
      optional: spec.optional,
      workWeight: workValue.workWeight,
      safetyFactor: params.safetyFactor,
    };
};

const findMainFixSpecTable = (spec, workValue, heightOfHookCrane, craneDistance) => {
  for (let i = 0; i < spec.weight.length; i++) {
    // if(spec.weight[i] >= workValue.workWeight && workValue.workWeight/spec.weight[i]*100 <= 75) {  // weight data가 있어야하고 작업무게 이상이어야 한다.
    if (spec.weight[i] >= workValue.workWeight) {
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
          safetyFactor: Number(((workValue.workWeight / spec.weight[i]) * 100).toFixed(1)),
        };
        params.totalDist = params.d1 + params.d2;
        const blockAngle = Number((Math.atan((workValue.blockHeight - heightOfHookCrane.craneHeight) / (tableDistance - workValue.blockDistance - workValue.workDistance)) * ( 180 / Math.PI )).toFixed(1));
        const BWDistance = workValue.workDistance + workValue.blockDistance;
        if (params.totalDist > spec.distance[i - 1] && params.totalDist <= spec.distance[i]) { // totalDistance가 현재 제원표 거리보다 작거나 같고 이전 제원표 거리보다 클 경우
          if(workValue.blockDistance){
            if (workValue.workDistance < params.d2) { // 작업거리가 d2보다 작을 때
              if (workValue.workHeight > params.h1 + heightOfHookCrane.craneHeight) { // 작업높이가 h1보다 클 때
                const fixAngle2 = Number((Math.atan((workValue.workHeight - heightOfHookCrane.craneHeight - params.h1) / (craneDistance - params.d1)) * (180 / Math.PI)).toFixed(1)); // d1지점에서 건물까지의 대각선 각도
                if (mainAngle - spec.fixAngle > fixAngle2)
                  return riggingData(spec, i, workValue, heightOfHookCrane, craneDistance, params);
              } else if (workValue.workHeight < params.h1 + heightOfHookCrane.craneHeight) // 작업높이가 h1보다 작을 때
                return riggingData(spec, i, workValue, heightOfHookCrane, craneDistance, params);
            } else if (BWDistance > params.d2 && BWDistance < spec.distance[i] - craneDistance) { // 작업시작위치가 d1-크레인거리 에서 d2사이일 때.
              const mainAngle2 = Number(
                ( Math.atan((workValue.workHeight - heightOfHookCrane.craneHeight) / (spec.distance[i] - workValue.workDistance)) * (180 / Math.PI)).toFixed(1)); // 크레인이 건물과 맞닿아있을 때의 각도(메인붐이 건물과 닿지 않을 최소각도)
              if (mainAngle > mainAngle2)
                return riggingData(spec, i, workValue, heightOfHookCrane, craneDistance, params);
            }
          } else {
            if (workValue.workDistance < params.d2) { // 작업거리가 d2보다 작을 때
              if (workValue.workHeight > params.h1 + heightOfHookCrane.craneHeight) { // 작업높이가 h1보다 클 때
                const fixAngle2 = Number((Math.atan((workValue.workHeight - heightOfHookCrane.craneHeight - params.h1) / (craneDistance - params.d1)) * (180 / Math.PI)).toFixed(1)); // d1지점에서 건물까지의 대각선 각도
                if (mainAngle - spec.fixAngle > fixAngle2)
                  return riggingData(spec, i, workValue, heightOfHookCrane, craneDistance, params);
              } else if (workValue.workHeight < params.h1 + heightOfHookCrane.craneHeight) // 작업높이가 h1보다 작을 때
                return riggingData(spec, i, workValue, heightOfHookCrane, craneDistance, params);
            } else if (workValue.workDistance > params.d2 && workValue.workDistance < spec.distance[i] - craneDistance) { // 작업시작위치가 d1-크레인거리 에서 d2사이일 때.
              const mainAngle2 = Number(
                ( Math.atan((workValue.workHeight - heightOfHookCrane.craneHeight) / (spec.distance[i] - workValue.workDistance)) * (180 / Math.PI)).toFixed(1)); // 크레인이 건물과 맞닿아있을 때의 각도(메인붐이 건물과 닿지 않을 최소각도)
              if (mainAngle > mainAngle2)
                return riggingData(spec, i, workValue, heightOfHookCrane, craneDistance, params);
            }
          }
        }
      }
    }
  }
};

export default findMainFixSpecTable;
