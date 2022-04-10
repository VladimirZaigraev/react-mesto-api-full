import React from "react";
import { Route, Redirect } from "react-router-dom";

// этот компонент принимает другой компонент в качестве пропса
const ProtectedRoute = ({ component: Component, ...props }) => {
  return (
    <Route>
      {() =>
        props.loggedIn ? <Component {...props} /> : <Redirect to="./sign-in" />
      }
    </Route>
  );
};

export default ProtectedRoute;
