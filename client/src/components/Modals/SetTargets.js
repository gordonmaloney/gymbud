import React, {useState} from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

import { Modal } from "@mui/material";
import Box from "@mui/material/Box";
import { TextField } from "@mui/material";
import { useHistory } from "react-router-dom";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "70%",
  bgcolor: "background.paper",
  border: "4px solid #732065",
  boxShadow: 10,
  p: 4,
};

export const SetTargets = ({ user, targetModal, closeTargetModal }) => {
    const history = useHistory();
    const dispatch = useDispatch();
    
      const [open, setOpen] = useState(true);
      const handleClose = () => closeTargetModal();

      const handleSave = () => {
          closeTargetModal()
      }
    return (
        <div>
            <Modal open={targetModal} onClose={() => closeTargetModal()}>
        <Box sx={style}>
          <span
            onClick={closeTargetModal}
            style={{
              color: "#732065",
              marginTop: "-10px",
              float: "right",
              cursor: "pointer"
            }}
          >
            <b>X</b>
          </span>
          <h1 className="modalHeader">Set your targets</h1>

{user?.exercises && user.exercises.map(exercise =>
    
    {return <>
    <h1 className="modalHeader">
    {exercise.exercise}
    </h1>
    </>})}          

          <div className="customBtn" onClick={() => handleSave()}>
            Save
          </div>
        </Box>
      </Modal>
        </div>
    )
}
