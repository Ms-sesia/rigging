const riggingData = (spec, index, workValue, heightOfHookCrane, craneDistance, params, testCode) => {
  const marginHeight = Number((params.h1 + params.h2 + heightOfHookCrane.craneHeight - (workValue.workBuilding.height + heightOfHookCrane.hookHeight)).toFixed(1));
  const B1B2WDistance = workValue.workBuilding.vertical + workValue.block.vertical1 + workValue.block.vertical2;

  if (marginHeight > 0)
    return {
      // 출력용 객체, 거리가 먼 것(가벼운 중량을 들 수 있는 것)을 기준으로 출력
      mainBoom: spec.mainBoom,
      mainAngle: spec.mainAngle,
      totalExtLength: spec.totalExtLength,
      adapter1: spec.adapter1,
      extBoom1: spec.extBoom1,
      extBoom2: spec.extBoom2,
      extBoom3: spec.extBoom3,
      extBoom4: spec.extBoom4,
      adapter2: Number(spec.adapter2.toFixed(1)), // 값이 소숫점 9번째 자리까지 나와서 fixed이용.
      flyFixLuffing: spec.flyFixLuffing,
      flyFixLuffingAngle: Number(spec.mainAngle - params.luffingAngle.toFixed(1)), // mainAngle에서 내려오는 luffing각도.
      distance1: Number(params.d1.toFixed(1)),
      distance2: Number(params.d2.toFixed(1)),
      craneDistance: craneDistance,
      edgeDistance: {
        mainToBlock: params.mainToBlockEdgeDistance,
        mainToBuilding: params.mainToBuildingEdgeDistance,
        flyFixLuffingToBlock: params.flyFixLuffingToBlockEdgeDistance,
        flyFixLuffingToBuilding: params.flyFixLuffingToBuildingEdgeDistance,
      },
      centerToBuildingDistance: Number((spec.distance[index] - workValue.workBuilding.vertical).toFixed(1)),
      centerToBlockDistance: Number((spec.distance[index] - B1B2WDistance).toFixed(1)),
      craneToBuildingDistance: Number(
        (spec.distance[index] - craneDistance - workValue.workBuilding.vertical).toFixed(1)
      ),
      craneToBlockDistance: Number((spec.distance[index] - craneDistance - B1B2WDistance).toFixed(1)),
      totalDistance: Number((params.d1 + params.d2).toFixed(1)),
      tableDistance: spec.distance[index],
      height1: Number(params.h1.toFixed(1)),
      height2: Number(params.h2.toFixed(1)),
      totalHeight: Number((params.h1 + params.h2 + heightOfHookCrane.craneHeight).toFixed(1)),
      marginHeight: marginHeight,
      workingArea: spec.workingArea,
      tableWeight: spec.weight[index],
      counterWeight: spec.counterWeight.toString(),
      overRear: spec.overRear,
      optional: spec.optional,
      safetyFactor: params.safetyFactor, // 안전율
      craneLocation: workValue.craneLocation,
      workWeight: workValue.workWeight,
      workBuilding: {
        horizontal: workValue.workBuilding.horizontal,
        vertical: workValue.workBuilding.vertical,
        height: workValue.workBuilding.height,
      },
      block: {
        vertical1: workValue.block.vertical1,
        horizontal1: workValue.block.horizontal1,
        height1: workValue.block.height1,
        vertical2: workValue.block.vertical2,
        height2: workValue.block.height2,
      },
      testCode: testCode,
    };
};

const findLuffingSpecTable = (
  spec,
  workValue,
  heightOfHookCrane,
  { rearDistance, frontDistance, trigger, centerToBoom, halfLuffingHeight, adapterHeight }
) => {
  let craneDistance;
  switch (workValue.craneLocation) {
    case "back":
      craneDistance = rearDistance + centerToBoom;
      break;
    case "front":
      craneDistance = frontDistance;
      break;
    case "side":
      craneDistance = trigger;
      break;
  }
  for (let i = 0; i < spec.weight.length; i++) {
    const safetyFactor = Number(((workValue.workWeight / spec.weight[i]) * 85).toFixed(1));
    // 원하는 안전율보다 낮은 안전율만 계산.
    if (safetyFactor < workValue.safetyFactor) {
      // weight data가 있어야하고 작업무게 이상
      if (spec.weight[i] >= workValue.workWeight) {
        let params = {};
        let blockVertical1 = 0, workBuildingVertical, B1WHeight;
        const MBoom = spec.mainBoom + spec.totalExtLength; // mainBoom + totalExtLength
        // 삼각함수 : Math.cos(x*Math.PI/180) 각도는 라디안 표기
        params.d1 = MBoom * Math.cos((spec.mainAngle * Math.PI) / 180); // luffing에서 d1은 메인붐과 메인붐각도가 정해져있기 때문에 고정
        // 크레인 길이가 크레인 센터에서 장애물까지의 길이보다 길면 계산 x => b1b2wdist + cranedist < totaldist 조건으로 상쇄
        params.d2 = spec.distance[i] - params.d1;
        params.luffingAngle = Number((Math.acos(params.d2 / spec.flyFixLuffing) * (180 / Math.PI)).toFixed(1)); // 지면과 수평으로부터 올라오는 러핑 각도
        params.luffingMargin = halfLuffingHeight / Math.sin((params.luffingAngle * Math.PI) / 180);
        params.adapterMargin = adapterHeight / Math.sin((spec.mainAngle * Math.PI) / 180);
        params.h1 = MBoom * Math.sin((spec.mainAngle * Math.PI) / 180);
        params.h2 = spec.flyFixLuffing * Math.sin((params.luffingAngle * Math.PI) / 180);
        params.safetyFactor = safetyFactor;
        if(workValue.block.vertical1) 
          blockVertical1 = workValue.block.vertical1 + params.luffingMargin + params.adapterMargin;
        else workBuildingVertical = workValue.workBuilding.vertical + params.luffingMargin + params.adapterMargin;
        const B1B2WDistance = workBuildingVertical + blockVertical1 + workValue.block.vertical2;
        const B1WDistance = workBuildingVertical + blockVertical1;
        // 장애물 1 2 거리 + 작업거리 + 크레인거리 + luffingMargin + adapterMargin 이 총 거리보다 작아야한다.
        if (B1B2WDistance + craneDistance < spec.distance[i]) {
          // 나중에 resolver에서 mutation의 args단에서 처리
          if (!workValue.block.vertical1) blockVertical1 = 0;

          // 장애물이 있을 때 크레인으로부터의 각도
          let blockAngle = 0;
          if (workValue.block.height1)
            blockAngle = Number((Math.atan((workValue.block.height1 - heightOfHookCrane.craneHeight) / (spec.distance[i] - B1WDistance)) * (180 / Math.PI)).toFixed(1));
          // spec.distance[i] 가 totalDistance로 이용을 하고 있기 때문에 i-1과 i의 거리가 필요 없다.
          // -------------------------------- 리깅 조건 계산
          // 1. 작업높이가 장애물높이보다 작을 때
          if (workValue.workBuilding.height < workValue.block.height1) {
            if (workValue.block.height1) B1WHeight = workValue.block.height1;
            else B1WHeight = workValue.workBuilding.height;
            // 1) 장애물거리 + 작업거리가 d2와 크레인 시작점 사이일 때 && mainAngle이 blockAngle보다 클 때
            if (params.d2 < B1WDistance && B1WDistance < spec.distance[i] - craneDistance && blockAngle < spec.mainAngle) {
              // 1] h1+크레인높이 > 장애물 높이
              if (params.h1 + heightOfHookCrane.craneHeight > workValue.block.height1) {
                const testCode = 1;
                const tmpBlockDistance = (B1WHeight - heightOfHookCrane.craneHeight) / Math.tan((spec.mainAngle * Math.PI) / 180);
                params.mainToBlockEdgeDistance = spec.distance[i] - (workValue.workBuilding.vertical + workValue.block.vertical1) - tmpBlockDistance;
                if(params.mainToBlockEdgeDistance >= 3)
                  return riggingData(spec, i, workValue, heightOfHookCrane, rearDistance, params, testCode);
              }
              // 2) 장애물 1 2 거리 + 작업거리가 d2보다 작을 때 && mainAngle이 blockAngle보다 클 때
            } else if (spec.distance[i] - craneDistance > params.d2 && params.d2 > B1B2WDistance && blockAngle < spec.mainAngle) {
              // 1] h1+크레인높이 > 장애물 높이
              if (params.h1 + heightOfHookCrane.craneHeight > workValue.block.height1) {
                const testCode = 2;
                const tmpBlockDistance = (B1WHeight - heightOfHookCrane.craneHeight) / Math.tan((spec.mainAngle * Math.PI) / 180);
                params.mainToBlockEdgeDistance = spec.distance[i] - (workValue.workBuilding.vertical + workValue.block.vertical1) - tmpBlockDistance;
                if( params.mainToBlockEdgeDistance >= 3)
                  return riggingData(spec, i, workValue, heightOfHookCrane, rearDistance, params, testCode);
              }
              // 2] h1+크레인높이 < 장애물 높이
              else if (params.h1 + heightOfHookCrane.craneHeight < workValue.block.height1) {
                // 픽스(러핑) 시작지점에서 건물까지의 대각선 각도
                const blockLuffingAngle = Number((Math.atan((workValue.block.height1 - params.h1 - heightOfHookCrane.craneHeight) / (params.d2 - B1WDistance)) * (180 / Math.PI)).toFixed(1));
                if (blockLuffingAngle < params.luffingAngle) {
                  const testCode = 3;
                  const tmpBlockDistance = (B1WHeight - params.h1 - heightOfHookCrane.craneHeight) / Math.tan((spec.luffingAngle * Math.PI) / 180);
                  params.flyFixLuffingToBlockEdgeDistance = params.d2 - (workValue.workBuilding.vertical + workValue.block.vertical1) - tmpBlockDistance;
                  if(params.flyFixLuffingToBlockEdgeDistance >= 3)
                    return riggingData(spec, i, workValue, heightOfHookCrane, rearDistance, params, testCode);
                }
              }
            }
            // 2. 작업높이가 장애물높이보다 클 때
          } else if (workValue.workBuilding.height > workValue.block.height1) {
            // 1) 장애물거리 + 작업거리가 d2와 크레인 시작점 사이일 때 && mainAngle이 blockAngle보다 클 때 && mainAngle이 건물까지의 각도인 minMainAngle보다 클 때
            const minMainAngle = Number((Math.atan((workValue.workBuilding.height - heightOfHookCrane.craneHeight) / (spec.distance[i] - workBuildingVertical)) * (180 / Math.PI)).toFixed(1));
            if (params.d2 < B1B2WDistance && B1B2WDistance < spec.distance[i] - craneDistance && blockAngle < spec.mainAngle && minMainAngle < spec.mainAngle ) {
              // 1] h1 + 크레인높이 > 작업높이
              if (params.h1 + heightOfHookCrane.craneHeight > workValue.workBuilding.height) {
                const testCode = 4;
                const tmpBlockDist = workValue.block.height1 ? (workValue.block.height1 - heightOfHookCrane.craneHeight) / Math.tan((spec.mainAngle * Math.PI) / 180) : undefined;
                const tmpBuildingDist = (workValue.workBuilding.height - heightOfHookCrane.craneHeight) / Math.tan((spec.mainAngle * Math.PI) / 180);
                params.mainToBlockEdgeDistance = spec.distance[i] - (workValue.workBuilding.vertical + workValue.block.vertical1) - tmpBlockDist;
                params.mainToBuildingEdgeDistance = spec.distance[i] - (workValue.workBuilding.vertical + workValue.block.vertical1) - tmpBuildingDist;
                // EdgeDistance길이 비교. 더 짧은 길이로 정리.
                if(params.mainToBlockEdgeDistance > params.mainToBuildingEdgeDistance){
                  if(params.mainToBuildingEdgeDistance >= 3)
                    return riggingData(spec, i, workValue, heightOfHookCrane, rearDistance, params, testCode);
                } else {
                  if(params.mainToBlockEdgeDistance >= 3)
                    return riggingData(spec, i, workValue, heightOfHookCrane, rearDistance, params, testCode);
                }
              }
              // 2] h1 + 크레인높이 < 작업높이
              else if (params.h1 + heightOfHookCrane.craneHeight < workValue.workBuilding.height) {
                const blockLuffingAngle = Number((Math.atan((workValue.workBuilding.height - params.h1 - heightOfHookCrane.craneHeight) / (params.d2 - workBuildingVertical)) * (180 / Math.PI)).toFixed(1)); // 픽스(러핑) 시작지점에서 건물까지의 대각선 각도
                if (blockLuffingAngle < params.luffingAngle) {
                  const testCode = 5;
                  const tmpBlockDist = workValue.block.height1 ? (workValue.block.height1 - heightOfHookCrane.craneHeight) / Math.tan((spec.mainAngle * Math.PI) / 180) : undefined;
                  const tmpBuildingDist = (workValue.workBuilding.height - heightOfHookCrane.craneHeight) / Math.tan((spec.luffingAngle * Math.PI) / 180);
                  params.mainToBlockEdgeDistance = spec.distance[i] - (workValue.workBuilding.vertical + workValue.block.vertical1) - tmpBlockDist;
                  params.flyFixLuffingToBuildingEdgeDistance = params.d2 - workValue.workBuilding.vertical - tmpBuildingDist;
                  if(params.mainToBlockEdgeDistance < params.flyFixLuffingToBuildingEdgeDistance){
                    if(params.mainToBlockEdgeDistance >= 3)
                      return riggingData(spec, i, workValue, heightOfHookCrane, rearDistance, params, testCode);
                  } else {
                    if(params.flyFixLuffingToBuildingEdgeDistance >= 3)
                      return riggingData(spec, i, workValue, heightOfHookCrane, rearDistance, params, testCode);
                  }
                }
              }
              // 2) 장애물거리 + 작업거리가 d2보다 작을 때 && mainAngle이 blockAngle보다 클 때
            } else if (B1B2WDistance < params.d2 && params.d2 < spec.distance[i] - craneDistance && blockAngle < spec.mainAngle && minMainAngle < spec.mainAngle) {
              // 1] h1 + 크레인높이 < 장애물 높이
              if (params.h1 + heightOfHookCrane.craneHeight < workValue.block.height1) {
                const blockLuffingAngle = Number((Math.atan((workValue.block.height1 - params.h1 - heightOfHookCrane.craneHeight) / (params.d2 - B1WDistance)) * (180 / Math.PI)).toFixed(1));
                if (blockLuffingAngle < params.luffingAngle) {
                  const testCode = 6;
                  const tmpBlockDist = workValue.block.height1 ? (workValue.block.height1 - params.h1 - heightOfHookCrane.craneHeight) / Math.tan((spec.luffingAngle * Math.PI) / 180) : undefined;
                  const tmpBuildingDist = (workValue.workBuilding.height - params.h1 - heightOfHookCrane.craneHeight) / Math.tan((spec.luffingAngle * Math.PI) / 180);
                  params.flyFixLuffingToBlockEdgeDistance = params.d2 - (workValue.workBuilding.vertical + workValue.block.vertical1) - tmpBlockDist;
                  params.flyFixLuffingToBuildingEdgeDistance = params.d2 - workValue.workBuilding.vertical - tmpBuildingDist;
                  if(params.flyFixLuffingToBlockEdgeDistance < params.flyFixLuffingToBuildingEdgeDistance){
                    if(params.flyFixLuffingToBlockEdgeDistance >= 3)
                      return riggingData(spec, i, workValue, heightOfHookCrane, rearDistance, params, testCode);
                  } else {
                    if(params.flyFixLuffingToBuildingEdgeDistance >= 3)
                      return riggingData(spec, i, workValue, heightOfHookCrane, rearDistance, params, testCode);
                  }
                }
              }
              // 2] 장애물높이 < h1 + 크레인높이 < 작업높이
              else if ( workValue.block.height1 < params.h1 + heightOfHookCrane.craneHeight && params.h1 + heightOfHookCrane.craneHeight < workValue.workBuilding.height) {
                const blockLuffingAngle = Number((Math.atan((workValue.workBuilding.height - params.h1 - heightOfHookCrane.craneHeight) /(params.d2 - workBuildingVertical)) * (180 / Math.PI)).toFixed(1)); // 픽스(러핑) 시작지점에서 건물까지의 대각선 각도
                if (blockLuffingAngle < params.luffingAngle) {
                  const testCode = 7;
                  const tmpBlockDist = workValue.block.height1 ? (workValue.block.height1 - heightOfHookCrane.craneHeight) / Math.tan((spec.mainAngle * Math.PI) / 180) : undefined;
                  const tmpBuildingDist = (workValue.workBuilding.height - params.h1 - heightOfHookCrane.craneHeight) / Math.tan((spec.luffingAngle * Math.PI) / 180);
                  params.mainToBlockEdgeDistance = spec.distance[i] - workValue.workBuilding.vertical - workValue.block.vertical1 - tmpBlockDist;
                  params.flyFixLuffingToBuildingEdgeDistance = params.d2 - workValue.workBuilding.vertical - tmpBuildingDist;
                  if(params.mainToBlockEdgeDistance < params.flyFixLuffingToBuildingEdgeDistance){
                    if(params.mainToBlockEdgeDistance >= 3)
                      return riggingData(spec, i, workValue, heightOfHookCrane, rearDistance, params, testCode);
                  } else {
                    if(params.flyFixLuffingToBuildingEdgeDistance >= 3)
                      return riggingData(spec, i, workValue, heightOfHookCrane, rearDistance, params, testCode);
                  }
                }
              }
              // 3] h1 + 크레인높이 > 작업높이
              else if (params.h1 + heightOfHookCrane.craneHeight > workValue.workBuilding.height) {
                const testCode = 8;
                const tmpBlockDist = workValue.block.height1 ? (workValue.block.height1 - heightOfHookCrane.craneHeight) / Math.tan((spec.mainAngle * Math.PI) / 180) : undefined;
                const tmpBuildingDist = (workValue.workBuilding.height - heightOfHookCrane.craneHeight) / Math.tan((spec.mainAngle * Math.PI) / 180);
                params.mainToBlockEdgeDistance = spec.distance[i] - workValue.workBuilding.vertical - workValue.block.vertical1 - tmpBlockDist;
                params.mainToBuildingEdgeDistance = spec.distance[i] - workValue.workBuilding.vertical + workValue.block.vertical1 - tmpBuildingDist;
                if(params.mainToBlockEdgeDistance < params.mainToBuildingEdgeDistance){
                  if(params.mainToBlockEdgeDistance >= 3)
                    return riggingData(spec, i, workValue, heightOfHookCrane, rearDistance, params, testCode);
                  } else {
                    if(params.mainToBuildingEdgeDistance >= 3)
                    return riggingData(spec, i, workValue, heightOfHookCrane, rearDistance, params, testCode);
                }
              }
            }
          }
        }
      }
    }
  }
};

/*
장애물이 없을 때의 알고리즘

if(workValue.workBuilding.vertical < params.d2){ // 작업거리가 d2보다 작을 때
  if(workValue.workBuilding.height > (params.h1 + heightOfHookCrane.craneHeight)){ // 작업높이가 h1보다 클 때
    const luffingAngle2 = Number((Math.atan( (workValue.workBuilding.height - heightOfHookCrane.craneHeight - params.h1) / (params.d2 - workValue.workBuilding.vertical) )*(180/Math.PI)).toFixed(1));  // d2 시작 지점에서 건물까지의 대각선 각도
    if(params.luffingAngle > luffingAngle2){
      return riggingData(spec, i, workValue, heightOfHookCrane, craneDistance, params);
    }
  } else if(workValue.workBuilding.height < (params.h1 + heightOfHookCrane.craneHeight)){ // 작업높이가 h1보다 작을 때
    return riggingData(spec, i, workValue, heightOfHookCrane, craneDistance, params);
  }
} else if(workValue.workBuilding.vertical > params.d2 && workValue.workBuilding.vertical < spec.distance[i] - craneDistance){  // 작업 시작위치가 d1-크레인거리 에서 d2사이일 때.
  const mainAngle2 = Number((Math.atan((workValue.workBuilding.height - heightOfHookCrane.craneHeight)/spec.distance[i] - workValue.workBuilding.vertical)*(180/Math.PI)).toFixed(1));  // 크레인센터에서부터 건물까지의 대각선 각도
  if(spec.mainAngle > mainAngle2){  // 크레인 메인붐이 건물에 닿지 않기위한 최소 조건
    return riggingData(spec, i, workValue, heightOfHookCrane, craneDistance, params);
  }
}
*/

export default findLuffingSpecTable;
