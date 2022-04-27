import React, {useState} from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { updateExercise } from "../../actions/auth";


import { Modal } from "@mui/material";
import Box from "@mui/material/Box";
import { TextField } from "@mui/material";
import { useHistory } from "react-router-dom";
import $ from 'jquery'

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
};

export const AddHistoryComp = ({ user, exercise, closeAddModal, addModal, handleUpdate}) => {
  

    //remove preload class from button to not show initial animation
    setTimeout(function(){
      $('.preload').removeClass('preload');
    }, 500)


  const history = useHistory();
const dispatch = useDispatch();

  const [open, setOpen] = useState(true);
  const handleClose = () => closeAddModal();

  const [formData, setFormData] = useState();

  const handleAdd = () => {
    dispatch(updateExercise(user._id, exercise._id, formData, history));
    handleUpdate(formData);
    closeAddModal();
    //history.push('/')
  };

  return (
    <div>
      <Modal open={addModal} onClose={() => closeAddModal()}>
        <Box sx={style}>
          <span
            onClick={closeAddModal}
            style={{
              color: "#732065",
              marginTop: "-10px",
              float: "right",
              cursor: "pointer",
            }}
          >
            <b>X</b>
          </span>
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

          <div className="customBtn preload" onClick={() => handleAdd(user?.result?._id, formData)}>
            Save
          </div>
        </Box>
      </Modal>
    </div>
  );
};
