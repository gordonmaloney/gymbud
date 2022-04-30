import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import AdjustRoundedIcon from "@mui/icons-material/AdjustRounded";
import { getUsers } from "../actions/auth";
import { useSelector, useDispatch } from "react-redux";

import { SetTargets } from "./Modals/SetTargets";
import { AddHistoryComp } from "./Modals/AddHistory";


import { styled } from '@mui/material/styles';
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';


const CustomTooltipLeft = styled(({ className, ...props }) => (
  <Tooltip {...props} classes={{ popper: className }} />
))({
  [`& .${tooltipClasses.tooltip}`]: {
    marginLeft: 60,
    fontSize: 12,
    backgroundColor: "#732065",
    marginBottom: "20px"
  },
});

const CustomTooltipRight = styled(({ className, ...props }) => (
  <Tooltip {...props} classes={{ popper: className }} />
))({
  [`& .${tooltipClasses.tooltip}`]: {
    marginRight: 20,
    fontSize: 12,
    backgroundColor: "#732065",
    marginBottom: "0px"
  },
});

export const ExerciseFooter = ({ user, exercise, handleUpdate, handleUpdateTarget, tooltip }) => {
 
  console.log(tooltip)
 
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


<CustomTooltipLeft arrow title="Add an entry for this exercise" open={tooltip ? true : false} placement="left">

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
</CustomTooltipLeft>


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

<CustomTooltipRight arrow title="Change the target for this exercise" open={tooltip ? true : false} placement="top">

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
</CustomTooltipRight> 


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
          handleUpdateTarget={target => handleUpdateTarget(target)}
        />
      </>
    );
  }
};
