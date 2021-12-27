import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { useEffect } from "react";
import { signup } from "../actions/auth";

import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import LoginRoundedIcon from "@mui/icons-material/LoginRounded";

import { Modal } from "@mui/material";
import Box from "@mui/material/Box";
import { SignUp } from "./auth/SignUp";
import { SignIn } from "./auth/SignIn";

import { useLocation } from "react-router-dom";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "70%",
  bgcolor: "background.paper",
  border: "1px solid #732065",
  boxShadow: 24,
  p: 4,
};

export const LogInOut = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const location = useLocation();

  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")))

  const [open, setOpen] = React.useState(false);

  const handleClose = () => setOpen(false);

  useEffect(() => {
      setUser(JSON.parse(localStorage.getItem("profile")))
  }, [location])

  const logout = () => {
    dispatch({ type: "LOGOUT" });
    history.push("/");
    setUser('null')
  };

  return (
    <div>
      {!user && (
        <LoginRoundedIcon
          onClick={() => setOpen("true")}
          style={{
            fontSize: "30px",
            zIndex: 4,
            position: "absolute",
            right: "25px",
            top: "25px",
            color: "white",
          }}
        />
      )}

      {user && (
        <LogoutOutlinedIcon
          onClick={() => logout()}
          style={{
            fontSize: "30px",
            zIndex: 4,
            position: "absolute",
            right: "25px",
            top: "25px",
            color: "white",
          }}
        />
      )}

      <Modal open={open} onClose={handleClose}>
        <Box sx={style}>
          <h1>Sign In</h1>
          <SignIn close={handleClose}/>

          <h1>Or create an account:</h1>
          <SignUp close={handleClose}/>
        </Box>
      </Modal>
    </div>
  );
};
