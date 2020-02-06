import { workValue, heightOfHookCrain } from "./defaultCondition";

export let finalSpecData = [];
export const findFixSpecTable = (spec) => {
  // 삼각함수 : Math.cos(x*Math.PI/180) 각도는 라디안 표기
  const MBoom = spec.mainBoom + spec.totalExt;// mainBoom + extBoom + adapter
  for(let i = 60 ; i < 86 ; i++){ // fix 모드에서 메인붐 각도는 60~85도
    let calValue = {  // 출력용 객체
      mainBoom : spec.mainBoom,
      mainAngle : i,
      totalExtLength : spec.totalExtLength,
      adapter : spec.adapter,
      extBoom1 : spec.extBoom1,
      extBoom2 : spec.extBoom2,
      extBoom3 : spec.extBoom3,
      extMargin : spec.Margin,
      fix : spec.fix,
      fixAngle : spec.fixAngle,
      tableDistance : [],
      workDistance : workValue.distance,
      distance1 : 0,
      distance2 : 0,
      totalDistance : 0,
      marginHeight : 0,
      workHeight : workValue.height,
      tableWeight : [],
    };

    calValue.distance1 = MBoom * Math.cos(i * Math.PI/180);
    calValue.distance2 = spec.fix * Math.cos((i - spec.fixAngle)*Math.PI/180);

    let totalDistance = Math.round(calValue.distance1 + calValue.distance2);  // 소숫점 반올림. 원하는 제원값보다 낮춰서 해당 거리 제외.
    // totalDistance 가 10보다 큰 홀수일 경우 더 적은 무게를 들게끔 totalDistance를 1 더한다.(제원표에서 길이가 짝수).
    if(totalDistance % 2 !== 0 && totalDistance % 2 < 10 ) totalDistance += 1;
    calValue.totalDistance = totalDistance;

    const h1 = MBoom * Math.sin(i * Math.PI/180);  // mainBoom height
    const h2 = spec.fix * Math.sin((i - spec.fixAngle) * Math.PI/180);  // fix height
    const totalHeight = Math.ceil(h1 + h2);  //작업높이는 올림이 더 좋아보임. 그래야 거리가 좁아짐. totalDistance와 비교 할 때 최소 거리보다 넓으면 제외.
    calValue.marginHeight = totalHeight - (workValue.height + heightOfHookCrain.crainHeight + heightOfHookCrain.hookHeight);  // 여유 높이 = 계산한 높이 - (작업높이 + 크레인높에 + hook길이)

    if( totalDistance > workValue.distance && calValue.marginHeight > 0) {  // specdistance가 totaldistance보다 큰 것, 마진이 0보다 큰 것. => distance관련 좀 더 합리적인 조건이 필요함.
      spec.distance.forEach( (data, j) => {
        if( data > totalDistance && spec.weight[j] > workValue.workWeight) {  //60도의 최소 작업거리 이상, 주어진 무게 이상
          calValue.tableDistance[j] = data;
          calValue.tableWeight[j] = spec.weight[j];
        }
      });
      finalSpecData.push(calValue);
    }
  }
};