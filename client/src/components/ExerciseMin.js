import React, { useState, useEffect } from "react";
import { ExerciseFooter } from "./ExerciseFooter";
import { Line } from "react-chartjs-2";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

export const Exercise = (props) => {
  const location = useLocation();
  const users = useSelector((state) => state.auth);
  const localUser = JSON.parse(localStorage.getItem("profile"));

  const [user, setUser] = useState("");

  const [exerciseProp, setExerciseProp] = useState({
    history: [""],
    target: 0,
  });

  useEffect(() => {
    localUser &&
      localUser?.result &&
      users.length > 0 &&
      setUser(
        users.filter(
          (filteredUser) => filteredUser._id == props.match.params.userId
        )[0]
      );

    if (!localUser) setUser("");

    setExerciseProp(
      user?.exercises?.filter(
        (exercise) => exercise._id == props.match.params.exerciseId
      )[0]
    );
  }, [users, location]);

  //styling for chart
  const [barData, setBarData] = useState({
    labels: [""],
    datasets: [
      { label: "Target", fill: false, radius: 0, data: [""], borderColor: ["rgba(35, 53, 89)"], borderWidth: [3], },
      { label: "You did", data: [""], tension: 0.3, borderColor: ["white"], backgroundColor: ["white"], borderWidth: 3, },
    ],
  });

  //updating chart data
  var weightArr = [];
  var dateArr = [];
  var targetArr = [];

  if (exerciseProp) {
    exerciseProp.history.map((hist) =>
      weightArr.push(parseInt(hist.weight) || 0)
    );
    exerciseProp.history.map((hist) => dateArr.push(hist.date));

    for (let i = 0; i < exerciseProp.history.length; i++) {
      targetArr.push(exerciseProp.target);
    }
  }

  useEffect(() => {
    if (exerciseProp) {
      setBarData({
        labels: dateArr,
        datasets: [
          {
            label: "Target",
            fill: false,
            radius: 0,
            data: targetArr,
            borderColor: ["rgba(35, 53, 89)"], borderWidth: [3],
          },
          {
            label: "Weight",
            data: weightArr,
            tension: 0.3, borderColor: ["white"], backgroundColor: ["white"], borderWidth: 3,
          },
        ],
      });
    }
  }, [users]);


  //render chart ones exerciseProp is populated
  if (exerciseProp) {
    return (
      <div style={{ marginTop: "200px" }}>
        <Line
          data={barData}
          options={{ plugins: { title: { display: false, }, legend: { display: false, }, },
          scales: { x: { grid: { color: "white", font: { family: "Dongle", size: 20, }, }, ticks: { color: "white", font: { family: "Dongle", size: 20, }, }, }, y: { grid: { color: "white", }, ticks: { color: "white", font: { family: "Dongle", size: 20, }, }, }, }, }}
        />

        {exerciseProp && <ExerciseFooter user={user} exercise={exerciseProp} />}
      </div>
    );
  } else {
    return <>Loading...</>;
  }
};
