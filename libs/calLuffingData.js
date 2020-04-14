const riggingData = (spec, index, workValue, heightOfHookCrane, craneDistance, params) => {
  return {  // 출력용 객체, 거리가 먼 것(가벼운 중량을 들 수 있는 것)을 기준으로 출력
    mainBoom : spec.mainBoom,
    mainAngle : spec.mainAngle,
    totalExtLength : spec.totalExtLength,
    adapter1 : spec.adapter1,
    extBoom1 : spec.extBoom1,
    extBoom2 : spec.extBoom2,
    extBoom3 : spec.extBoom3,
    extBoom4 : spec.extBoom4,
    adapter2 : Number(spec.adapter2.toFixed(1)),
    fixLuffing : spec.fixLuffing,
    fixLuffingAngle : Number(spec.mainAngle - params.luffingAngle.toFixed(1)),
    craneRearDistance : craneDistance,
    distance1 : Number(params.d1.toFixed(1)),
    distance2 : Number(params.d2.toFixed(1)),
    centerToBuldingDistance : Number((spec.distance[index] - workValue.workDistance).toFixed(1)),
    rearToBuildingDistance : Number((spec.distance[index] - craneDistance - workValue.workDistance).toFixed(1)),
    totalDistance : Number((params.d1 + params.d2).toFixed(1)),
    tableDistance : spec.distance[index],
    workDistance : workValue.workDistance,
    height1 : Number(params.h1.toFixed(1)),
    height2 : Number(params.h2.toFixed(1)),
    totalHeight : Number((params.h1 + params.h2 + heightOfHookCrane.craneHeight).toFixed(1)),
    marginHeight : Number((params.h1 + params.h2 + heightOfHookCrane.craneHeight - (workValue.workHeight + heightOfHookCrane.hookHeight)).toFixed(1)),
    workHeight : workValue.workHeight,
    tableWeight : spec.weight[index],
    addWeight : spec.addWeight,
    overRear : spec.overRear,
    optional : spec.optional,
    workWeight : workValue.workWeight,
  };
}

const findLuffingSpecTable = (spec, workValue, heightOfHookCrane, craneDistance) => {
  // 삼각함수 : Math.cos(x*Math.PI/180) 각도는 라디안 표기
  for(let i = 0 ; i < spec.weight.length ; i++){
    if(spec.weight[i] >= workValue.workWeight) {  // weight가 있어야하고 작업무게 이상이어야 한다.
      let params = {};
      const MBoom = spec.mainBoom + spec.totalExtLength;// mainBoom + totalExtLength
      params.d1 = MBoom * Math.cos(spec.mainAngle * Math.PI/180);  // luffing에서 d1은 메인붐과 메인붐각도가 정해져있기 때문에 고정
      params.d2 = spec.distance[i] - params.d1;
      params.luffingAngle = Number((Math.acos(params.d2/spec.fixLuffing)*(180/Math.PI)).toFixed(1));  // 지면과 수평으로부터 올라오는 러핑 각도
      params.h1 = MBoom * Math.sin(spec.mainAngle * Math.PI/180);
      params.h2 = spec.fixLuffing * Math.sin(params.luffingAngle * Math.PI/180);
      
      if(workValue.workDistance < params.d2){ // 작업거리가 d2보다 작을 때
        if((params.h1 + params.h2 + heightOfHookCrane.craneHeight - workValue.workHeight) < params.h2){ // 전체높이에서 작업높이를 뺀 높이가 h2보다 낮을 때
          const luffingAngle2 = Number((Math.atan( (workValue.workHeight - heightOfHookCrane.craneHeight - params.h1) / (params.d2 - workValue.workDistance) )*(180/Math.PI)).toFixed(1));  // d2 시작 지점에서 건물까지의 대각선 각도
          if(params.luffingAngle > luffingAngle2){
            console.log(1);
            return riggingData(spec, i, workValue, heightOfHookCrane, craneDistance, params);
          }
        } else if((params.h1 + params.h2 + heightOfHookCrane.craneHeight - workValue.workHeight) > params.h2){
          console.log(2);
          return riggingData(spec, i, workValue, heightOfHookCrane, craneDistance, params);
        }
      } else if(workValue.workDistance > params.d2 && workValue.workDistance < spec.distance[i] - craneDistance){  // 작업 시작위치가 (d1-크레인거리)에서 d2사이일 때.
        const mainAngle2 = Number((Math.atan((workValue.workHeight - heightOfHookCrane.craneHeight)/spec.distance[i] - workValue.workDistance)*(180/Math.PI)).toFixed(1));  // 크레인센터에서부터 건물까지의 대각선 각도
        if(spec.mainAngle > mainAngle2){  // 크레인 메인붐이 건물에 닿지 않기위한 최소 조건
          console.log(3);
          return riggingData(spec, i, workValue, heightOfHookCrane, craneDistance, params);
        }
      }
    }
  }
};

export default findLuffingSpecTable;