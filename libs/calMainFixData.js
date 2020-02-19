const heightOfHookCrane = { // Default Hook and Crain height. heightOfHookCrain
  craneHeight : 2,
  hookHeight : 6,
};

const findMainFixSpecTable = (spec, workValue) => {
  let finalSpec = [];
  // 삼각함수 : Math.cos(x*Math.PI/180) 각도는 라디안 표기
  const MBoom = spec.mainBoom + spec.totalExtLength;// mainBoom + totalExtLength
  for(let i = 0 ; i < spec.weight.length ; i++){
    //제원표에 무게 데이터가 존재 할 때 
    if(spec.weight[i]) {        
      // fix, main 모드에서 메인붐 각도는 60~85도
      for(let mainAng = 85 ; mainAng >= 60 ; mainAng--){
        const distance1 = Number((MBoom * Math.cos(mainAng * Math.PI/180)).toFixed(1));
        const distance2 = Number((spec.fixLuffing * Math.cos((mainAng - spec.fixAngle)*Math.PI/180)).toFixed(1));
        const height1 = Number((MBoom * Math.sin(mainAng * Math.PI/180)).toFixed(1));
        const height2 = Number((spec.fixLuffing * Math.sin((mainAng - spec.fixAngle) * Math.PI/180)).toFixed(1));
        const totDist = Math.ceil(distance1 + distance2);
        const marginH = Number((height1 + height2 - (workValue.workHeight + heightOfHookCrane.hookHeight + heightOfHookCrane.craneHeight)).toFixed(1));
        // totalDistance 가 10보다 큰 홀수일 경우 더 적은 무게를 들게끔 totalDistance를 1 더한다.(제원표에서 길이가 짝수).
        if( totDist % 2 !== 0 && totDist > 10 ) totDist += 1;
        // 여유 높이 > 0 이고 작업무게 이상을 들어야 한다.
        if(marginH > 0 && spec.weight[i] > workValue.workWeight) {
          // d1 + d2 가 작업거리보다 길어야 하고 이 거리가 제원표 거리랑 같을 때
          if( totDist > workValue.workDistance && totDist === spec.distance[i]) {
            const calValue = {  // 출력용 객체, 거리가 먼 것(가벼운 중량을 들 수 있는 것)을 기준으로 출력
              mainBoom : spec.mainBoom,
              mainAngle : mainAng,
              totalExtLength : spec.totalExtLength,
              adapter : spec.adapter,
              extBoom1 : spec.extBoom1,
              extBoom2 : spec.extBoom2,
              extBoom3 : spec.extBoom3,
              extMargin : Number(spec.extMargin.toFixed(1)),
              fixLuffing : spec.fixLuffing,
              fixLuffingAngle : spec.fixAngle,
              tableDistance : spec.distance[i],
              workDistance : workValue.workDistance,
              distance1 : distance1,
              distance2 : distance2,
              totalDistance : Number((distance1 + distance2).toFixed(1)),
              marginHeight : marginH,
              height1 : height1,
              height2 : height2,
              totalHeight: Number((height1 + height2).toFixed(1)),
              workHeight : workValue.workHeight,
              tableWeight : spec.weight[i],
            };
            finalSpec.push(calValue);
            break;  // 필요로 하는 최소 제원값을 충족할 시 cell에서 찾는 for문 탈출
          }
        }
      }
    }
    if(finalSpec.length)
      break;
  }
  return finalSpec;
};

export default findMainFixSpecTable;