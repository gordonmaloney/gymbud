import React, { useState, useEffect } from "react";

import AdjustRoundedIcon from "@mui/icons-material/AdjustRounded";
import MilitaryTechRoundedIcon from "@mui/icons-material/MilitaryTechRounded";
import FitnessCenterRoundedIcon from "@mui/icons-material/FitnessCenterRounded";
import EventRoundedIcon from "@mui/icons-material/EventRounded";
import Chart from "chart.js/auto";
import { Line } from "react-chartjs-2";
import { Grid } from "@mui/material";
import { useParams } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

export const Exercise = (props) => {
  const location = useLocation();

  console.log(props.match.params.userId);
  console.log(props.match.params.exerciseId);

  const users = useSelector((state) => state.auth);
  const localUser = JSON.parse(localStorage.getItem("profile"));

  const [user, setUser] = useState("");
  const [exerciseProp, setExerciseProp] = useState("");

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

  const [LABELS, setLABELS] = useState(
    exerciseProp?.history?.map((hist) => hist.date)
  );
  const [DATA, setDATA] = useState(
    exerciseProp?.history?.map((hist) => parseInt(hist.weight))
  );

  let labelData = []
  if (exerciseProp) {
    for (let i = 0; i < exerciseProp.history.length; i++) {
      labelData.push(exerciseProp.history[i].weight);
    }
  }
  console.log(labelData)


  //why isn't this working
  const [barData, setBarData] = useState({
    labels: [1, 2],
    datasets: [
      {
        label: "Target",
        fill: false,
        radius: 0,
        data: [64, 64],
        borderColor: ["rgba(35, 53, 89)"],
        borderWidth: [3],
      },
      {
        label: "You did",
        data: [labelData[0],labelData[1]],

        tension: 0.3,
        borderColor: ["white"],
        backgroundColor: ["white"],
        borderWidth: 3,
      },
    ],
  });

  if (exerciseProp) {
    return (
      <div
        style={{
          display: "flex",
          width: "100vw",
          height: "100vh",
          overflowX: "hidden",
          flexDirection: "column",
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

            <div style={{ width: "90%" }}>
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
                  10/08/2021
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
                  78
                </p>
              </Grid>
              <Grid item xs={12}>
                {" "}
                <hr style={{ width: "70%" }} />{" "}
              </Grid>
              <Grid item xs={6}>
                {" "}
                <p
                  style={{
                    color: "#732065",
                    marginTop: "0px",
                    marginBottom: "0px",
                    fontSize: "25px",
                    fontWeight: "bold",
                  }}
                >
                  {" "}
                  <EventRoundedIcon /> 10/08/2021{" "}
                </p>{" "}
              </Grid>{" "}
              <Grid item xs={6}>
                {" "}
                <p
                  style={{
                    color: "#732065",
                    marginTop: "0px",
                    marginBottom: "0px",
                    fontSize: "25px",
                    fontWeight: "bold",
                  }}
                >
                  {" "}
                  <FitnessCenterRoundedIcon /> 78{" "}
                </p>{" "}
              </Grid>{" "}
              <Grid item xs={12}>
                {" "}
                <hr style={{ width: "70%" }} />{" "}
              </Grid>
              <Grid item xs={6}>
                {" "}
                <p
                  style={{
                    color: "#732065",
                    marginTop: "0px",
                    marginBottom: "0px",
                    fontSize: "25px",
                    fontWeight: "bold",
                  }}
                >
                  {" "}
                  <EventRoundedIcon /> 10/08/2021{" "}
                </p>{" "}
              </Grid>{" "}
              <Grid item xs={6}>
                {" "}
                <p
                  style={{
                    color: "#732065",
                    marginTop: "0px",
                    marginBottom: "0px",
                    fontSize: "25px",
                    fontWeight: "bold",
                  }}
                >
                  {" "}
                  <FitnessCenterRoundedIcon /> 78{" "}
                </p>{" "}
              </Grid>{" "}
              <Grid item xs={12}>
                {" "}
                <hr style={{ width: "70%" }} />{" "}
              </Grid>
              <Grid item xs={6}>
                {" "}
                <p
                  style={{
                    color: "#732065",
                    marginTop: "0px",
                    marginBottom: "0px",
                    fontSize: "25px",
                    fontWeight: "bold",
                  }}
                >
                  {" "}
                  <EventRoundedIcon /> 10/08/2021{" "}
                </p>{" "}
              </Grid>{" "}
              <Grid item xs={6}>
                {" "}
                <p
                  style={{
                    color: "#732065",
                    marginTop: "0px",
                    marginBottom: "0px",
                    fontSize: "25px",
                    fontWeight: "bold",
                  }}
                >
                  {" "}
                  <FitnessCenterRoundedIcon /> 78{" "}
                </p>{" "}
              </Grid>{" "}
              <Grid item xs={12}>
                {" "}
                <hr style={{ width: "70%" }} />{" "}
              </Grid>
              <Grid item xs={6}>
                {" "}
                <p
                  style={{
                    color: "#732065",
                    marginTop: "0px",
                    marginBottom: "0px",
                    fontSize: "25px",
                    fontWeight: "bold",
                  }}
                >
                  {" "}
                  <EventRoundedIcon /> 10/08/2021{" "}
                </p>{" "}
              </Grid>{" "}
              <Grid item xs={6}>
                {" "}
                <p
                  style={{
                    color: "#732065",
                    marginTop: "0px",
                    marginBottom: "0px",
                    fontSize: "25px",
                    fontWeight: "bold",
                  }}
                >
                  {" "}
                  <FitnessCenterRoundedIcon /> 78{" "}
                </p>{" "}
              </Grid>{" "}
              <Grid item xs={12}>
                {" "}
                <hr style={{ width: "70%" }} />{" "}
              </Grid>
              <Grid item xs={6}>
                {" "}
                <p
                  style={{
                    color: "#732065",
                    marginTop: "0px",
                    marginBottom: "0px",
                    fontSize: "25px",
                    fontWeight: "bold",
                  }}
                >
                  {" "}
                  <EventRoundedIcon /> 10/08/2021{" "}
                </p>{" "}
              </Grid>{" "}
              <Grid item xs={6}>
                {" "}
                <p
                  style={{
                    color: "#732065",
                    marginTop: "0px",
                    marginBottom: "0px",
                    fontSize: "25px",
                    fontWeight: "bold",
                  }}
                >
                  {" "}
                  <FitnessCenterRoundedIcon /> 78{" "}
                </p>{" "}
              </Grid>{" "}
              <Grid item xs={12}>
                {" "}
                <hr style={{ width: "70%" }} />{" "}
              </Grid>
              <Grid item xs={6}>
                {" "}
                <p
                  style={{
                    color: "#732065",
                    marginTop: "0px",
                    marginBottom: "0px",
                    fontSize: "25px",
                    fontWeight: "bold",
                  }}
                >
                  {" "}
                  <EventRoundedIcon /> 10/08/2021{" "}
                </p>{" "}
              </Grid>{" "}
              <Grid item xs={6}>
                {" "}
                <p
                  style={{
                    color: "#732065",
                    marginTop: "0px",
                    marginBottom: "0px",
                    fontSize: "25px",
                    fontWeight: "bold",
                  }}
                >
                  {" "}
                  <FitnessCenterRoundedIcon /> 78{" "}
                </p>{" "}
              </Grid>{" "}
              <Grid item xs={12}>
                {" "}
                <hr style={{ width: "70%" }} />{" "}
              </Grid>
            </Grid>
          </center>
        </div>
      </div>
    );
  } else {
    return <>Loading...</>;
  }
};
