/* eslint-disable react/prop-types */
import authContext from "context/auth/authContext";
import { func, node } from "prop-types";
import React, { useContext } from "react";
import { Redirect, Route } from "react-router-dom";

const PrivateRoute = ({ component: Component, location, component, path, exact, sensitive }) => {
    const { user, isLoading } = useContext(authContext);

    if (!user && !isLoading) {
        return <Redirect to={{ pathname: "/auth/login"}} />
    }

    return (
        <Route
            {...{
                location,
                component,
                path,
                exact,
                sensitive
            }}
            component={Component}
        />
    );
};

export default PrivateRoute;

PrivateRoute.propTypes = {
    component: func.isRequired,
    children: node
};
