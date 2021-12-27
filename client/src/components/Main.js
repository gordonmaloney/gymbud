import React from "react";
import { BrowserRouter, Switch, Route, Link } from "react-router-dom";
import { Exercise } from "./Exercise";
import { GymBud } from "./GymBud";

import { Header } from "./Header";
import { Footer } from "./Footer";

export const Main = () => {
  return (
    <div style={{display: "flex", width: "100vw", height: "100vh", overflowX: "hidden", overflowY: "hidden"}}>
    <BrowserRouter>
      <Header />
        <Switch>
          <Route exact path="/">
            <GymBud />
          </Route>

          <Route path="/exercise">
            <Exercise />
          </Route>
        </Switch>
        <Footer />
      </BrowserRouter>
    </div>
  );
};
