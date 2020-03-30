const findLuffingSpecTable = (spec, workValue, heightOfHookCrane, craneDistance) => {
  // 삼각함수 : Math.cos(x*Math.PI/180) 각도는 라디안 표기
  const MBoom = spec.mainBoom + spec.totalExtLength;// mainBoom + totalExtLength
  const d1 = MBoom * Math.cos(spec.mainAngle * Math.PI/180);  // luffing에서 d1은 메인붐과 메인붐각도가 정해져있기 때문에 고정
  const minAngle = Number((Math.atan((workValue.workHeight - heightOfHookCrane.craneHeight)/craneDistance)*(180/Math.PI)).toFixed(1));  // 크레인이 건물과 맞닿아있을 때의 각도(메인붐이 건물과 닿지 않을 최소각도)
  // 메인각도가 크레인이 건물과 맞닿아 있을 때의 각도보다 커야한다.
  if(spec.mainAngle > minAngle){
    for(let i = 0 ; i < spec.weight.length ; i++){
      if(spec.weight[i] >= workValue.workWeight) {  // weight가 있어야하고 작업무게 이상이어야 한다.
        const d2 = spec.distance[i] - d1; // 작업거리 - d1
        const luffingAngle = Number((Math.acos(d2/spec.fixLuffing)*(180/Math.PI)).toFixed(1));  // 지면과 수평으로부터 올라오는 러핑 각도
        const h1 = MBoom * Math.sin(spec.mainAngle * Math.PI/180);
        const h2 = spec.fixLuffing * Math.sin(luffingAngle*Math.PI/180);
        const marginHeight = h1 + h2 + heightOfHookCrane.craneHeight - (workValue.workHeight + heightOfHookCrane.hookHeight);
        if(heightOfHookCrane.craneHeight + h1 < workValue.workHeight){  // 크레인높이 + h1이 작업높이보다 낮을 때 fix나 luffing이 건물과 닿지 않게 하기 위한 조건
          const luffingAngle2 = Number((Math.atan(workValue.workHeight/(craneDistance - d1))*(180/Math.PI)).toFixed(1));  // d1지점에서 건물까지의 대각선 각도
          if(luffingAngle > luffingAngle2) {
            if((d1 + d2) >= (craneDistance + workValue.workDistance) && marginHeight > 0) {
              const calValue = {  // 출력용 객체
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
                fixLuffingAngle : Number(luffingAngle.toFixed(1)),
                craneRearDistance : craneDistance,
                distance1 : Number(d1.toFixed(1)),
                distance2 : Number(d2.toFixed(1)),
                centerToBuldingDistance : Number((spec.distance[i] - workValue.workDistance).toFixed(1)),
                rearToBuildingDistance : Number((spec.distance[i] - craneDistance - workValue.workDistance).toFixed(1)),
                totalDistance : Number((d1 + d2).toFixed(1)),
                tableDistance : spec.distance[i],
                workDistance : workValue.workDistance,
                height1 : Number(h1.toFixed(1)),
                height2 : Number(h2.toFixed(1)),
                totalHeight : Number((h1 + h2 + heightOfHookCrane.craneHeight).toFixed(1)),
                marginHeight : Number(marginHeight.toFixed(1)),
                workHeight : workValue.workHeight,
                tableWeight : spec.weight[i],
                addWeight : spec.addWeight,
                overRear : spec.overRear,
                optional : spec.optional,
                workWeight : workValue.workWeight,
                // test : 'test1',
              };
              return calValue;
            }
          }
        } else {
          // 총 작업거리 > (크레인리어길이 + 작업거리) && (높이 마진(총 높이 - 주어진 높이))> 0
          if((d1 + d2) >= (craneDistance + workValue.workDistance) && marginHeight > 0) {  
            const calValue = {  // 출력용 객체
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
              fixLuffingAngle : Number(luffingAngle.toFixed(1)),
              craneRearDistance : craneDistance,
              distance1 : Number(d1.toFixed(1)),
              distance2 : Number(d2.toFixed(1)),
              centerToBuldingDistance : Number((spec.distance[i] - workValue.workDistance).toFixed(1)),
              rearToBuildingDistance : Number((spec.distance[i] - craneDistance - workValue.workDistance).toFixed(1)),
              totalDistance : Number((d1 + d2).toFixed(1)),
              tableDistance : spec.distance[i],
              workDistance : workValue.workDistance,
              height1 : Number(h1.toFixed(1)),
              height2 : Number(h2.toFixed(1)),
              totalHeight : Number((h1 + h2 + heightOfHookCrane.craneHeight).toFixed(1)),
              marginHeight : Number(marginHeight.toFixed(1)),
              workHeight : workValue.workHeight,
              tableWeight : spec.weight[i],
              addWeight : spec.addWeight,
              overRear : spec.overRear,
              optional : spec.optional,
              workWeight : workValue.workWeight,
              // test : 'test2',
            };
            return calValue;
          }
        }
        
      }
    }
  }
};

export default findLuffingSpecTable;