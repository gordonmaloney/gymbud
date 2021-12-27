import React, {useState} from "react";
import { Grid } from "@mui/material";
import AdjustRoundedIcon from "@mui/icons-material/AdjustRounded";
import MilitaryTechRoundedIcon from "@mui/icons-material/MilitaryTechRounded";
import UndoRoundedIcon from "@mui/icons-material/UndoRounded";
import { Link } from "react-router-dom";
import $ from 'jquery'


export const Timeline = () => {

setTimeout(function(){
  $('.preload').removeClass('preload');
}, 500)

    const TimelineBox = ({name, target, last, best}) => {
        return (
          <div className="TimelineBox preload">
            <Grid container sx={{ justifyContent: "space-between" }}>
              <Grid item xs={4}>
                {name}
              </Grid>
              <span
                style={{
                  width: "0px",
                  height: "90%",
                  borderLeft: "2px solid rgba(255,255,255,0.5)",
                }}
              />
      
              <Grid item>
                <AdjustRoundedIcon />
                {target}
              </Grid>
      
      <Grid item>
      <span
                style={{
                  width: "0px",
                  height: "90%",
                  borderLeft: "2px solid rgba(255,255,255,0.5)",
                }}
              />
      </Grid>
      
              <Grid item>
                <UndoRoundedIcon />
                {last}
              </Grid>
      
      
              <Grid item>
      <span
                style={{
                  width: "0px",
                  height: "90%",
                  borderLeft: "2px solid rgba(255,255,255,0.5)",
                }}
              />
      </Grid>
      
              <Grid item>
                <MilitaryTechRoundedIcon />
                {best}
              </Grid>
            </Grid>
          </div>
        );
      };



  return (
    <div
      style={{
        width: "100vw",
        flexDirection: "column",
        justifyContent: "center"
      }}
    >
      <center>
        <div style={{ height: "150px" }} />

        

<Link to='/exercise'>
        <TimelineBox 
        name="deadlift" target="240" last="180" best="200" />
</Link>

        <TimelineBox name="squat" target="150" last="130" best="140" />

        <TimelineBox name="benchpress" target="120" last="90" best="110" />

        <TimelineBox name="db press" target="100" last="94" best="100" />


        <TimelineBox name="lunge" target="100" last="94" best="100" />
        <TimelineBox name="shoulder press " target="100" last="94" best="100" />
        <TimelineBox name="burpies" target="100" last="94" best="100" />

        <div style={{ height: "150px" }} />

      </center>
    </div>
  );
};
