const getCraneDistance = (craneName, craneLocation) => {
  let crane = {};
  switch (craneName) {
    case "L_1030":
      crane.rearDistance = 3.15;
      crane.frontDistance = 5.535;
      crane.trigger = 6.5;
      return crane;
    case "L_1040":
      crane.rearDistance = 3.33;
      crane.frontDistance = 5.535;
      crane.trigger = 6.5;
      return crane;
    case "L_1050":
      crane.rearDistance = 3.53;
      crane.frontDistance = 5.963;
      crane.trigger = 6.9;
      return crane;
    case "L_1055":
      crane.rearDistance = 4.005;
      crane.frontDistance = 6.263;
      crane.trigger = 6.8;
      return crane;
    case "L_1060":
      crane.rearDistance = 3.986;
      crane.frontDistance = 6.262;
      crane.trigger = 6.8;
      return crane;
    case "L_1070":
      crane.rearDistance = 3.980;
      crane.frontDistance = 5.963;
      crane.trigger = 6.8;
      return crane;
    case "L_1090":
      crane.rearDistance = 4.08;
      crane.frontDistance = 7.084;
      crane.trigger = 7.5;
      return crane;
    case "L_1095":
      crane.rearDistance = 4.38;
      crane.frontDistance = 7.855;
      crane.trigger = 7.55;
      return crane;
    case "L_1100":
      crane.rearDistance = 3.972;
      crane.frontDistance = 8.02;
      crane.trigger = 7.275;
      return crane;
    case "L_1130":
      crane.rearDistance = 4.88;
      crane.frontDistance = 8.45;
      crane.trigger = 8.05;
      return crane;
    case "L_1160":
      crane.rearDistance = 4.9;
      crane.frontDistance = 9.02;
      crane.trigger = 8.914;
      return crane;
    case "L_1200":
      crane.rearDistance = 4.85;
      crane.frontDistance = 9.061;
      crane.trigger = 8.9;
      return crane;
    case "L_1250":
      crane.rearDistance = 5.6;
      crane.frontDistance = 10.99;
      crane.trigger = 9.1;
      return crane;
    case "L_1300_N":
      crane.rearDistance = 4.53;
      crane.frontDistance = 11.060;
      crane.trigger = 9.132;
      return crane;
    case "L_1300_O":
      crane.rearDistance = 5.53;
      crane.frontDistance = 10.990;
      crane.trigger = 9.1;
      return crane;
    case "L_1350":
      crane.rearDistance = 5.7;
      crane.frontDistance = 11.060;
      crane.trigger = 9.13;
      return crane;
    case "L_1400":
      crane.rearDistance = 6.6;
      crane.frontDistance = 11.959;
      crane.trigger = 10.21;
      return crane;
    case "L_1450":
      crane.rearDistance = 7;
      crane.frontDistance = 13.585;
      crane.trigger = 10.3;
      return crane;
    case "L_1500_50m":
      crane.rearDistance = 6.025;
      crane.frontDistance = 13.030;
      crane.trigger = 10.3;
      return crane;
    case "L_1500_84m":
      crane.rearDistance = 6.025;
      crane.frontDistance = 13.030;
      crane.trigger = 10.3;
      return crane;
    case "L_1750":
      crane.rearDistance = 8.33;
      crane.frontDistance = 14.615;
      crane.trigger = 12.619;
      return crane;
    case "L_11200":
      crane.rearDistance = 8.93;
      crane.frontDistance = 12.955;
      crane.trigger = 13.016;
      return crane;
  }
};

export default getCraneDistance;
