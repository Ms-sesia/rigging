/*
 ** 각 위치별로 craneCenter To Boom의 realDistance를 더한 값으로 계산한다.
 ** 현재는 이미지가 rear만 가능하기에 rear에만 realDistance를 더하였다.
 ** 추후 이미지들이 추가 되면 지금의 frontDistance와 trigger에 realDistance를 구하여 더해주면 된다.
 */
const getCraneDistance = (craneName) => {
  let crane = {};
  switch (craneName) {
    case "L_1030_2.1":
      // crane.rearDistance = 5.1;
      crane.rearDistance = 3.15;
      crane.frontDistance = 5.535;
      crane.trigger = 6.5;
      crane.centerToBoom = 1.95;
      return crane;
    case "L_1040_2.1":
      // crane.rearDistance = 6.17;
      crane.rearDistance = 3.33;
      crane.frontDistance = 5.535;
      crane.trigger = 6.5;
      crane.centerToBoom = 2.84;
      return crane;
    case "L_1050_3.1":
      // crane.rearDistance = 6.4;
      crane.rearDistance = 3.53;
      crane.frontDistance = 5.963;
      crane.trigger = 6.9;
      crane.centerToBoom = 2.87;
      return crane;
    case "L_1055_3.2":
      // crane.rearDistance = 6.105;
      crane.rearDistance = 4.005;
      crane.frontDistance = 6.263;
      crane.trigger = 6.8;
      crane.centerToBoom = 2.1;
      return crane;
    case "L_1060_3.1":
      // crane.rearDistance = 5.986;
      crane.rearDistance = 3.986;
      crane.frontDistance = 6.262;
      crane.trigger = 6.8;
      crane.centerToBoom = 2;
      return crane;
    case "L_1070_4.1":
      // crane.rearDistance = 6.38;
      crane.rearDistance = 3.98;
      crane.frontDistance = 5.963;
      crane.trigger = 6.8;
      crane.centerToBoom = 2.4; 
      return crane;
    case "L_1070_4.2":
      // crane.rearDistance = 5.89;
      crane.rearDistance = 3.98;
      crane.frontDistance = 5.963;
      crane.trigger = 6.8;
      crane.centerToBoom = 1.91;
      return crane;
    case "L_1090_4.1":
      // crane.rearDistance = 5.81;
      crane.rearDistance = 4.08;
      crane.frontDistance = 7.084;
      crane.trigger = 7.5;
      crane.centerToBoom = 1.73;
      return crane;
    case "L_1095_5.1":
      // crane.rearDistance = 6.64;
      crane.rearDistance = 4.38;
      crane.frontDistance = 7.855;
      crane.trigger = 7.55;
      crane.centerToBoom = 2.26;
      return crane;
    case "L_1100_4.2":
      // crane.rearDistance = 6.457;
      crane.rearDistance = 4.527;
      crane.frontDistance = 7.179;
      crane.trigger = 7.275;
      crane.centerToBoom = 1.93; 
      return crane;
    case "L_1100_5.2":
      // crane.rearDistance = 5.352;
      crane.rearDistance = 3.972;
      crane.frontDistance = 8.02;
      crane.trigger = 7.275;
      crane.centerToBoom = 1.38;
      return crane;
    case "L_1130_5.1":
      // crane.rearDistance = 6.43;
      crane.rearDistance = 4.88;
      crane.frontDistance = 8.45;
      crane.trigger = 8.05;
      crane.centerToBoom = 1.55; 
      return crane;
    case "L_1150_6.1":
      // crane.rearDistance = 6.6;
      crane.rearDistance = 4.9;
      crane.frontDistance = 9.02;
      crane.trigger = 8.914;
      crane.centerToBoom = 1.7;
      return crane;
    case "L_1200_5.1":
      // crane.rearDistance = 5.97;
      crane.rearDistance = 4.85;
      crane.frontDistance = 9.061;
      crane.trigger = 8.9;
      crane.centerToBoom = 1.12;
      return crane;
    case "L_1250_6.1":
      // crane.rearDistance = 7.19;
      crane.rearDistance = 5.6;
      crane.frontDistance = 10.99;
      crane.trigger = 9.1;
      crane.centerToBoom = 1.59;
      crane.halfLuffingHeight = 0.68;
      crane.adapterHeight = 0;
      return crane;
    case "L_1300_6.1":
      // crane.rearDistance = 6.43;
      crane.rearDistance = 5.53;
      crane.frontDistance = 10.99;
      crane.trigger = 9.1;
      crane.centerToBoom = 0.9;
      crane.halfLuffingHeight = 0.67;
      crane.adapterHeight = -0.14;
      return crane;
    case "L_1300_6.2":
      // crane.rearDistance = 5.75;
      crane.rearDistance = 4.53;
      crane.frontDistance = 11.06;
      crane.trigger = 9.132;
      crane.centerToBoom = 1.22;
      crane.halfLuffingHeight = 0.63;
      crane.adapterHeight = 0.21;
      return crane;
    case "L_1350_6.1":
      // crane.rearDistance = 6.75;
      crane.rearDistance = 5.7;
      crane.frontDistance = 11.06;
      crane.trigger = 9.13;
      crane.centerToBoom = 1.05;
      crane.halfLuffingHeight = 0.67;
      crane.adapterHeight = 0.56;
      return crane;
    case "L_1400_7.1":
      // crane.rearDistance = 7.6;
      crane.rearDistance = 6.6;
      crane.frontDistance = 11.959;
      crane.trigger = 10.21;
      crane.centerToBoom = 1;
      crane.halfLuffingHeight = 0.76;
      crane.adapterHeight = 0;
      return crane;
    case "L_1450_8.1":
      // crane.rearDistance = 7.17;
      crane.rearDistance = 7;
      crane.frontDistance = 13.585;
      crane.trigger = 10.3;
      crane.centerToBoom = 0.17;
      crane.halfLuffingHeight = 0.74;
      crane.adapterHeight = 0.22;
      return crane;
    case "L_1500_50m_8.1":
      // crane.rearDistance = 6.025;
      crane.rearDistance = 6.025;
      crane.frontDistance = 13.03;
      crane.trigger = 10.3;
      crane.centerToBoom = 0;
      crane.halfLuffingHeight = 0.88;
      crane.adapterHeight = 0.66;
      return crane;
    case "L_1500_84m_8.1":
      // crane.rearDistance = 6.025;
      crane.rearDistance = 6.025;
      crane.frontDistance = 13.03;
      crane.trigger = 10.3;
      crane.centerToBoom = 0;
      crane.halfLuffingHeight = 0.88;
      crane.adapterHeight = 0.66;
      return crane;
    case "L_1750_9.1":
      // crane.rearDistance = 8.33;
      crane.rearDistance = 8.33;
      crane.frontDistance = 14.615;
      crane.trigger = 12.619;
      crane.centerToBoom = 0;
      crane.halfLuffingHeight = 0.82;
      crane.adapterHeight = 0.56;
      return crane;
    case "L_11200_9.1":
      // crane.rearDistance = 8.93;
      crane.rearDistance = 8.93;
      crane.frontDistance = 12.955;
      crane.trigger = 13.016;
      crane.centerToBoom = 0;
      crane.halfLuffingHeight = 1;
      crane.adapterHeight = 0;
      return crane;
  }
};

export default getCraneDistance;
