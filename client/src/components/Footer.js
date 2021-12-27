import React from "react";

import AddRoundedIcon from "@mui/icons-material/AddRounded";
import AdjustRoundedIcon from "@mui/icons-material/AdjustRounded";

export const Footer = () => {
  return (
    <>
      <div
        style={{
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
          backgroundColor: "rgba(35, 53, 89, 0.8)",
        }}
      ></div>

      <AddRoundedIcon 
              style={{
                position: "absolute",
                overflow: "hide",
                zIndex: 3,
                borderRadius: "50%",
                bottom: "10px",
                left: "10px",
                height: "60px",
                width: "60px",
                color: "white",
              }}/>

      <div
        style={{
          position: "absolute",
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
          position: "absolute",
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
style={{
                position: "absolute",
                overflow: "hide",
                zIndex: 3,
                borderRadius: "50%",
                bottom: "10px",
                right: "10px",
                height: "60px",
                width: "60px",
                color: "white",
              }}/>
    </>
  );
};
