import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import AdjustRoundedIcon from "@mui/icons-material/AdjustRounded";
import { getUsers } from "../actions/auth";
import { useSelector, useDispatch } from "react-redux";

import { AddExerciseComp } from "./Modals/AddExercise";
import { SetTargets } from "./Modals/SetTargets";


export const Footer = () => {
 
  const dispatch = useDispatch()

  const location = useLocation();

  useEffect(() => {
    dispatch(getUsers());
  }, [location]);
  
  const users = useSelector((state) => state.auth);
  const localUser = JSON.parse(localStorage.getItem("profile"));
  
  const [user, setUser] = useState('')
  
  useEffect(() => {
    localUser && localUser?.result && users.length > 0 &&
    setUser(users.filter(filteredUser => filteredUser._id == localUser?.result?._id )[0])
  
    if (!localUser) setUser('')
  }, [users, location])


  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("profile")));
  }, [location]);

  const [addModal, setAddModal] = useState(false);
  const [addHistoryModal, setAddHistoryModal] = useState(false);
  const [targetModal, setTargetModal] = useState(false);

  const handleAdd = () => {
    setAddModal(true);
  };

  const handleAddHistory = () => {
    setAddHistoryModal(true);
  };

  const handleTargets = () => {
    setTargetModal(true);
  };

  if (!user) {
    return <></>;
  } else if (!/exercise/.test(window.location.href)) {
    return (
      <>
        <div
          onClick={handleAdd}
          style={{
            cursor: "pointer",
            position: "absolute",
            overflow: "hide",
            zIndex: 2,
            borderRadius: "50%",
            bottom: "-100px",
            left: "-100px",
            height: "200px",
            width: "200px",
            backgroundColor: "#732065",
          }}
        ></div>

        <div
          style={{
            position: "absolute",
            overflow: "hide",
            zIndex: 1,
            borderRadius: "50%",
            bottom: "-110px",
            left: "-110px",
            height: "220px",
            width: "220px",
            backgroundColor: "rgba(35, 53, 89, 0.55)",
          }}
        ></div>

        <AddRoundedIcon
          onClick={handleAdd}
          style={{
            cursor: "pointer",
            position: "absolute",
            overflow: "hide",
            zIndex: 3,
            borderRadius: "50%",
            bottom: "10px",
            left: "10px",
            height: "60px",
            width: "60px",
            color: "white",
          }}
        />

        <AddExerciseComp
          user={user}
          addModal={addModal}
          closeAddModal={() => setAddModal(false)}
        />
      </>
    );    
  } else {
    return <></>
  }
};
