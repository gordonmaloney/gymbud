import React, {useState} from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

import { Modal } from "@mui/material";
import Box from "@mui/material/Box";
import { TextField } from "@mui/material";
import { useHistory } from "react-router-dom";
import { AddTarget } from "../../actions/auth";
import $ from 'jquery'

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

export const SetTargets = ({ user, exercise, targetModal, closeTargetModal }) => {

    //remove preload class from button to not show initial animation
    setTimeout(function(){
      $('.preload').removeClass('preload');
    }, 500)

    const history = useHistory();
    const dispatch = useDispatch();
    const [formData, setFormData] = useState();

      const [open, setOpen] = useState(true);
      const handleClose = () => closeTargetModal();


      const handleUpdate = (userId, exerciseId, formData) => {
        console.log(userId, exerciseId, formData)
      dispatch(AddTarget(userId, exerciseId, formData));
    };


      const handleSave = () => {
          closeTargetModal()
          handleUpdate(user._id, exercise._id, formData)
          history.push('/')
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
          <h1 className="modalHeader">Set your target</h1>

          <TextField
            fullWidth
            margin="dense"
            placeholder="Target"
            type="number"
            onChange={(e) =>
              setFormData({ ...formData, target: e.target.value })
            }
          />

          <div className="customBtn preload" onClick={() => handleSave()}>
            Save
          </div>
        </Box>
      </Modal>
        </div>
    )
}
