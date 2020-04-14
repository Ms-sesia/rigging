const riggingData = (spec, index, workValue, heightOfHookCrane, craneDistance, params) => {
  return {  // 출력용 객체, 거리가 먼 것(가벼운 중량을 들 수 있는 것)을 기준으로 출력
    mainBoom : spec.mainBoom,
    mainAngle : params.mainAng,
    totalExtLength : spec.totalExtLength,
    adapter1 : spec.adapter1,
    extBoom1 : spec.extBoom1,
    extBoom2 : spec.extBoom2,
    extBoom3 : spec.extBoom3,
    extBoom4 : spec.extBoom4,
    adapter2 : Number(spec.adapter2.toFixed(1)),
    fixLuffing : spec.fixLuffing,
    fixLuffingAngle : spec.fixAngle,
    craneRearDistance : craneDistance,
    distance1 : params.d1,
    distance2 : params.d2,
    centerToBuldingDistance : Number((spec.distance[index] - workValue.workDistance).toFixed(1)),
    rearToBuildingDistance : Number((spec.distance[index] - craneDistance - workValue.workDistance).toFixed(1)),
    totalDistance : Number((params.d1 + params.d2).toFixed(1)),
    tableDistance : spec.distance[index],
    workDistance : workValue.workDistance,
    height1 : params.h1,
    height2 : params.h2,
    totalHeight: Number((params.h1 + params.h2 + heightOfHookCrane.craneHeight).toFixed(1)),
    marginHeight : params.marginHeight,
    workHeight : workValue.workHeight,
    tableWeight : spec.weight[index],
    addWeight : spec.addWeight,
    overRear : spec.overRear,
    optional : spec.optional,
    workWeight : workValue.workWeight,
  };
}

const findMainFixSpecTable = (spec, workValue, heightOfHookCrane, craneDistance) => {
  // 삼각함수 : Math.cos(x*Math.PI/180) 각도는 라디안 표기
  for(let i = 0 ; i < spec.weight.length ; i++){
    //제원표에 무게 데이터가 존재 할 때 
    if(spec.weight[i] >= workValue.workWeight) {  // weight가 작업무게 이상이어야 한다.
      // fix, main 모드에서 메인붐 각도는 60~85도
      for(let mainAng = 85 ; mainAng >= 60 ; mainAng--){
        const minAngle = Number((Math.atan((workValue.workHeight - heightOfHookCrane.craneHeight)/craneDistance)*(180/Math.PI)).toFixed(1));  // 크레인이 건물과 맞닿아있을 때의 각도(메인붐이 건물과 닿지 않을 최소각도)
        // 메인각도가 크레인이 건물과 맞닿아 있을 때의 각도보다 커야한다.
        if(mainAng > minAngle){
          const MBoom = spec.mainBoom + spec.totalExtLength;// mainBoom + totalExtLength
          const params = {
            mainAng : mainAng,
            d1 : Number((MBoom * Math.cos(mainAng * Math.PI/180)).toFixed(1)),
            d2 : Number((spec.fixLuffing * Math.cos((mainAng - spec.fixAngle) * Math.PI/180)).toFixed(1)),
            h1 : Number((MBoom * Math.sin(mainAng * Math.PI/180)).toFixed(1)),
            h2 : Number((spec.fixLuffing * Math.sin((mainAng - spec.fixAngle) * Math.PI/180)).toFixed(1)),
          }
          params.totDist = Math.ceil(params.d1 + params.d2);
          params.marginHeight = Number((params.h1 + params.h2 + heightOfHookCrane.craneHeight - (workValue.workHeight + heightOfHookCrane.hookHeight)).toFixed(1));
          if(heightOfHookCrane.craneHeight + params.h1 < workValue.workHeight){  // 크레인높이 + h1이 작업높이보다 낮을 때 fix나 luffing이 건물과 닿지 않게 하기 위한 조건
            const fixAngle2 = Number((Math.atan(workValue.workHeight/(craneDistance - params.d1))*(180/Math.PI)).toFixed(1));  // d1지점에서 건물까지의 대각선 각도
            if((mainAng - spec.fixAngle)> fixAngle2) {
              if(params.totDist >= (craneDistance + workValue.workDistance) && params.marginHeight > 0) // 여유 높이 > 0 이고 총거리가 (크레인리어길이 + 작업거리)보다 길어야한다.
                if(params.totDist > spec.distance[i-1] && params.totDist <= spec.distance[i]) // totalDistance가 현재 제원표 거리보다 작거나 같고 이전 제원표 거리보다 클 경우
                  return riggingData(spec, i, workValue, heightOfHookCrane, craneDistance, params);
            }
          } else {
            if(params.totDist >= (craneDistance + workValue.workDistance) && params.marginHeight > 0) 
              if(params.totDist > spec.distance[i-1] && params.totDist <= spec.distance[i]) 
                return riggingData(spec, i, workValue, heightOfHookCrane, craneDistance, params);
          }
        }
      }
    }
  }
};

export default findMainFixSpecTable;