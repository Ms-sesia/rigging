const getCraneDistance = (craneName) => {
  switch (craneName) {
    case 'LTM_1100':
      return 3.388;
    case 'LTM_1130':
      return 3.812;
    case 'LTM_1160':
      return 4.465;
    case 'LTM_1200':
      return 4.237;
    case 'LTM_1300_N':
      return 4.378;
    case 'LTM_1300_O':
      return 4.295;
    case 'LTM_1500_50m':
      return 5.110;
    case 'LTM_1500_84m':
      return 5.110;
    case 'LTM_1750':
      return 6.300;
    case 'LTM_11200':
      return 6.990;
  }
};

export default getCraneDistance;