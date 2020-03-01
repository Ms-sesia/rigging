const modeSelect = (sheetName) => {
  let modeName = '';
  if(/N/g.test(sheetName.split('_')[0]) || /F/g.test(sheetName.split('_')[0])) {// N과 F 둘 중 하나라도 있는 경우
    if(/F/g.test(sheetName.split('_')[0])) {  // F가 있는데 N이 있거나 없음. fix mode
      modeName = 'fix'; 
    } else {  // F가 없는데 N은 존재. luffing mode
      modeName = 'luffing'; 
    }
  } else {  // N과 F 둘 다 없는경우. main mode
     modeName = 'main';  
  }
  return modeName;
}

export default modeSelect;