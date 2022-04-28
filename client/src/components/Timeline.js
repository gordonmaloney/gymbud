import React, { useState, useEffect } from "react";
import { Grid } from "@mui/material";
import AdjustRoundedIcon from "@mui/icons-material/AdjustRounded";
import MilitaryTechRoundedIcon from "@mui/icons-material/MilitaryTechRounded";
import UndoRoundedIcon from "@mui/icons-material/UndoRounded";
import { Link } from "react-router-dom";
import $ from "jquery";
import { getUser } from "../actions/auth";
import { useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getUsers } from "../actions/auth";

export const Timeline = () => {
  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(() => {
    dispatch(getUsers());
  }, [location]);

  const users = useSelector((state) => state.auth);
  const localUser = JSON.parse(localStorage.getItem("profile"));

  const [user, setUser] = useState("");

  useEffect(() => {
    localUser &&
      localUser?.result &&
      users.length > 0 &&
      setUser(
        users.filter(
          (filteredUser) => filteredUser._id == localUser?.result?._id
        )[0]
      );

    if (!localUser) setUser("");
  }, [users, location]);

  //const user = JSON.parse(localStorage.getItem("profile"));

  setTimeout(function () {
    $(".preload").removeClass("preload");
  }, 500);

  const TimelineBox = ({ name, target, last, best }) => {
    return (
      <div className="TimelineBox preload">
        <Grid container sx={{ justifyContent: "space-between" }}>
          <Grid item xs={8}>
            <div
              style={{
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              {name}
            </div>
          </Grid>
          <span
            style={{
              width: "0px",
              height: "90%",
              borderLeft: "2px solid rgba(255,255,255,0.5)",
            }}
          />

          {/*
          <Grid item>
            <AdjustRoundedIcon />
            {target}
          </Grid>

          <Grid item>
            <span
              style={{
                width: "0px",
                height: "90%",
                borderLeft: "2px solid rgba(255,255,255,0.5)",
              }}
            />
          </Grid>

          <Grid item>
            <UndoRoundedIcon />
            {last}
          </Grid>

          <Grid item>
            <span
              style={{
                width: "0px",
                height: "90%",
                borderLeft: "2px solid rgba(255,255,255,0.5)",
              }}
            />
          </Grid>
            */}

          <Grid item xs={3}>

            <div
              style={{
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >            <MilitaryTechRoundedIcon />

            {best ? best : 0}
            </div>
          </Grid>
        </Grid>
      </div>
    );
  };

  return (
    <div
      style={{
        width: "100vw",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      <center>
        <div style={{ height: "150px" }} />

        {user &&
          user.exercises &&
          user.exercises.length >= 0 &&
          user.exercises.map((exercise) => {
            let total = [];
            exercise.history.map((history) =>
              total.push(parseInt(history.weight) || 0)
            );
            let best = parseInt(Math.max.apply(null, total));
            return (
              <Link to={`${user._id}/exercise/${exercise._id}`}>
                <TimelineBox
                  name={exercise.exercise}
                  target={exercise.target}
                  last={exercise?.history[exercise.history.length - 1]?.weight}
                  best={best}
                />
              </Link>
            );
          })}

        {!user && (
          <h1 className="modalHeader">
            Log in or create an account to get started.
          </h1>
        )}
        <div style={{ height: "150px" }} />
      </center>
    </div>
  );
};
