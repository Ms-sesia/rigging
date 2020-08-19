const getCraneDistance = (craneName, craneLocation) => {
  let crane = {};
  switch (craneName) {
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
