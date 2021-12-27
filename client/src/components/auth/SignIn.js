import React, { useState } from "react";
import { useDispatch } from 'react-redux';
import { useHistory } from "react-router";

import { signin } from '../../actions/auth';

import { TextField, Button } from "@mui/material";

export const SignIn = ({close}) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(signin(formData, history));
    history.push('../')
    close()
  };

  return (
    <div>
      <TextField
      fullWidth
        placeholder="email"
        type="text"
        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
      />
      <TextField
      fullWidth
        placeholder="password"
        type="password"
        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
      />

      <Button fullWidth onClick={handleSubmit}>Sign In</Button>
    </div>
  );
};
