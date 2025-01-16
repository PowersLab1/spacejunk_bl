import React from "react";
import { Route, Switch } from "react-router-dom";

// import LabJsWrapper from "./containers/LabJsWrapper";
import { LabJSWrapperModern } from "./containers/LabJSWrapperModern";


export default () =>
  <Switch>
    <Route path="/" exact component={LabJSWrapperModern} />
    {/* <Route path="/" exact component={LabJsWrapper} /> */}

        { /* Finally, catch all unmatched routes */ }
        {/*  <Route component={NotFound} /> */}
  </Switch>;
