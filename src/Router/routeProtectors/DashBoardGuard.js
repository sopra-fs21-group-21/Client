import React from "react";
import { Redirect } from "react-router-dom";

export const DashBoardGuard = props => {

    if (localStorage.getItem("token")) {
        return props.children;
    }
    else
    {
        alert(`Please login or sign up first in order to access the desired URL`);

        return <Redirect to={"/login"} />;}
};