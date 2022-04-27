import React, { useState, useEffect } from "react";
import { ExerciseFooter } from "./ExerciseFooter";
import AdjustRoundedIcon from "@mui/icons-material/AdjustRounded";
import MilitaryTechRoundedIcon from "@mui/icons-material/MilitaryTechRounded";
import FitnessCenterRoundedIcon from "@mui/icons-material/FitnessCenterRounded";
import EventRoundedIcon from "@mui/icons-material/EventRounded";
import Chart from "chart.js/auto";
import { Line } from "react-chartjs-2";
import { Grid } from "@mui/material";
import { useParams } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getUsers } from "../actions/auth";

export const Exercise = (props) => {
  const location = useLocation();
  const dispatch = useDispatch();

  const [update, setUpdate] = useState(true)

  //HERE IS PROBLEM - USERS ARRAY ISN'T BEING UPDATED
  useEffect(() => {
    dispatch(getUsers());
  }, [location]);
  
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
  }, [users]);

  console.log(exerciseProp?.history.length);

  const [barData, setBarData] = useState({
    labels: [""],
    datasets: [
      {
        label: "Target",
        fill: false,
        radius: 0,
        data: [""],
        borderColor: ["rgba(35, 53, 89)"],
        borderWidth: [3],
      },
      {
        label: "You did",
        data: [""],

        tension: 0.3,
        borderColor: ["white"],
        backgroundColor: ["white"],
        borderWidth: 3,
      },
    ],
  });

  //update chart data
  const [weightArr, setWeightArr] = useState([]);
  const [dateArr, setDateArr] = useState([]);
  const [targetArr, setTargetArr] = useState([]);
  const [dataMin, setDataMin] = useState();
  const [dataMax, setDataMax] = useState();

  useEffect(() => {
    if (exerciseProp?.history.length > 0) {
      setWeightArr(exerciseProp.history.map((hist) => parseInt(hist.weight)));

      setDateArr(exerciseProp.history.map((hist) => hist.date));

      setTargetArr(exerciseProp.history.map((hist) => exerciseProp.target));

      if (Math.max.apply(null, weightArr) > parseInt(exerciseProp.target)) {
        setDataMax(Math.max.apply(null, weightArr) + 5);
      } else {
        setDataMax(parseInt(exerciseProp.target) + 5);
      }

      if (Math.min.apply(null, weightArr) < parseInt(exerciseProp.target)) {
        setDataMin(Math.min.apply(null, weightArr) - 1);
      } else {
        setDataMin(parseInt(exerciseProp.target) - 1);
      }
    }
  }, [exerciseProp, update]);

  useEffect(() => {
    setBarData({
      labels: dateArr,
      datasets: [
        {
          label: "Target",
          fill: false,
          radius: 0,
          data: targetArr,
          borderColor: ["rgba(35, 53, 89)"],
          borderWidth: [3],
        },
        {
          label: "You did",
          data: weightArr,

          tension: 0.3,
          borderColor: ["white"],
          backgroundColor: ["white"],
          borderWidth: 3,
        },
      ],
    });
  }, [weightArr, dateArr, targetArr, exerciseProp, update]);

  const handleUpdate = (formData) => {
    formData._id = "tempID";
    let newEntry = exerciseProp;
    newEntry.history = [...newEntry.history, formData];
    setExerciseProp(newEntry);
    setUpdate(!update)
  };

  const handleUpdateTarget = (target) => {
    let newEntry = exerciseProp;
    newEntry.target = target
    setExerciseProp(newEntry);
    setUpdate(!update)
  }


  if (exerciseProp) {
    return (
      <div
        style={{
          display: "flex",
          width: "100vw",
          height: "100vh",
          maxHeight: "100vh",
          overflowX: "hidden",
          overflowY: "auto",
        }}
      >
        <div
          style={{
            width: "100vw",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              width: "100vw",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <center>
              <h1
                style={{
                  color: "#732065",
                  marginBottom: "-10px",
                  marginTop: "100px",
                  fontSize: "50px",
                  fontWeight: "normal",
                }}
              >
                {exerciseProp.exercise}
              </h1>

              <Grid container>
                <Grid item xs={6}>
                  <p
                    style={{
                      color: "#732065",
                      marginTop: "0px",
                      marginBottom: "0px",
                      fontSize: "30px",
                      fontWeight: "bold",
                    }}
                  >
                    <AdjustRoundedIcon sx={{ fontSize: "30px" }} />
                    {exerciseProp.target}
                  </p>
                </Grid>
                <Grid item xs={6}>
                  <p
                    style={{
                      color: "#732065",
                      marginTop: "0px",
                      marginBottom: "0px",
                      fontSize: "30px",
                      fontWeight: "bold",
                    }}
                  >
                    <MilitaryTechRoundedIcon sx={{ fontSize: "30px" }} />

                    {Math.max.apply(
                      null,
                      exerciseProp?.history.map(
                        (ex) => parseInt(ex.weight) || parseInt(0)
                      )
                    )}
                  </p>
                </Grid>
              </Grid>

              <div style={{ width: "90%", maxWidth: "600px" }}>
                <Line
                  data={barData}
                  options={{
                    plugins: {
                      title: {
                        display: false,
                      },
                      legend: {
                        display: false,
                      },
                    },

                    scales: {
                      x: {
                        grid: {
                          color: "white",
                          font: {
                            family: "Dongle",
                            size: 20,
                          },
                        },
                        ticks: {
                          color: "white",
                          font: {
                            family: "Dongle",
                            size: 20,
                          },
                        },
                      },
                      y: {
                        min: dataMin,
                        max: dataMax,
                        grid: {
                          color: "white",
                        },
                        ticks: {
                          color: "white",
                          font: {
                            family: "Dongle",
                            size: 20,
                          },
                        },
                      },
                    },
                  }}
                />
              </div>

              <Grid container sx={{ marginTop: "25px" }}>
                {exerciseProp.history.slice(0).reverse().map((exercise) => {
                  return (
                    <>
                      <Grid item xs={6}>
                        <p
                          style={{
                            color: "#732065",
                            marginTop: "0px",
                            marginBottom: "0px",
                            fontSize: "25px",
                            fontWeight: "bold",
                          }}
                        >
                          <EventRoundedIcon />
                          {exercise.date}
                        </p>
                      </Grid>
                      <Grid item xs={6}>
                        <p
                          style={{
                            color: "#732065",
                            marginTop: "0px",
                            marginBottom: "0px",
                            fontSize: "25px",
                            fontWeight: "bold",
                          }}
                        >
                          <FitnessCenterRoundedIcon />
                          {exercise.weight}
                        </p>
                      </Grid>
                      <Grid item xs={12}>
                        {" "}
                        <hr style={{ width: "70%" }} />{" "}
                      </Grid>
                    </>
                  );
                })}
              </Grid>
            </center>

            <div style={{ height: "150px" }} />
          </div>
          {exerciseProp && (
            <ExerciseFooter
              user={user}
              exercise={exerciseProp}
              handleUpdate={(formData) => handleUpdate(formData)}
              handleUpdateTarget={target => handleUpdateTarget(target)}
            />
          )}
        </div>
      </div>
    );
  } else {
    return <>Loading...</>;
  }
};
