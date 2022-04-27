import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import AdjustRoundedIcon from "@mui/icons-material/AdjustRounded";
import { getUsers } from "../actions/auth";
import { useSelector, useDispatch } from "react-redux";

import { SetTargets } from "./Modals/SetTargets";
import { AddHistoryComp } from "./Modals/AddHistory";

export const ExerciseFooter = ({ user, exercise, handleUpdate }) => {
  const dispatch = useDispatch();

  const location = useLocation();

  useEffect(() => {
    dispatch(getUsers());
  }, [location]);


  const [addHistoryModal, setAddHistoryModal] = useState(false);
  const [targetModal, setTargetModal] = useState(false);

  const handleAddHistory = () => {
    setAddHistoryModal(true);
  };

  const handleTargets = () => {
    setTargetModal(true);
  };

  if (!user) {
    return <></>;
  } else {
    //exercise page
    return (
      <>
        <div
          onClick={handleAddHistory}
          style={{
            cursor: "pointer",
            position: "fixed",
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
            position: "fixed",
            overflow: "hide",
            zIndex: 1,
            borderRadius: "50%",
            bottom: "-110px",
            left: "-110px",
            height: "220px",
            width: "220px",
            backgroundColor: "rgba(35, 53, 89, 0.8)",
          }}
        ></div>

        <AddRoundedIcon
          onClick={handleAddHistory}
          style={{
            cursor: "pointer",
            position: "fixed",
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

        <div
          onClick={handleTargets}
          style={{
            cursor: "pointer",
            position: "fixed",
            overflow: "hide",
            zIndex: 2,
            borderRadius: "50%",
            bottom: "-100px",
            right: "-100px",
            height: "200px",
            width: "200px",
            backgroundColor: "#732065",
          }}
        ></div>

        <div
          style={{
            position: "fixed",
            overflow: "hide",
            zIndex: 1,
            borderRadius: "50%",
            bottom: "-110px",
            right: "-110px",
            height: "220px",
            width: "220px",
            backgroundColor: "rgba(35, 53, 89, 0.8)",
          }}
        ></div>

        <AdjustRoundedIcon
          onClick={handleTargets}
          style={{
            cursor: "pointer",
            position: "fixed",
            overflow: "hide",
            zIndex: 3,
            borderRadius: "50%",
            bottom: "10px",
            right: "10px",
            height: "60px",
            width: "60px",
            color: "white",
          }}
        />

        <AddHistoryComp
          user={user}
          exercise={exercise}
          addModal={addHistoryModal}
          closeAddModal={() => {
            setAddHistoryModal(false);
          }}
          handleUpdate={(formData) => handleUpdate(formData)}
        />

        <SetTargets
          user={user}
          exercise={exercise}
          targetModal={targetModal}
          closeTargetModal={() => setTargetModal(false)}
        />
      </>
    );
  }
};
