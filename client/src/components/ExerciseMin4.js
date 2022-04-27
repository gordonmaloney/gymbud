import React, { useState, useEffect } from "react";
import { ExerciseFooter } from "./ExerciseFooter";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getUsers } from "../actions/auth";

export const Exercise = (props) => {
  const location = useLocation();
  const dispatch = useDispatch();

  //get full list of users
  useEffect(() => {
    dispatch(getUsers());
  }, []);
  const users = useSelector((state) => state.auth);

  //get local user
  const localUser = JSON.parse(localStorage.getItem("profile"));

  //initialise user and specific exercise variables
  const [user, setUser] = useState("");
  const [exerciseProp, setExerciseProp] = useState({
    history: [""],
    target: 0,
  });

  //set user and exercise to match params/local storage
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

  //force update to state
  const handleUpdate = (formData) => {
    formData._id = "tempID";
    let newEntry = exerciseProp;
    newEntry.history = [...newEntry.history, formData];

    console.log("new Ent", newEntry);
    setExerciseProp(newEntry);
  };

  if (exerciseProp) {
    return (
      <div style={{ marginTop: "150px" }}>
        <h1>History array length: {exerciseProp.history.length}</h1>

        <button onClick={() => console.log(exerciseProp.history.length)}>
          log
        </button>

        {exerciseProp && (
          <ExerciseFooter
            user={user}
            exercise={exerciseProp}
            handleUpdate={(formData) => handleUpdate(formData)}
          />
        )}
      </div>
    );
  } else {
    return <>Loading...</>;
  }
};
