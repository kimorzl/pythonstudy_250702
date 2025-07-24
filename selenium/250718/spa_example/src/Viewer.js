/*Viewer라는 컴퍼런트를 만든 것이며, 컴퍼런트 파일명은 대문자로 시작해야함*/
/*코드 틀을 만들때 rafce를 입력하면 된다.*/
import React from "react";

const Viewer = ({ count }) => {
  return (
    <div>
      <div>현재 카운트 : </div>
      <h1>{count}</h1>
    </div>
  );
};

export default Viewer;
