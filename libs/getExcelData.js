const offset = 12;

const excelData = (data, alphIndex, length, index) => {   //data, 행문자, 열 길이, offset : 5 
  let tmpData = [];
  for(let i = offset ; i < length; i++ ){
    //엑셀값이 존재하면
    if(data[alphIndex + i ])  tmpData[i - offset] = data[alphIndex + i].v;
  }
  return tmpData;
};

export default excelData;