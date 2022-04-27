import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";

import { Chart as ChartJS } from "chart.js/auto";

import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

import { useDispatch } from "react-redux";
import { updateExercise } from "../actions/auth";
import { useHistory } from "react-router-dom";
import { TextField } from "@mui/material";

export const Exercise = (props) => {
  //HERE IS PROBLEM - USERS ARRAY ISN'T BEING UPDATED
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
  }, [users]);

  useEffect(() => {
    if (user) {
      setExerciseProp(
        user?.exercises?.filter(
          (exercise) => exercise._id == props.match.params.exerciseId
        )[0]
      );
    }
  }, [user]);

  console.log(users[0]?.exercises[5]?.history);
  console.log(exerciseProp);

  //
  const dispatch = useDispatch();
  const history = useHistory();

  const [formData, setFormData] = useState();

  const handleAdd = () => {
    dispatch(updateExercise(user._id, exerciseProp._id, formData, history));
    setExerciseProp({history: [...exerciseProp.history, formData]})
  };

  if (1 == 1) {
    return (
      <div>
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
                  marginTop: "100px",
                }}
              ></h1>

              <div style={{ width: "90%", maxWidth: "600px" }}></div>

              {exerciseProp?.history?.length > 0 && (
                <h1>Ex Hist: {exerciseProp?.history?.length}</h1>
              )}

              <h1 className="modalHeader">Add an exercise</h1>

              <TextField
                fullWidth
                margin="dense"
                placeholder="Date"
                type="text"
                onChange={(e) =>
                  setFormData({ ...formData, date: e.target.value })
                }
              />

              <TextField
                fullWidth
                margin="dense"
                placeholder="Weight"
                type="number"
                onChange={(e) =>
                  setFormData({ ...formData, weight: e.target.value })
                }
              />

              <button
                onClick={() => {
                  handleAdd();
                }}
              >
                submit
              </button>
            </center>
          </div>
        </div>
      </div>
    );
  } else {
    return <>Loading...</>;
  }
};
