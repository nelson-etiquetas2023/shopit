import React, { Fragment } from "react";
import { Outlet, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoute = ({ component: Component, ...rest }) => {
  const { isAuthenticated, loading, user } = useSelector((state) => state.auth);

  return (
    <Fragment>
      {loading === false && isAuthenticated ? (
        <Outlet />
      ) : (
        <Navigate to="/login" />
      )}
    </Fragment>
  );
};

export default ProtectedRoute;
