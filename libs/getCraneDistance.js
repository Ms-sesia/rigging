/* 
** 각 위치별로 craneCenter To Boom의 realDistance를 더한 값으로 계산한다.
** 현재는 이미지가 rear만 가능하기에 rear에만 realDistance를 더하였다.
** 추후 이미지들이 추가 되면 지금의 frontDistance와 trigger에 realDistance를 구하여 더해주면 된다.
*/ 
const getCraneDistance = (craneName) => {
  let crane = {};
  switch (craneName) {
    case "L_1030_2.1":
      // crane.centerToBoom = 1.95; crane.rearDistance = 3.15;
      crane.rearDistance = 5.1;
      crane.frontDistance = 5.535;
      crane.trigger = 6.5;
      return crane;
    case "L_1040_2.1":
      // crane.centerToBoom = 2.84; crane.rearDistance = 3.33;
      crane.rearDistance = 6.17;
      crane.frontDistance = 5.535;
      crane.trigger = 6.5;
      return crane;
    case "L_1050_3.1":
      // crane.centerToBoom = 2.87; crane.rearDistance = 3.53;
      crane.rearDistance = 6.4;
      crane.frontDistance = 5.963;
      crane.trigger = 6.9;
      return crane;
    case "L_1055_3.2":
      // crane.centerToBoom = 2.1; crane.rearDistance = 4.005;
      crane.rearDistance = 6.105;
      crane.frontDistance = 6.263;
      crane.trigger = 6.8;
      return crane;
    case "L_1060_3.1":
      // crane.centerToBoom = 2; crane.rearDistance = 3.986;
      crane.rearDistance = 5.986;
      crane.frontDistance = 6.262;
      crane.trigger = 6.8;
      return crane;
    case "L_1070_4.1":
      // crane.centerToBoom = 2.4; crane.rearDistance = 3.98;
      crane.rearDistance = 6.38;
      crane.frontDistance = 5.963;
      crane.trigger = 6.8;
      return crane;
    case "L_1070_4.2":
      // crane.centerToBoom = 1.91; crane.rearDistance = 3.98;
      crane.rearDistance = 5.89;
      crane.frontDistance = 5.963;
      crane.trigger = 6.8;
      return crane;
    case "L_1090_4.1":
      // crane.centerToBoom = 1.73; crane.rearDistance = 4.08;
      crane.rearDistance = 5.81;
      crane.frontDistance = 7.084;
      crane.trigger = 7.5;
      return crane;
    case "L_1095_5.1":
      // crane.centerToBoom = 2.26; crane.rearDistance = 4.38;
      crane.rearDistance = 6.64;
      crane.frontDistance = 7.855;
      crane.trigger = 7.55;
      return crane;
    case "L_1100_4.2":
      // crane.centerToBoom = 1.93; crane.rearDistance = 4.527;
      crane.rearDistance = 6.457;
      crane.frontDistance = 7.179;
      crane.trigger = 7.275;
      return crane;
    case "L_1100_5.2":
      // crane.centerToBoom = 1.38; crane.rearDistance = 3.972;
      crane.rearDistance = 5.352;
      crane.frontDistance = 8.02;
      crane.trigger = 7.275;
      return crane;
    case "L_1130_5.1":
      // crane.centerToBoom = 1.55; crane.rearDistance = 4.88;
      crane.rearDistance = 6.43;
      crane.frontDistance = 8.45;
      crane.trigger = 8.05;
      return crane;
    case "L_1150_6.1":
      // crane.centerToBoom = 1.7; crane.rearDistance = 4.9;
      crane.rearDistance = 6.6;
      crane.frontDistance = 9.02;
      crane.trigger = 8.914;
      return crane;
    case "L_1200_5.1":
      // crane.centerToBoom = 1.12; crane.rearDistance = 4.85;
      crane.rearDistance = 5.97;
      crane.frontDistance = 9.061;
      crane.trigger = 8.9;
      return crane;
    case "L_1250_6.1":
      // crane.centerToBoom = 1.59; crane.rearDistance = 5.6;
      crane.rearDistance = 7.19;
      crane.frontDistance = 10.99;
      crane.trigger = 9.1;
      return crane;
    case "L_1300_6.1":
      // crane.centerToBoom = 0.9; crane.rearDistance = 5.53;
      crane.rearDistance = 6.43;
      crane.frontDistance = 10.990;
      crane.trigger = 9.1;
      return crane;
    case "L_1300_6.2":
      // crane.centerToBoom = 1.22; crane.rearDistance = 4.53;
      crane.rearDistance = 5.75;
      crane.frontDistance = 11.060;
      crane.trigger = 9.132;
      return crane;
    case "L_1350_6.1":
      // crane.centerToBoom = 1.05; crane.rearDistance = 5.7;
      crane.rearDistance = 6.75;
      crane.frontDistance = 11.060;
      crane.trigger = 9.13;
      return crane;
    case "L_1400_7.1":
      // crane.centerToBoom = 1; crane.rearDistance = 6.6;
      crane.rearDistance = 7.6;
      crane.frontDistance = 11.959;
      crane.trigger = 10.21;
      return crane;
    case "L_1450_8.1":
      // crane.centerToBoom = 0.17; crane.rearDistance = 7;
      crane.rearDistance = 7.17;
      crane.frontDistance = 13.585;
      crane.trigger = 10.3;
      return crane;
    case "L_1500_50m_8.1":
      // crane.centerToBoom = 0; crane.rearDistance = 6.025;
      crane.rearDistance = 6.025;
      crane.frontDistance = 13.030;
      crane.trigger = 10.3;
      return crane;
    case "L_1500_84m_8.1":
      // crane.centerToBoom = 0; crane.rearDistance = 6.025;
      crane.rearDistance = 6.025;
      crane.frontDistance = 13.030;
      crane.trigger = 10.3;
      return crane;
    case "L_1750_9.1":
      // crane.centerToBoom = 0; crane.rearDistance = 8.33;
      crane.rearDistance = 8.33;
      crane.frontDistance = 14.615;
      crane.trigger = 12.619;
      return crane;
    case "L_11200_9.1":
      // crane.centerToBoom = 0; crane.rearDistance = 8.93;
      crane.rearDistance = 8.93;
      crane.frontDistance = 12.955;
      crane.trigger = 13.016;
      return crane;
  }
};

export default getCraneDistance;
