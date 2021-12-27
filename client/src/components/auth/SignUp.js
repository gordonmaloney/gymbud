import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { TextField, Button } from "@mui/material";

import { signup } from "../../actions/auth";

export const SignUp = ({close}) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(signup(formData, history));
    close()
  };

  return (
    <div>
      <TextField
      fullWidth
      margin="dense"
        placeholder="Email"
        type="text"
        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
      />
      <TextField
      fullWidth
      margin="dense"

        placeholder="Password"
        type="password"
        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
      />
      <TextField
      fullWidth
      margin="dense"

        placeholder="Confirm password"
        type="confirmPassword"
        onChange={(e) =>
          setFormData({ ...formData, confirmPassword: e.target.value })
        }
      />

      <div className="customBtn"  onClick={handleSubmit}>Sign Up</div>
    </div>
  );
};
