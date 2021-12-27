import React, { useState } from "react";

import AdjustRoundedIcon from "@mui/icons-material/AdjustRounded";
import MilitaryTechRoundedIcon from "@mui/icons-material/MilitaryTechRounded";
import FitnessCenterRoundedIcon from "@mui/icons-material/FitnessCenterRounded";
import EventRoundedIcon from "@mui/icons-material/EventRounded";
import Chart from "chart.js/auto";
import { Line } from "react-chartjs-2";
import { Grid } from "@mui/material";

export const Exercise = () => {
  const [barData, setBarData] = useState({
    labels: ["day 1", "day 2", "day 3", "day 4"],
    datasets: [
      {
        label: "Target",
        fill: false,
        radius: 0,
        data: [64, 64, 64, 64],
        borderColor: ["rgba(35, 53, 89)"],
        borderWidth: [3],
      },
      {
        label: "You did",
        data: [48, 35, 73, 82],

        tension: 0.3,
        borderColor: ["white"],
        backgroundColor: ["white"],
        borderWidth: 3,
      },
    ],
  });

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
            Deadlift
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
                240
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
                220
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

            <Grid item xs={12}> <hr style={{ width: "70%" }} /> </Grid> 
            
            
            
            <Grid item xs={6}> <p style={{ color: "#732065", marginTop: "0px", marginBottom: "0px", fontSize: "25px", fontWeight: "bold", }} > <EventRoundedIcon /> 10/08/2021 </p> </Grid> <Grid item xs={6}> <p style={{ color: "#732065", marginTop: "0px", marginBottom: "0px", fontSize: "25px", fontWeight: "bold", }} > <FitnessCenterRoundedIcon /> 78 </p> </Grid> <Grid item xs={12}> <hr style={{ width: "70%" }} /> </Grid>
            <Grid item xs={6}> <p style={{ color: "#732065", marginTop: "0px", marginBottom: "0px", fontSize: "25px", fontWeight: "bold", }} > <EventRoundedIcon /> 10/08/2021 </p> </Grid> <Grid item xs={6}> <p style={{ color: "#732065", marginTop: "0px", marginBottom: "0px", fontSize: "25px", fontWeight: "bold", }} > <FitnessCenterRoundedIcon /> 78 </p> </Grid> <Grid item xs={12}> <hr style={{ width: "70%" }} /> </Grid>
            <Grid item xs={6}> <p style={{ color: "#732065", marginTop: "0px", marginBottom: "0px", fontSize: "25px", fontWeight: "bold", }} > <EventRoundedIcon /> 10/08/2021 </p> </Grid> <Grid item xs={6}> <p style={{ color: "#732065", marginTop: "0px", marginBottom: "0px", fontSize: "25px", fontWeight: "bold", }} > <FitnessCenterRoundedIcon /> 78 </p> </Grid> <Grid item xs={12}> <hr style={{ width: "70%" }} /> </Grid>
            <Grid item xs={6}> <p style={{ color: "#732065", marginTop: "0px", marginBottom: "0px", fontSize: "25px", fontWeight: "bold", }} > <EventRoundedIcon /> 10/08/2021 </p> </Grid> <Grid item xs={6}> <p style={{ color: "#732065", marginTop: "0px", marginBottom: "0px", fontSize: "25px", fontWeight: "bold", }} > <FitnessCenterRoundedIcon /> 78 </p> </Grid> <Grid item xs={12}> <hr style={{ width: "70%" }} /> </Grid>
            <Grid item xs={6}> <p style={{ color: "#732065", marginTop: "0px", marginBottom: "0px", fontSize: "25px", fontWeight: "bold", }} > <EventRoundedIcon /> 10/08/2021 </p> </Grid> <Grid item xs={6}> <p style={{ color: "#732065", marginTop: "0px", marginBottom: "0px", fontSize: "25px", fontWeight: "bold", }} > <FitnessCenterRoundedIcon /> 78 </p> </Grid> <Grid item xs={12}> <hr style={{ width: "70%" }} /> </Grid>
            <Grid item xs={6}> <p style={{ color: "#732065", marginTop: "0px", marginBottom: "0px", fontSize: "25px", fontWeight: "bold", }} > <EventRoundedIcon /> 10/08/2021 </p> </Grid> <Grid item xs={6}> <p style={{ color: "#732065", marginTop: "0px", marginBottom: "0px", fontSize: "25px", fontWeight: "bold", }} > <FitnessCenterRoundedIcon /> 78 </p> </Grid> <Grid item xs={12}> <hr style={{ width: "70%" }} /> </Grid>
          </Grid>
        </center>
      </div>
    </div>
  );
};
