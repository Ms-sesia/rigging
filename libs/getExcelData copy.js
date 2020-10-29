const offset = 1;

const excelData = (data, alphIndex, length) => {
  //data, 행문자, 행 갯수
  let tmpData = [];
  for (let i = offset; i < length + 1; i++) {
    //엑셀값이 존재하면
    if (data[alphIndex + i])
      tmpData[i - offset] = data[alphIndex + i].v;
  }
  return tmpData;
};

export default excelData;
