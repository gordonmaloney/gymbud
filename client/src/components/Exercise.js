import React, { useState, useEffect } from "react";
import { ExerciseFooter } from "./ExerciseFooter";
import AdjustRoundedIcon from "@mui/icons-material/AdjustRounded";
import MilitaryTechRoundedIcon from "@mui/icons-material/MilitaryTechRounded";
import FitnessCenterRoundedIcon from "@mui/icons-material/FitnessCenterRounded";
import EventRoundedIcon from "@mui/icons-material/EventRounded";
import Chart from "chart.js/auto";
import { Line } from "react-chartjs-2";
import { Box, Grid, Modal, TextField } from "@mui/material";
import { useParams } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getUsers, RemoveExercise, replaceExercise } from "../actions/auth";
import { useHistory } from "react-router-dom";

import axios from "axios";
import { API } from "../api/index";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  maxWidth: "500px",
  transform: "translate(-50%, -50%)",
  width: "70%",
  bgcolor: "background.paper",
  border: "4px solid #732065",
  boxShadow: 10,
  p: 4,
  paddingBottom: 2,
};

export const Exercise = (props) => {
  const history = useHistory();
  const location = useLocation();
  const dispatch = useDispatch();

  const [update, setUpdate] = useState(true);

  useEffect(() => {
    dispatch(getUsers());
  }, [location]);

  const users = useSelector((state) => state.auth);
  //  const [users, setUsers] = useState(stateUsers);

  const localUser = JSON.parse(localStorage.getItem("profile"));

  const [user, setUser] = useState("");

  const [exerciseProp, setExerciseProp] = useState({
    history: [""],
    target: 0,
  });

  useEffect(() => {
    localUser &&
      localUser?.result &&
      users?.length > 0 &&
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
    console.log(users);
  }, [users]);

  useEffect(() => {
    setExerciseProp(
      user?.exercises?.filter(
        (exercise) => exercise._id == props.match.params.exerciseId
      )[0]
    );
  }, [user]);

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

      //remove any NaNs just in case
      const weightArrCleaned = weightArr.filter((weight) => weight > 0);

      console.log(Math.max.apply(null, weightArrCleaned));

      if (
        Math.max.apply(null, weightArrCleaned) > parseInt(exerciseProp.target)
      ) {
        setDataMax(Math.max.apply(null, weightArrCleaned) + 1);
      } else {
        setDataMax(parseInt(exerciseProp.target) + 1);
      }

      if (
        Math.min.apply(null, weightArrCleaned) < parseInt(exerciseProp.target)
      ) {
        setDataMin(Math.min.apply(null, weightArrCleaned) - 1);
      } else {
        setDataMin(parseInt(exerciseProp.target) - 1);
      }
    }
  }, [exerciseProp, user, users, update]);

  useEffect(() => {
    if (exerciseProp?.history.length > 0) {
      const weightArrCleaned = weightArr.filter((weight) => weight > 0);

      console.log(Math.max.apply(null, weightArrCleaned));

      if (
        Math.max.apply(null, weightArrCleaned) > parseInt(exerciseProp.target)
      ) {
        setDataMax(Math.max.apply(null, weightArrCleaned) + 1);
      } else {
        setDataMax(parseInt(exerciseProp.target) + 1);
      }

      if (
        Math.min.apply(null, weightArrCleaned) < parseInt(exerciseProp.target)
      ) {
        setDataMin(Math.min.apply(null, weightArrCleaned) - 1);
      } else {
        setDataMin(parseInt(exerciseProp.target) - 1);
      }
    }
  }, [weightArr, update]);
  console.log(dataMin, dataMax);

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
    let newEntry = exerciseProp;
    newEntry.history = [...newEntry.history, formData];
    setExerciseProp(newEntry);
    setUpdate(!update);
  };

  const handleUpdateTarget = (target) => {
    setUpdate(!update);
  };

  const getUsersTest = async () => {
    try {
      const req = await API.get(`/users/`);
      const res = req.data;
      console.log(res);
      // setUsers(res);
      setUser(
        res.filter(
          (filteredUser) => filteredUser._id == props.match.params.userId
        )[0]
      );

      setExerciseProp(
        res
          .filter(
            (filteredUser) => filteredUser._id == props.match.params.userId
          )[0]
          .exercises?.filter(
            (exercise) => exercise._id == props.match.params.exerciseId
          )[0]
      );

      console.log("data fetched");
    } catch (err) {
      console.log(err);
    }
  };

  console.log(exerciseProp?.history?.length);

  useEffect(() => {
    //getUsersTest()
  }, [update]);

  //delete modal
  const [deleteModal, setDeleteModal] = useState(false);

  //edit modal
  const [editModal, setEditModal] = useState(false);
  const [editFormData, setEditFormData] = useState();
  const [editIndex, setEditIndex] = useState();

  const saveEditModal = () => {
    const fixedIndex = exerciseProp.history.length - (editIndex + 1);
    console.log(editFormData);
    console.log(exerciseProp);

    let newExerciseProp = exerciseProp;
    newExerciseProp.history[fixedIndex] = editFormData;

    console.log(newExerciseProp.history);

    dispatch(
      replaceExercise(user._id, exerciseProp._id, newExerciseProp.history)
    );
    setExerciseProp(newExerciseProp);
    setUpdate(!update);
    setEditModal(false);
  };

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
                  lineHeight: "45px",
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
                    ) > 1
                      ? Math.max.apply(
                          null,
                          exerciseProp?.history.map(
                            (ex) => parseInt(ex.weight) || parseInt(0)
                          )
                        )
                      : 0}
                  </p>
                </Grid>
              </Grid>

              <div
                style={{
                  width: "90%",
                  maxWidth: "500px",
                }}
              >
                {exerciseProp?.history.length > 0 ? (
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
                ) : (
                  <></>
                )}
              </div>

              <Grid container sx={{ marginTop: "25px" }}>
                {exerciseProp.history
                  .slice(0)
                  .reverse()
                  .map((exercise, index) => {
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
                            <div
                              style={{ cursor: "pointer" }}
                              onClick={() => {
                                setEditModal(true);
                                setEditFormData({
                                  weight: exercise.weight,
                                  date: exercise.date,
                                });
                                setEditIndex(index);
                              }}
                            >
                              <FitnessCenterRoundedIcon />
                              {exercise.weight}
                            </div>
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

              <div
                className="TimelineBox preload"
                style={{ width: "50%", cursor: "pointer" }}
                onClick={() => {
                  setDeleteModal(true);
                }}
              >
                Delete this exercise
              </div>
            </center>

            <Modal open={deleteModal} onClose={() => setDeleteModal(false)}>
              <Box sx={style}>
                <p
                  style={{
                    color: "#732065",
                    marginTop: "0px",
                    marginBottom: "0px",
                    fontSize: "30px",
                    fontWeight: "bold",
                    lineHeight: "30px",
                  }}
                >
                  Are you sure you want to delete this exercise?
                </p>
                <br />
                <Grid container sx={{ justifyContent: "space-around" }}>
                  <Grid item xs={5}>
                    <div
                      className="TimelineBox preload"
                      style={{ cursor: "pointer" }}
                      onClick={() => {
                        dispatch(
                          RemoveExercise(user._id, exerciseProp._id, history)
                        );
                      }}
                    >
                      Delete it
                    </div>
                  </Grid>
                  <Grid item xs={5}>
                    <div
                      className="TimelineBox preload"
                      style={{ cursor: "pointer" }}
                      onClick={() => {
                        setDeleteModal(false);
                      }}
                    >
                      Keep it
                    </div>
                  </Grid>
                </Grid>
              </Box>
            </Modal>

            <Modal open={editModal} onClose={() => setEditModal(false)}>
              <Box sx={style}>
                <p
                  style={{
                    color: "#732065",
                    marginTop: "0px",
                    marginBottom: "0px",
                    fontSize: "30px",
                    fontWeight: "bold",
                    lineHeight: "30px",
                  }}
                >
                  Edit entry
                </p>

                <br />
                <TextField
                  fullWidth
                  margin="dense"
                  value={editFormData?.date}
                  placeholder="Date"
                  type="text"
                  onChange={(e) =>
                    setEditFormData({ ...editFormData, date: e.target.value })
                  }
                />

                <TextField
                  fullWidth
                  //sx={{border: emptyWeight && "red 1px solid"}}
                  margin="dense"
                  placeholder="Weight"
                  value={editFormData?.weight}
                  type="number"
                  onChange={(e) =>
                    setEditFormData({ ...editFormData, weight: e.target.value })
                  }
                />
                <br />
                <br />
                <Grid container sx={{ justifyContent: "space-around" }}>
                  <Grid item xs={5}>
                    <div
                      className="TimelineBox preload"
                      style={{ cursor: "pointer" }}
                      onClick={() => {
                        saveEditModal();
                      }}
                    >
                      Save
                    </div>
                  </Grid>
                  <Grid item xs={5}>
                    <div
                      className="TimelineBox preload"
                      style={{ cursor: "pointer" }}
                      onClick={() => {
                        setEditModal(false);
                      }}
                    >
                      Cancel
                    </div>
                  </Grid>
                </Grid>
              </Box>
            </Modal>

            <div style={{ height: "150px" }} />
          </div>
          {exerciseProp && (
            <ExerciseFooter
              user={user}
              exercise={exerciseProp}
              handleUpdate={(formData) => handleUpdate(formData)}
              handleUpdateTarget={(target) => handleUpdateTarget(target)}
              tooltip={exerciseProp.history.length > 0 ? false : true}
            />
          )}
        </div>
      </div>
    );
  } else {
    return <>Loading...</>;
  }
};
