import React, { useState } from "react";

function sort(arr, type) {
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr.length - i - 1; j++) {
      let temp;
      if (type === 0) {
        if (arr[j] < arr[j + 1]) {
          temp = arr[j];
          arr[j] = arr[j + 1];
          arr[j + 1] = temp;
        }
      } else {
        if (arr[j] > arr[j + 1]) {
          temp = arr[j];
          arr[j] = arr[j + 1];
          arr[j + 1] = temp;
        }
      }
    }
  }
  return arr;
}

const Test = () => {

  const [arr, setArr] = useState([20, 30, 10, 60, 40]);

  const handleBtnClick = (type) => {
    let newArr = arr.sort((a, b) => type === 0 ? a - b : b - a)
    setArr([...newArr]);
  };

  return (
    <>
      <ul>{arr.map((item, index) => <li key={item}>{item}</li>)}</ul>
      <button onClick={() => handleBtnClick(0)}>升序</button>
      <button onClick={() => handleBtnClick(1)}>降序</button>
    </>
  );

};
export default Test;
