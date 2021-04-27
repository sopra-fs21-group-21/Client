import React from "react";
import { Redirect } from "react-router-dom";


export const DashBoardGuard = props => {
        /**user is logged in**/
        if (localStorage.getItem("user")) {
            return props.children;
        }
        else
        {
            alert(`Cant redirect, please log in first`);

            return <Redirect to={"/login"} />;}
    };