import { workValue, heightOfHookCrain } from "./defaultCondition";

const findLuffingSpecTable = (spec) => {
  let finalSpec = [];
  // 삼각함수 : Math.cos(x*Math.PI/180) 각도는 라디안 표기
  const MBoom = spec.mainBoom + spec.totalExtLength;// mainBoom + totalExtLength
  const d1 = MBoom * Math.cos(spec.mainAngle * Math.PI/180);  // luffing에서 d1은 메인붐과 메인붐각도가 정해져있기 때문에 고정
  for(let i = 0 ; i < spec.weight.length ; i++){
    if(spec.weight[i]) {  // 제원표에 무게 데이터가 존재할 때
      const d2 = spec.distance[i] - d1; // 작업거리 - d1
      const luffingAngle = Number((Math.acos(d2/spec.luffing)*(180/Math.PI)).toFixed(1));
      const h1 = MBoom * Math.sin(spec.mainAngle * Math.PI/180);
      const h2 = spec.luffing * Math.sin(luffingAngle*Math.PI/180);
      const marginHeight = h1 + h2 - (workValue.workHeight + heightOfHookCrain.crainHeight + heightOfHookCrain.hookHeight);
      // 총 작업거리 > 주어진 작업거리 && (높이 마진(총 높이 - 주어진 높이))> 0
      if((d1 + d2) > workValue.workDistance && marginHeight > 0) {  
        if(spec.weight[i] > workValue.workWeight){ 
          const calValue = {  // 출력용 객체
            mainBoom : spec.mainBoom,
            mainAngle : spec.mainAngle,
            totalExtLength : spec.totalExtLength,
            adapter : spec.adapter,
            extBoom1 : spec.extBoom1,
            extBoom2 : spec.extBoom2,
            extBoom3 : spec.extBoom3,
            extMargin : spec.extMargin,
            luffing : spec.luffing,
            luffingAngle : Number(luffingAngle.toFixed(1)),
            tableDistance : spec.distance[i],
            workDistance : workValue.workDistance,
            distance1 : Number(d1.toFixed(1)),
            distance2 : Number(d2.toFixed(1)),
            totalDistance : Number((d1 + d2).toFixed(1)),
            height1 : Number(h1.toFixed(1)),
            height2 : Number(h2.toFixed(1)),
            totalHeight : Number((h1 + h2).toFixed(1)),
            marginHeight : Number(marginHeight.toFixed(1)),
            workHeight : workValue.workHeight,
            tableWeight : spec.weight[i],
          };
          finalSpec.push(calValue);
        }
      }
    }
  }
  return finalSpec;
};

export default findLuffingSpecTable;