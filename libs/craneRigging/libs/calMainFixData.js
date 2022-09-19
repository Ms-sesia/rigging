import { MFF_FFLBlockED, MFF_FFLBuildingED, MFF_mTBlockED, MFF_mTBuildingED } from "./mainFlyFixCalED";

const riggingData = (spec, index, workValue, heightOfHookCrane, craneDistance, params, checkCode) => {
  const marginHeight = Number(
    (
      params.h1 +
      params.h2 +
      heightOfHookCrane.craneHeight -
      (workValue.workBuilding.height + heightOfHookCrane.hookHeight)
    ).toFixed(1)
  );
  const B1B2WDistance = workValue.workBuilding.vertical + workValue.block.vertical1 + workValue.block.vertical2;

  if (!params.mTBlockED) params.mTBlockED = 0;
  if (!params.mTBuildingED) params.mTBuildingED = 0;
  if (!params.MFF_FFLBlockED) params.MFF_FFLBlockED = 0;
  if (!params.FFLBuildingED) params.FFLBuildingED = 0;

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
      flyFixLuffing: spec.flyFixLuffing,
      flyFixLuffingAngle: spec.flyFixAngle, // mainAngle에서 내려오는 fix각도.
      distance1: Number(params.d1.toFixed(1)),
      distance2: Number(params.d2.toFixed(1)),
      craneDistance: craneDistance,
      edgeDistance: {
        mainToBlock: Number(params.mTBlockED.toFixed(1)),
        mainToBuilding: Number(params.mTBuildingED.toFixed(1)),
        flyFixLuffingToBlock: Number(params.MFF_FFLBlockED.toFixed(1)),
        flyFixLuffingToBuilding: Number(params.FFLBuildingED.toFixed(1)),
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
      craneLocation: workValue.craneLocation.toString(),
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
    };
};

const findMainFixSpecTable = (
  spec,
  workValue,
  heightOfHookCrane,
  { rearDistance, frontDistance, trigger, centerToBoom }
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
  const B1B2WDistance = workValue.workBuilding.vertical + workValue.block.vertical1 + workValue.block.vertical2;
  const B1WDistance = workValue.workBuilding.vertical + workValue.block.vertical1;
  for (let i = 0; i < spec.weight.length; i++) {
    const safetyFactor = Number(((workValue.workWeight / spec.weight[i]) * 85).toFixed(1));
    if (safetyFactor < workValue.safetyFactor) {
      // 크레인 길이가 크레인 센터에서 장애물까지의 길이보다 길면 계산 x => b1b2wdist + cranedist < totaldist 조건으로 상쇄
      if (spec.weight[i] >= workValue.workWeight && B1B2WDistance + craneDistance < spec.distance[i]) {
        // weight data가 있어야하고 작업무게 이상이어야 한다.
        // fix, main 모드에서 메인붐 각도는 60~85도
        for (let mainAngle = 85; mainAngle >= 60; mainAngle -= 0.1) {
          // 삼각함수 : Math.cos(x*Math.PI/180) 각도는 라디안 표기
          const MBoom = spec.mainBoom + spec.totalExtLength; // mainBoom + totalExtLength
          const params = {
            mainAngle: Number(mainAngle.toFixed(1)),
            d2: spec.flyFixLuffing * Math.cos(((mainAngle - spec.flyFixAngle) * Math.PI) / 180),
            h1: MBoom * Math.sin((mainAngle * Math.PI) / 180),
            h2: spec.flyFixLuffing * Math.sin(((mainAngle - spec.flyFixAngle) * Math.PI) / 180),
            safetyFactor: safetyFactor,
          };
          params.d1 = spec.distance[i] - params.d2;
          params.totalDist = params.d1 + params.d2;
          // tableDistance-d2 길이(d1)로 계산한 mainAngle
          const calMainAngle = Number((Math.acos(params.d1 / MBoom) * (180 / Math.PI)).toFixed(1));
          // mainAngle과 tableDistance-d2 길이(d1)로 계산한 mainAngle비교
          if (calMainAngle === params.mainAngle) {
            // 장애물이 있을 때 크레인으로부터의 각도
            let blockAngle = 0;
            const { craneHeight } = heightOfHookCrane;
            if (workValue.block.height1)
              blockAngle = Number(
                (
                  Math.atan((workValue.block.height1 - craneHeight) / (spec.distance[i] - B1WDistance)) *
                  (180 / Math.PI)
                ).toFixed(1)
              );

            // totalDistance가 계산으로 생성되었기 때문에 i-1과 i사이의 값이 될 수 있으므로 찾아야한다.
            if (params.totalDist > spec.distance[i - 1] && params.totalDist <= spec.distance[i]) {
              // -------------------------------- 리깅 조건 계산
              // 1. 작업높이가 장애물높이보다 작을 때
              if (workValue.workBuilding.height < workValue.block.height1) {
                // 1) 장애물거리 + 작업거리가 d2와 크레인 시작점 사이일 때 && mainAngle이 blockAngle보다 클 때
                if (
                  params.d2 < B1WDistance &&
                  B1WDistance < spec.distance[i] - craneDistance &&
                  blockAngle < mainAngle
                ) {
                  // 1] h1+크레인높이 > 장애물 높이
                  if (params.h1 + craneHeight > workValue.block.height1) {
                    const checkCode = 1;
                    // console.log(checkCode);
                    params.mTBlockED = MFF_mTBlockED(workValue, craneHeight, mainAngle, spec, i);
                    // const tmpBlockDistance =
                    //   (B1WHeight - craneHeight) / Math.tan((mainAngle * Math.PI) / 180);
                    // params.mTBlockED =
                    //   spec.distance[i] -
                    //   (workValue.workBuilding.vertical + workValue.block.vertical1) -
                    //   tmpBlockDistance;
                    if (params.mTBlockED >= 3)
                      return riggingData(spec, i, workValue, heightOfHookCrane, rearDistance, params, checkCode);
                  }
                  // 2) 장애물거리 + 작업거리가 d2보다 작을 때 && mainAngle이 blockAngle보다 클 때
                } else if (
                  spec.distance[i] - craneDistance > params.d2 &&
                  params.d2 > B1B2WDistance &&
                  blockAngle < mainAngle
                ) {
                  // 1] h1+크레인높이 > 장애물 높이
                  if (params.h1 + craneHeight > workValue.block.height1) {
                    const checkCode = 2;
                    // console.log(checkCode);
                    params.mTBlockED = MFF_mTBlockED(workValue, craneHeight, mainAngle, spec, i);
                    // const tmpBlockDistance =
                    //   (B1WHeight - craneHeight) / Math.tan((mainAngle * Math.PI) / 180);
                    // params.mTBlockED =
                    //   spec.distance[i] -
                    //   (workValue.workBuilding.vertical + workValue.block.vertical1) -
                    //   tmpBlockDistance;
                    if (params.mTBlockED >= 3)
                      return riggingData(spec, i, workValue, heightOfHookCrane, rearDistance, params, checkCode);
                  }
                  // 2] h1+크레인높이 < 장애물 높이
                  else if (params.h1 + craneHeight < workValue.block.height1) {
                    const blockflyFixAngle = Number(
                      (
                        Math.atan((workValue.block.height1 - params.h1 - craneHeight) / (params.d2 - B1WDistance)) *
                        (180 / Math.PI)
                      ).toFixed(1)
                    ); // 픽스(러핑) 시작지점에서 건물까지의 대각선 각도
                    if (blockflyFixAngle < mainAngle - spec.flyFixAngle) {
                      const checkCode = 3;
                      // console.log(checkCode);
                      params.FFLBlockED = MFF_FFLBlockED(workValue, params, craneHeight, mainAngle, spec);
                      // const tmpBlockDistance =
                      //   (B1WHeight - params.h1 - craneHeight) /
                      //   Math.tan(((mainAngle - spec.flyFixAngle) * Math.PI) / 180);
                      //   params.d2 - (workValue.workBuilding.vertical + workValue.block.vertical1) - tmpBlockDistance;
                      if (params.FFLBlockED >= 3)
                        return riggingData(spec, i, workValue, heightOfHookCrane, rearDistance, params, checkCode);
                    }
                  }
                }
                // 2. 작업높이가 장애물높이보다 클 때
              } else if (workValue.workBuilding.height > workValue.block.height1) {
                // 1) 장애물거리 + 작업거리가 d2와 크레인 시작점 사이일 때 && mainAngle이 blockAngle보다 클 때 && mainAngle이 건물까지의 각도인 minMainAngle보다 클 때
                const minMainAngle = Number(
                  (
                    Math.atan(
                      (workValue.workBuilding.height - craneHeight) /
                        (spec.distance[i] - workValue.workBuilding.vertical)
                    ) *
                    (180 / Math.PI)
                  ).toFixed(1)
                );
                if (
                  params.d2 < B1B2WDistance &&
                  B1B2WDistance < spec.distance[i] - craneDistance &&
                  blockAngle < mainAngle &&
                  minMainAngle < mainAngle
                ) {
                  // 1] h1 + 크레인높이 > 작업높이
                  if (params.h1 + craneHeight > workValue.workBuilding.height) {
                    const checkCode = 4;
                    // console.log(checkCode);
                    params.mTBlockED = 0;
                    if (workValue.block.height1) {
                      // const tmpBlockDist =
                      //   (workValue.block.height1 - craneHeight) /
                      //   Math.tan((mainAngle * Math.PI) / 180);
                      // params.mTBlockED =
                      //   spec.distance[i] - (workValue.workBuilding.vertical + workValue.block.vertical1) - tmpBlockDist;
                      params.mTBlockED = MFF_mTBlockED(workValue, craneHeight, mainAngle, spec, i);
                    }

                    // const tmpBuildingDist =
                    //   (workValue.workBuilding.height - craneHeight) /
                    //   Math.tan((mainAngle * Math.PI) / 180);
                    // params.mTBuildingED = spec.distance[i] - workValue.workBuilding.vertical - tmpBuildingDist;

                    params.mTBuildingED = MFF_mTBuildingED(workValue, craneHeight, mainAngle, spec, i);
                    if (params.mTBlockED < params.mTBuildingED) {
                      if (params.mTBlockED >= 3 || (params.mTBlockED === 0 && params.mTBuildingED >= 3))
                        return riggingData(spec, i, workValue, heightOfHookCrane, rearDistance, params, checkCode);
                    } else {
                      if (params.mTBuildingED >= 3)
                        return riggingData(spec, i, workValue, heightOfHookCrane, rearDistance, params, checkCode);
                    }
                  }
                  // 2] h1 + 크레인높이 < 작업높이
                  else if (params.h1 + craneHeight < workValue.workBuilding.height) {
                    const blockflyFixAngle = Number(
                      (
                        Math.atan(
                          (workValue.workBuilding.height - params.h1 - craneHeight) /
                            (params.d2 - workValue.workBuilding.vertical)
                        ) *
                        (180 / Math.PI)
                      ).toFixed(1)
                    ); // 픽스(러핑) 시작지점에서 건물까지의 대각선 각도
                    if (blockflyFixAngle < mainAngle - spec.flyFixAngle) {
                      const checkCode = 5;
                      // console.log(checkCode);
                      params.mTBlockED = 0;
                      if (workValue.block.height1) {
                        // const tmpBlockDist =
                        //   (workValue.block.height1 - craneHeight) / Math.tan((mainAngle * Math.PI) / 180);
                        // params.mTBlockED =
                        //   spec.distance[i] -
                        //   (workValue.workBuilding.vertical + workValue.block.vertical1) -
                        //   tmpBlockDist;
                        params.mTBlockED = MFF_mTBlockED(workValue, craneHeight, mainAngle, spec, i);
                      }
                      // const tmpBuildingDist =
                      //   (workValue.workBuilding.height - params.h1 - craneHeight) /
                      //   Math.tan(((mainAngle - spec.flyFixAngle) * Math.PI) / 180);
                      // params.flyFixLuffingToBuildingEdgeDistance =
                      //   params.d2 - workValue.workBuilding.vertical - tmpBuildingDist;
                      params.FFLBuildingED = MFF_FFLBuildingED(workValue, params, craneHeight, mainAngle, spec);
                      if (params.mTBlockED < params.FFLBuildingED) {
                        if (params.mTBlockED >= 3 || (params.mTBlockED === 0 && params.FFLBuildingED >= 3))
                          return riggingData(spec, i, workValue, heightOfHookCrane, rearDistance, params, checkCode);
                      } else {
                        if (params.FFLBuildingED >= 3)
                          return riggingData(spec, i, workValue, heightOfHookCrane, rearDistance, params, checkCode);
                      }
                    }
                  }
                  // 2) 장애물거리 + 작업거리가 d2보다 작을 때 && mainAngle이 blockAngle보다 클 때
                } else if (
                  B1B2WDistance < params.d2 &&
                  params.d2 < spec.distance[i] - craneDistance &&
                  blockAngle < mainAngle &&
                  minMainAngle < mainAngle
                ) {
                  // 1] h1 + 크레인높이 < 장애물 높이
                  if (params.h1 + craneHeight < workValue.block.height1) {
                    const blockflyFixAngle = Number(
                      (
                        Math.atan((workValue.block.height1 - params.h1 - craneHeight) / (params.d2 - B1WDistance)) *
                        (180 / Math.PI)
                      ).toFixed(1)
                    );
                    if (blockflyFixAngle < mainAngle - spec.flyFixAngle) {
                      const checkCode = 6;
                      // console.log(checkCode);
                      params.FFLBlockED = 0;
                      if (workValue.block.height1) {
                        // const tmpBlockDist =
                        //   (workValue.block.height1 - params.h1 - craneHeight) /
                        //   Math.tan(((mainAngle - spec.flyFixAngle) * Math.PI) / 180);
                        // params.FFLBlockED =
                        //   params.d2 - (workValue.workBuilding.vertical + workValue.block.vertical1) - tmpBlockDist;
                        params.FFLBlockED = MFF_FFLBlockED(workValue, params, craneHeight, mainAngle, spec);
                      }
                      // const tmpBuildingDist =
                      //   (workValue.workBuilding.height - params.h1 - craneHeight) /
                      //   Math.tan(((mainAngle - spec.flyFixAngle) * Math.PI) / 180);
                      // params.FFLBuildingED = params.d2 - workValue.workBuilding.vertical - tmpBuildingDist;
                      params.FFLBuildingED = MFF_FFLBuildingED(workValue, params, craneHeight, mainAngle, spec);
                      if (params.FFLBlockED < params.FFLBuildingED) {
                        if (params.FFLBlockED >= 3 || (params.FFLBlockED === 0 && params.FFLBuildingED >= 3))
                          return riggingData(spec, i, workValue, heightOfHookCrane, rearDistance, params, checkCode);
                      } else {
                        if (params.FFLBuildingED >= 3)
                          return riggingData(spec, i, workValue, heightOfHookCrane, rearDistance, params, checkCode);
                      }
                    }
                  }
                  // 2] 장애물높이 < h1 + 크레인높이 < 작업높이
                  else if (
                    workValue.block.height1 < params.h1 + craneHeight &&
                    params.h1 + craneHeight < workValue.workBuilding.height
                  ) {
                    const blockflyFixAngle = Number(
                      (
                        Math.atan(
                          (workValue.workBuilding.height - params.h1 - craneHeight) /
                            (params.d2 - workValue.workBuilding.vertical)
                        ) *
                        (180 / Math.PI)
                      ).toFixed(1)
                    ); // 픽스(러핑) 시작지점에서 건물까지의 대각선 각도
                    if (blockflyFixAngle < mainAngle - spec.flyFixAngle) {
                      const checkCode = 7;
                      // console.log(checkCode);
                      params.mTBlockED = 0;
                      if (workValue.block.height1) {
                        // const tmpBlockDist =
                        //   (workValue.block.height1 - craneHeight) / Math.tan((mainAngle * Math.PI) / 180);
                        // params.mTBlockED =
                        //   spec.distance[i] - workValue.workBuilding.vertical - workValue.block.vertical1 - tmpBlockDist;
                        params.mTBlockED = MFF_mTBlockED(workValue, craneHeight, mainAngle, spec, i);
                      }
                      // const tmpBuildingDist =
                      //   (workValue.workBuilding.height - params.h1 - craneHeight) /
                      //   Math.tan(((mainAngle - spec.flyFixAngle) * Math.PI) / 180);
                      // params.FFLBuildingED = params.d2 - workValue.workBuilding.vertical - tmpBuildingDist;
                      params.FFLBuildingED = MFF_FFLBuildingED(workValue, params, craneHeight, mainAngle, spec);
                      if (params.mTBlockED < params.FFLBuildingED) {
                        if (params.mTBlockED >= 3 || (params.mTBlockED === 0 && params.FFLBuildingED >= 3))
                          return riggingData(spec, i, workValue, heightOfHookCrane, rearDistance, params, checkCode);
                      } else {
                        if (params.FFLBuildingED >= 3)
                          return riggingData(spec, i, workValue, heightOfHookCrane, rearDistance, params, checkCode);
                      }
                    }
                  }
                  // 3] h1 + 크레인높이 > 작업높이
                  if (params.h1 + craneHeight > workValue.workBuilding.height) {
                    const checkCode = 8;
                    // console.log(checkCode);
                    params.mTBlockED = 0;
                    if (workValue.block.height1) {
                      // const tmpBlockDist =
                      //   (workValue.block.height1 - craneHeight) / Math.tan((mainAngle * Math.PI) / 180);
                      // params.mTBlockED =
                      // spec.distance[i] - workValue.workBuilding.vertical - workValue.block.vertical1 - tmpBlockDist;
                      params.mTBlockED = MFF_mTBlockED(workValue, craneHeight, mainAngle, spec, i);
                    }
                    // const tmpBuildingDist =
                    //   (workValue.workBuilding.height - craneHeight) / Math.tan((mainAngle * Math.PI) / 180);
                    // params.mTBuildingED = spec.distance[i] - workValue.workBuilding.vertical - tmpBuildingDist;
                    params.mTBuildingED = MFF_mTBuildingED(workValue, craneHeight, mainAngle, spec, i);
                    if (params.mTBlockED < params.mTBuildingED) {
                      if (params.mTBlockED >= 3 || (params.mTBlockED === 0 && params.mTBuildingED >= 3))
                        return riggingData(spec, i, workValue, heightOfHookCrane, rearDistance, params, checkCode);
                    } else {
                      if (params.mTBuildingED >= 3)
                        return riggingData(spec, i, workValue, heightOfHookCrane, rearDistance, params, checkCode);
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
};

export default findMainFixSpecTable;
