import { offset } from "./defaultCondition";

const excelData = (data, alphIndex, length) => {   //data, 행문자, legnth : 45, offset : 5 
  let tmpData = [];
  for(let i = offset ; i < length; i++ ){
    //만약에 객체에 멤버가 존재하면(엑셀값이 존재하면)실행
    if(data[alphIndex + i ]){
      tmpData[i - offset] = data[alphIndex + i].v;  
    }
    // else{// 아니면 0을 대입
    //   tmpData[i - offset] = 0;
    // }
  }
  return tmpData;
};

export default excelData;