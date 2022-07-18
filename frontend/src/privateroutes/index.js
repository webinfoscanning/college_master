import React from "react";
import { Route, Redirect } from "react-router-dom";

const PrivateRoute = (props) => {
  const { Component, authenticated } = props;
  return (
    <Route
      render={(props) =>
        authenticated === false ? (
          <Redirect
            to={{ pathname: "/login", state: { from: props.location } }}
          />
        ) : (
          <Component {...props} />
        )
      }
    />
  );
};

export default PrivateRoute;
