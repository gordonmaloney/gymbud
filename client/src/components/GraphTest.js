import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";


import { useSelector, useDispatch } from "react-redux";
import { getUsers } from "../actions/auth";

export const GraphTest = () => {
    const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUsers());
  }, []);

  const users = useSelector((state) => state.auth);



  const [barData, setBarData] = useState({
    labels: [""],
    datasets: [
      {
        label: "Your data",
        data: [0],
      },
    ],
  });

  
  //update chart data
useEffect(() => {
  if (users[0]?.exercises) {
    setBarData({
        labels: dateArr,
        datasets: [
          {
            label: "Your data",
            data: weightArr,
          },
        ],
      });
}
}, [users])

  var weightArr = []
  var dateArr = []

  if (users[0]?.exercises) {
    users[0].exercises[0].history.map(hist => weightArr.push(parseInt(hist.weight) || 0) )
    users[0].exercises[0].history.map(hist => dateArr.push(hist.date) )
    console.log(weightArr, dateArr)
  }
  
  return (
    <>
      <Line data={barData} />
    </>
  );
};
