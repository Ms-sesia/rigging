const modeSelect = (sheetName) => {
  let modeName = '';
  if(/N/g.test(sheetName.split('_')[0]) || /F/g.test(sheetName.split('_')[0])) // N과 F 둘 중 하나라도 있는 경우
    if(/F/g.test(sheetName.split('_')[0]))  modeName = 'fix'; // F가 있는데 N이 있거나 없음. fix mode
    else  modeName = 'luffing'; // F가 없는데 N은 존재. luffing mode
  else  modeName = 'main';  // N과 F 둘 다 없는경우. main mode
  return modeName;
}

export default modeSelect;