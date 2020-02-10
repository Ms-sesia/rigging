import { offset } from "./defaultCondition";

const excelData = (data, alphIndex, length) => {   //data, 행문자, legnth : 45, offset : 5 
  let tmpData = [];
  for(let i = offset ; i < length; i++ ){
    //엑셀값이 존재하면
    if(data[alphIndex + i ]){
      tmpData[i - offset] = data[alphIndex + i].v;  
    }
  }
  return tmpData;
};

export default excelData;