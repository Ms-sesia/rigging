const getCraneDistance = (craneName) => {
  switch (craneName) {
    case "LTM_1100":
      return 3.972;
    case "LTM_1130":
      return 4.88;
    case "LTM_1160":
      return 4.9;
    case "LTM_1200":
      return 4.850;
    case "LTM_1300_N":
      return 4.530;
    case "LTM_1300_O":
      return 5.530;
    case "LTM_1500_50m":
      return 6.025;
    case "LTM_1500_84m":
      return 6.025;
    case "LTM_1750":
      return 8.33;
    case "LTM_11200":
      return 8.93;  // 아직 해결안됨.
  }
};

export default getCraneDistance;
