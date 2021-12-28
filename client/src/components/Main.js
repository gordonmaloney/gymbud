import React from "react";
import { BrowserRouter, Switch, Route, Link } from "react-router-dom";
import { Exercise } from "./Exercise";
import { GymBud } from "./GymBud";

import { Header } from "./Header";
import { Footer } from "./Footer";

import { AnimatedSwitch } from "react-router-transition";

export const Main = () => {
  return (
    <div
      style={{
        display: "flex",
        width: "100vw",
        height: "100vh",
        overflowX: "hidden",
        overflowY: "hidden",
      }}
    >
      <BrowserRouter>


          <div style={{ zIndex: 5 }}>
            <Header />
          </div>
          <Switch>

          <AnimatedSwitch
          atEnter={{ opacity: 0 }}
          atLeave={{ opacity: 1 }}
          atActive={{ opacity: 1 }}
          className="switch-wrapper"
        >
            <Route exact path="/">
              
              <GymBud />
            </Route>
            <Route exact path="/signedin">
              <GymBud />
            </Route>

            <Route path="/:userId/exercise/:exerciseId" component={Exercise} />
          </AnimatedSwitch>
          </Switch>

          <Footer />
      </BrowserRouter>
    </div>
  );
};
